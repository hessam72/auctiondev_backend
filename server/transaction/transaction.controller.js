const Transaction = require("./transaction.model");
const User = require("../user/user.model");
const Plan = require("../plan/plan.model");
const TStatus = require("./tstatus.enum");
const TType = require("./ttype.enum");
const TGate = require("./tgate.enum");
const moment = require("moment");
const NextPay = require("../helpers/Pay");
const Rest = require("../helpers/Rest");
const config = require("../../config/config");
const { get } = require("lodash");
const productModel = require("../product/product.model");
const mapper = require("./mapper");
/**
 * Load Transaction and append to req.
 */
function loadToken(req, res, next, token) {
  Transaction.first({ traceNumber: token })
    .then((data) => {
      req.transaction = data; // eslint-disable-line no-param-reassign
      return next();
    })
    .catch((e) => next(e));
}

/**
 * Load Transaction and append to req.
 */
function load(req, res, next, id) {
  Transaction.get(id)
    .then((data) => {
      req.transaction = data; // eslint-disable-line no-param-reassign
      return next();
    })
    .catch((e) => next(e));
}

function getTransaction(req, res) {
  return res.json(req.transaction);
}

/**
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
function create(req, res, next) {
  try {
  (async () => {
      // TODO add Bazar
      let trans = {
        user: req.auth.id,
        amount: get(req, "body.amount", 0),
        status: TStatus.CREATE,
        description: get(req, "body.description", ""),
        traceNumber: moment().unix(),
        gateway: get(req, "body.gateway", TGate.NEXTPAY),
        type: req.body.type,
        authority: null,
      };
      let p=null;
      if (req.body.plan) {
        trans.plan = req.body.plan;
        p = await Plan.findById(trans.plan).exec();
        if (!p) {
          return res.status(Rest.status.NOT_FOUND).json();
        }
        trans.amount = p.price;
      }
      if (req.body.product) {
        trans.product = req.body.product;
        const pd = await productModel.findById(trans.product).exec();
        if (!pd) {
          return res.status(Rest.status.NOT_FOUND).json();
        }
      }
      if (trans.gateway === TGate.WALLET) {
        let user = await User.findById(req.auth.id);
        console.log('user', user.balance);
        //need check rial and toman
        if (user.balance < trans.amount) {
          return res.status(Rest.status.BAD_REQUEST).json();
        }

        if (trans.type === TType.PLAN) {
          user.plans=[...(user.plans?user.plans:[]),{
            planId: p.id,
            expiredAt: new Date().expiredAt(p.duration),
          }];
        }
        if (trans.type === TType.PRODUCT) {
          user.plans=[...(user.plans?user.plans:[]),{
            planId: p.id,
            productId: trans.product,
            expiredAt: new Date().expiredAt(p.duration),
          }];
        }
        user.balance = user.balance - trans.amount;
        console.log('new balanc',user.balance);
        trans.status = TStatus.WALLET;
        trans.amount = -(trans.amount);
        const transaction = new Transaction(trans);
        await transaction.save();
        await user.save();
        return res.status(Rest.status.CREATED).json({});
      }
      const pay = new NextPay();
      pay.GetToken(trans.amount, trans.traceNumber, (error, response, body) => {
        if (error) return next(error);
        if (response.statusCode !== 200) {
          return next(Rest.badRequest("Bank not valid"));
        }
        const { trans_id, code } = JSON.parse(body);
        if (code !== -1) {
          return next(Rest.badRequest("Bank not valid"));
        }
        trans.authority = trans_id;
        const model = new Transaction(trans);
        model
          .save()
          .then((saved) => res.json(mapper.getTrans(saved)))
          .catch((e) => next(e));
      });
    })();
  }catch (e) {
    return next(e);
  }
}

/**
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
function update(req, res, next) {
  const transaction = req.transaction;
  // transaction.field = req.body.field;
  // TODO update

  transaction
    .save()
    .then((saved) => res.json(saved))
    .catch((e) => next(e));
}

/**
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
function listShow(req, res, next) {
  const user = get(req, "params.user");
  const { limit = 50, skip = 0 } = req.query;
  Transaction.list({ limit, skip, where: { user } })
    .then((data) => res.json(data))
    .catch((e) => next(e));
}

/**
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
function list(req, res, next) {
  const { limit = 50, skip = 0 } = req.query;
  // TODO chack if user jusy for this user
  Transaction.list({ limit, skip })
    .then((data) => res.json(data))
    .catch((e) => next(e));
}
/**
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
function listSuccess(req, res, next) {
  const { limit = 50, skip = 0 } = req.query;
  Transaction.list({
    limit,
    skip,
    where: { status: { $gte: TStatus.SUCCESS } },
  })
    .then((data) => res.json(data))
    .catch((e) => next(e));
}
/**
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
function remove(req, res, next) {
  const transaction = req.transaction;
  transaction
    .remove()
    .then((deleted) => res.json(deleted))
    .catch((e) => next(e));
}
/**
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
function callback(req, res, next) {
  const trans = get(req, "transaction");
  if (!trans || (trans.status != TStatus.CREATE && trans.status != TStatus.PENDING)) {
    if (trans && trans.status === TStatus.SUCCESS) {
      return res.redirect(`${config.clint_callback}/transaction/success?trans=${trans.traceNumber}&msg=این تراکنش قبلا انجام شده`)
    }
    return res.redirect(config.clint_callback + "/transaction/failed")
  }
  const user = get(req, "transaction.user");
  const pay = new NextPay();
  return pay.PaymentVerification(trans.amount, trans.traceNumber, trans.authority, async function (result) {
    let query = `?trans=${trans.traceNumber}`;
    if (result.code == 0) {
      trans.status = TStatus.SUCCESS;
      trans.result = result;
      trans.cardNumber = result.card_holder;
      trans.updatedAt = new Date();
      //save change go
      if (trans.type === TType.WALLET) {
        query = `${query}&msg=شارژ حساب با مبلغ ${trans.amount} انجام شد`
        user.balance = user.balance + trans.amount;
        await user.save();
      }
      if (trans.type === TType.PLAN) {
        query = `${query}&msg=خرید پلن  ${trans.plan.name} انجام شد`
        user.plans=[...(user.plans?user.plans:[]),{
          planId: p.id,
          expiredAt: new Date().expiredAt(p.duration),
        }];
        await user.save();
      }
      if (trans.type === TType.PRODUCT) {
        query = `${query}&msg=خرید محصول انجام شد`;
        user.plans=[...(user.plans?user.plans:[]),{
          planId: p.id,
          productId: trans.product,
          expiredAt: new Date().expiredAt(p.duration),
        }];
        await user.save();
      }
      await trans.save();
      return res.redirect(config.clint_callback + "/transaction/success" + query)
    } else if ([-1, -2, -3].includes(result.code)) {
      return res.redirect(config.clint_callback + "/transaction/waiting" + query)
    } else if (result.code == -4) {
      query = `${query}&msg=تراکنش توسط کاربر لغو شده`
      trans.status = result.code;
    } else {
      trans.status = TStatus.FAILED;
    }
    trans.result = result;
    trans.cardNumber = result.card_holder;
    //transaction faild
    await trans.save();
    return res.redirect(config.clint_callback + "/transaction/failed" + query)
  })

}

module.exports = {
  create,
  update,
  callback,
  listSuccess,
  listShow,
  list,
  remove,
  get: getTransaction,
  load,
  loadToken,
};
