const mailgun = require("mailgun-js");
const nunjucks = require("nunjucks");
const MailComposer = require("nodemailer/lib/mail-composer");

["MAILGUN_KEY", "MAILGUN_DOMAIN"].forEach(reqVar => {
  if (!process.env[reqVar])
    throw new Error(`${reqVar} must be present in .env`);
});

const mailer = mailgun({
  apiKey: process.env.MAILGUN_KEY,
  domain: process.env.MAILGUN_DOMAIN
});

module.exports = mailOptions => {
  const toSend = {
    ...mailOptions,
    html: nunjucks.render(mailOptions.template, mailOptions.variables)
  };
  const mail = new MailComposer(toSend);
  return mail.compile().build((err, message) => {
    const dataToSend = {
      to: toSend.to,
      message: message.toString("ascii")
    };
    if (process.env.NODE_ENV !== "test") {
      mailer.messages().sendMime(dataToSend, (sendError, body) => {
        if (sendError) {
          throw new Error(sendError.message);
        }
        return Promise.resolve(body);
      });
    } else {
      return Promise.resolve(mailOptions);
    }
  });
};
