const request = require('request');
const config = require('../../config/config');
class NextPay {

  constructor() {
    this.api_key = config.pay.next.key;
    this.callback_uri = config.pay.next.back_url;
    this.verify = config.pay.next.verify;
    this.url = config.pay.next.url;
  }
  GetToken(amount, order, callback) {
    const form = {
      api_key: this.api_key,
      order_id: order,
      amount: `${amount}`,
      callback_uri: this.callback_uri.replace(':token', order),
    };
    console.log('GetToken:', form)
    request.post(this.url, { form }, callback);
  }
  PaymentVerification(amount, order, trans_id, callback) {
    const form = {
      api_key: this.api_key,
      order_id: order,
      amount: `${amount}`,
      trans_id: trans_id,
    };
    console.log('PaymentVerification:', form)
    request.post(this.verify, { form }, function (err, res, body) {
      if (body) {
        return callback(JSON.parse(body))
      }
      return callback({
        "message": "آدرس صحیح نیست",
        "code": -301,
        "card_holder": "0000-****-****-0000",
        "custom": "{}"
      });
    });
  }

  GetUri(token) {
    return `http://api.nextpay.org/gateway/payment/${token}`;
  }
}
module.exports = NextPay;
