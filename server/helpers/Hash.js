/* eslint-disable no-confusing-arrow */
/* eslint-disable quotes */
const bcrypt = require("bcryptjs");

function create(plainPass) {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(plainPass, salt);
}

function verify(plainPass, hashword) {
 return bcrypt.compareSync(plainPass, hashword);
}

module.exports = { create, verify };
