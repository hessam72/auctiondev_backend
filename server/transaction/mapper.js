/* eslint-disable linebreak-style */
const NextPay = require('../helpers/Pay');

const getTrans = (transaction) => {
  const pay = new NextPay();
  //return pay;
  return new String().getOnlyKey({
    ...transaction.toObject(),
    uri: pay.GetUri(transaction.authority),
  },[
    "uri",
    "traceNumber",
    "amount",
    "status",
    "createdAt",
    "gateway",
  ]);
};
module.exports = { getTrans };
