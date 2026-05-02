// eslint-disable-next-line import/newline-after-import
const winston = require('winston');
const Slack = require('./slack.winston');

const logger = new winston.Logger({
  transports: [
    new winston.transports.Console({
      json: true,
      colorize: true,
    })
    // new Slack({
    //   json: false,
    //   colorize: false,
    // }),
  ],
});
module.exports = logger;
