/* eslint-disable array-callback-return */
/* eslint-disable linebreak-style */
/* eslint-disable func-names */
/* eslint-disable no-extend-native */
const { merge, map, get } = require('lodash');

Array.prototype.toObject = function () {
  let obj;
  this.map((key) => {
    obj = merge(obj, key);
  });
  return obj;
};
String.prototype.getOnlyKey = function (obj,keys) {
  return map(keys, key => ({ [key]: get(obj, key) }), {}).toObject();
};
Date.prototype.expiredAt = function (seconds) {
  const milliseconds=seconds*1000
  const $time= Date.now()+milliseconds;
  return new Date($time);
};
Date.prototype.checkExpired = function ($date) {
  return new Date()<=new Date($date);
};
module.exports = {};
