const MailgunSDK = require("mailgun-js-sdk");

["MAILGUN_KEY"].forEach(reqVar => {
  if (!process.env[reqVar])
    throw new Error(`${reqVar} must be present in .env`);
});

const Mailgun = new MailgunSDK({
  apiKey: process.env.MAILGUN_KEY,
  baseUrl: process.env.MAILGUN_BASE_URL || "https://api.eu.mailgun.net/v3/"
});

module.exports = async data => {
  return Mailgun.sendMessage(process.env.MAILGUN_DOMAIN, data);
};
