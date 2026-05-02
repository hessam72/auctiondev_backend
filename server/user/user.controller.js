/* eslint-disable linebreak-style */
/* eslint-disable no-param-reassign */
/* eslint-disable arrow-parens */
const User = require("./user.model");
const Hash = require("../helpers/Hash");

/**
 * Load user and append to req.
 */
function load(req, res, next, id) {
  User.get(id)
    .then((user) => {
      req.user = user; // eslint-disable-line no-param-reassign
      return next();
    })
    .catch((e) => next(e));
}

/**
 * Get user
 * @returns {User}
 */
function get(req, res) {
  return res.json(req.user);
}

/**
 * Create new user
 * @property {string} req.body.username - The username of user.
 * @property {string} req.body.mobileNumber - The mobileNumber of user.
 * @returns {User}
 */
async function create(req, res, next) {
  const find = await User.findOne({
    $or: [{ username: req.body.username }, { mobile: req.body.mobile }],
  }).exec();
  if (find) {
    return res.status(409).json();
  }
  const user = new User({
    username: req.body.username,
    name: req.body.name,
    mobile: req.body.mobile,
    role: req.body.role,
    status: req.body.status,
    password: Hash.create(req.body.password),
  });
  user
    .save()
    .then((savedUser) => res.json(savedUser))
    .catch((e) => next(e));
}

/**
 * Update existing user
 * @property {string} req.body.username - The username of user.
 * @property {string} req.body.mobileNumber - The mobileNumber of user.
 * @returns {User}
 */
async function update(req, res, next) {
  const { name, mobile, password, status, role, username, balance } = req.body;

  const user = req.user;
  let or = [];
  if (user.username != username) {
    or = [{ username: req.body.username }];
  }
  if (user.mobile != mobile) {
    or = [...or, { mobile: req.body.mobile }];
  }
  user.name = name || user.name;
  user.mobile = mobile || user.mobile;
  if (`${status}`) {
    user.status = status;
  }
  if (balance) {
    user.balance = balance;
  }

  if (password) user.password = Hash.create(password);
  user.role = role || user.role;
  user.username = username || user.username;
  //user.plans = planes ? [...user.plans, planes] : user.plans;

  if (or.length > 0) {
    const find = await User.findOne({ $or: or }).exec();
    if (find) {
      if (find._id.toString() !== user._id.toString()) {
        return res.status(409).json();
      }
    }
  }
  user
    .save()
    .then((savedUser) => res.json(savedUser))
    .catch((e) => next(e));
}

/**
 * Get user list
 * @property {number} req.query.skip - Number of users to be skipped.
 * @property {number} req.query.limit - Limit number of users to be returned.
 * @returns {User[]}
 */
function list(req, res, next) {
  const { limit = 50, skip = 0 } = req.query;
  const role = "user";
  User.list({ limit, skip, role })
    .then((users) => res.json(users))
    .catch((e) => next(e));
}

/**
 * Get user listAdmin
 * @property {number} req.query.skip - Number of users to be skipped.
 * @property {number} req.query.limit - Limit number of users to be returned.
 * @returns {User[]}
 */
function listAdmin(req, res, next) {
  const { limit = 50, skip = 0 } = req.query;
  const role = ['super_admin', 'admin', 'support'];
  User.list({ limit, skip, role })
    .then((users) => res.json(users))
    .catch((e) => next(e));
}

/**
 * Delete user.
 * @returns {User}
 */
function remove(req, res, next) {
  const user = req.user;
  user
    .remove()
    .then((deletedUser) => res.json(deletedUser))
    .catch((e) => next(e));
}

/**
 * Delete user.
 * @returns {User}
 */
function getMe(req, res, next) {
  const auth = req.auth;
  User.get(auth.id)
    .then((user) => res.json(user))
    .catch((e) => next(e));
}
function updateMe(req, res, next) {
  const auth = req.auth;
  const { name, mobile, password } = req.body;
  User.get(auth.id)
    .then((user) => {
      user.name = name || user.name;
      user.mobile = mobile || user.mobile;
      if (password) user.password = Hash.create(password);
      user
        .save()
        .then((savedUser) => res.json(savedUser))
        .catch((e) => next(e));
    })
    .catch((e) => next(e));
}

function newpassword(req, res, next) {
  const auth = req.auth;
  const { passwordConfirm, password } = req.body;
  if (passwordConfirm !== password) {
    return res.status(400).json();
  }
  User.get(auth.id)
    .then((user) => {
      user.password = Hash.create(password);
      user
        .save()
        .then((savedUser) => res.json(savedUser))
        .catch((e) => next(e));
    })
    .catch((e) => next(e));
}
module.exports = {
  load,
  get,
  create,
  getMe,
  updateMe,
  listAdmin,
  newpassword,
  update,
  list,
  remove,
};
