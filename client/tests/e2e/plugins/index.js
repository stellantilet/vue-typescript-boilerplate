/* eslint-disable arrow-body-style */
// https://docs.cypress.io/guides/guides/plugins-guide.html

// if you need a custom webpack configuration you can uncomment the following import
// and then use the `file:preprocessor` event
// as explained in the cypress docs
// https://docs.cypress.io/api/plugins/preprocessors-api.html#Examples

// /* eslint-disable import/no-extraneous-dependencies, global-require */
// const webpack = require('@cypress/webpack-preprocessor')

// var __importDefault =
//   (this && this.__importDefault) ||
//   function (mod) {
//     return mod && mod.__esModule ? mod : { default: mod };
//   };
// Object.defineProperty(exports, "__esModule", { value: true });

// eslint-disable-next-line
// const registerCodeCoverageTasks = require("@cypress/code-coverage/task");
// eslint-disable-next-line
// const fs = require("fs")
// eslint-disable-next-line
const { deleteActuals } = require("../../utils/deleteActuals");
// eslint-disable-next-line
const { writeDiff } = require("../../utils/writeDiff");

module.exports = (on, config) => {
  // on('file:preprocessor', webpack({
  //  webpackOptions: require('@vue/cli-service/webpack.config'),
  //  watchOptions: {}
  // }))
  on("task", {
    // registerCodeCoverageTasks(on, config)
    deleteActuals: function (path) {
      deleteActuals(path);
      return null;
    },

    writeDiff: async function (args) {
      console.log("args to pass to diff", args);
      const result = await writeDiff(args);
      console.log("result", result);
      return result;
    },
  });

  return Object.assign({}, config, {
    fixturesFolder: "tests/e2e/fixtures",
    integrationFolder: "tests/e2e/specs",
    videosFolder: "tests/e2e/videos",
    supportFile: "tests/e2e/support/index.js",
  });
};
