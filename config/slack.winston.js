const Transport = require("winston-transport");
const { IncomingWebhook } = require("@slack/webhook");

class SlackTransport extends Transport {
  constructor(opts) {
    super(opts);
    this.webhook = new IncomingWebhook(
      "https://hooks.slack.com/services/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",
      { icon_emoji: ":beetle:" }
    );
  }

  log(info, callback) {
    setImmediate(() => {
      this.emit("logged", info);
    });

    (async () => {
      const { level, message} = info; 
    //   if (level === "error")
        await this.webhook.send({
          // channel: process.env.NODE_ENV === 'development' ? 'development' : 'backend',
          username: "Bugs",
          // text: message,
          "fallback": level,
          text: message,
          color: level === "error" ? "danger" : "warning", // Can either be one of 'good', 'warning', 'danger', or any hex color code

          // Fields are displayed in a table on the message
          fields: [
            {
              title: "Options", // The title may not contain markup and will be escaped for you
              value: JSON.stringify(info),
              short: false, // Optional flag indicating whether the `value` is short enough to be displayed side-by-side with other values
            },
          ],
          // text: 'I\'ve got news for you...',
        });
    })();
    // Perform the writing to the remote service
    callback();
  }

}

module.exports = SlackTransport;
