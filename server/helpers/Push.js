const request = require('request');
const config = require('../../config/config');
class Push {

  constructor() {
    this.options = {
      method: 'POST',
      url: config.notify.url,
      headers:
      {
        'cache-control': 'no-cache',
        key: config.notify.apiKey,
        'content-type': 'application/json'
      },
      body:
      {
        afterOpenType: 'openProgram',
        pushData: { title: 'this is some hi' }
      },
      json: true
    };
  }
  Send(title,message, callback) {
    this.options.body.pushData={
      title,
      message
    }
    console.log("option",this.option);
    request(this.options, function (error, response, body) {
      if (error) throw new Error(error);
      console.log("trss",{
        error, response, body
      });
      return callback(body)
    });
  }


}
module.exports = Push;
