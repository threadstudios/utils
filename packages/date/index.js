const dateFns = require("date-fns");

module.exports = {
  ...dateFns,
  toMySQL: date => dateFns.format(date, "yyyy-MM-dd HH:mm:ss")
};
