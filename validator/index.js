const validator = require("validator");
const logger = require("@threadws/logger");

validator.isRequired = value => {
  return value && value !== "";
};

const basicLang = (check, field) => {
  switch (check) {
    case "isRequired":
      return `${field} is required`;
    case "isEmail":
      return `${field} must be a valid E-mail address`;
    default:
      return `${field} must be a valid ${check
        .replace("is", "")
        .toLowerCase()}`;
  }
};

function runRules(rules, value, key) {
  const toValidate = rules.split("|");
  return toValidate.reduce(
    (acc, rule) => {
      if (validator[rule]) {
        const ruleResult = validator[rule](value);
        if (!ruleResult && acc.isValid !== false) {
          acc.isValid = false;
          acc.errors.push(basicLang(rule, key));
        }
      } else {
        logger.info(`unable to find validate function ${rule}`);
      }
      return acc;
    },
    { isValid: true, errors: [] }
  );
}

module.exports.isValid = (config, values) => {
  const result = {
    fields: {},
    errorFields: {},
    errorMessages: {},
    isValid: null
  };
  Object.keys(config).forEach(key => {
    let ruleResult;
    if (typeof config[key] === "string") {
      ruleResult = runRules(config[key], values[key], key);
    }
    result.fields[key] = ruleResult.isValid;
    if (ruleResult.isValid === false) {
      result.errorFields[key] = true;
      result.errorMessages[key] = [...ruleResult.errors];
    }
  });
  result.isValid = Object.values(result.fields).reduce((acc, field) => {
    if (field === false && acc === true) {
      // eslint-disable-next-line no-param-reassign
      acc = false;
    }
    return acc;
  }, true);
  return result;
};
