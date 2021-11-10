const config = require("../../.eslintrc.js");

module.exports = {
  ...config,
  ignorePatterns: ["config/**/*.js", "scripts/**/*.js", "node_modules"]
};
