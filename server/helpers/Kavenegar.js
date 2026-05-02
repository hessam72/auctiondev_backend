const Kavenegar = require('kavenegar');
const config = require('../../config/config');
// eslint-disable-next-line new-cap
const api = Kavenegar.KavenegarApi({
  apikey: config.smsKey,
});

function otp(mobile, code) {
  // console.log('tag:Kavenegar.js:9=>', { mobile, code });
  // return;
  // eslint-disable-next-line new-cap
  api.VerifyLookup(
    {
      receptor: mobile,
      token: `${code}`,
      template: config.smsTemplate,
    },
    (err, rest) => {
      console.log('tag:Kavenegar.js:17=>', { err, rest });
    }
  );
}

function random(length = 4) {
  const possibleFull = '0123456789';
  const possible = '123456789';
  let string = '';
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < length; i++) {
    if (i === 0) {
      string += possible.charAt(Math.floor(Math.random() * possible.length));
      continue;
    }
    string += possibleFull.charAt(
      Math.floor(Math.random() * possibleFull.length)
    );
  }
  return parseFloat(string);
}
console.log(random());

module.exports = { otp, random };
