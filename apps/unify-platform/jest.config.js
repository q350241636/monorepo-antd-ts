const base = require('../../jest.config.base');
const packageJson = require('./package');

module.exports = {
    ...base,
    name: packageJson.name,
    displayName: packageJson.name,
    moduleNameMapper: {
        "\\.less$": "identity-obj-proxy",
        "^lodash-es$": "lodash"
    },
};
