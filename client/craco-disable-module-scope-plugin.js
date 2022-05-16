/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const ModuleScopePlugin = require("react-dev-utils/ModuleScopePlugin");

module.exports = {
  overrideWebpackConfig: ({ webpackConfig }) => {
    webpackConfig.resolve.plugins = webpackConfig.resolve.plugins.filter(
      plugin => !(plugin instanceof ModuleScopePlugin),
    );

    return webpackConfig;
  },
};
