/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const disableModuleScopePlugin = require("./craco-disable-module-scope-plugin.js");

module.exports = {
  plugins: [{ plugin: disableModuleScopePlugin }],
};
