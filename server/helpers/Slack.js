/* eslint-disable linebreak-style */
const { IncomingWebhook } = require('@slack/webhook');
const config = require('../../config/config');

class Slack {
  static log(info) {
    this.webhook = new IncomingWebhook(
      'https://hooks.slack.com/services/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',
      { icon_emoji: ':beetle:' }
    );
    const { level = 'error', message, status } = info;
    if (status === 500 && config.env === 'production') {
      this.webhook.send({
        username: 'Bugs',
        fallback: level,
        text: message,
        color: level === 'error' ? 'danger' : 'warning',
        fields: [
          {
            title: 'Options',
            value: JSON.stringify(info),
            short: false,
          },
        ],
      });
    }
  }
}

module.exports = Slack;
