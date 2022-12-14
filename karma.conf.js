// Karma configuration
// Generated on Fri May 22 2020 08:53:48 GMT+0800 (GMT+08:00)
const path = require("path");

module.exports = function (config) {
  config.set({
    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: "",

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ["mocha", "chai", "webpack"],

    // list of files / patterns to load in the browser
    // files: ["test/*.ts"],
    files: ["test/**/*.ts"],

    // list of files / patterns to exclude
    exclude: [],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      "test/*.ts": "webpack",
    },

    webpack: {
      // karma watches the test entry points
      // Do NOT specify the entry option
      // webpack watches dependencies
      // webpack configuration
      module: {
        rules: [
          {
            test: /\.tsx?$/,
            use: [
              {
                loader: "ts-loader",
                options: {
                  configFile: "tsconfig.test.json",
                },
              },
            ],
            exclude: /node_modules/,
          },
          {
            test: /\.ts$/,
            exclude: [path.resolve(__dirname, "test")],
            enforce: "post",
            use: {
              loader: "istanbul-instrumenter-loader",
              options: { esModules: true },
            },
          },
        ],
      },
      resolve: {
        extensions: [".ts", ".js"],
      },
    },

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ["mocha", "coverage"],

    // web server port
    port: 9876,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR ||
    // config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    // browsers: ["Chrome", "Firefox"],
    browsers:
      process.env.CI === "true" ? ["ChromeHeadless"] : ["Chrome", "Firefox"],

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity,

    client: {
      mocha: {
        // change Karma's debug.html to the mocha web reporter
        reporter: "html",
      },
    },

    coverageReporter: {
      // specify a common output directory
      dir: "coverage",
      reporters: [{ type: "lcov", subdir: "report-lcov" }],
    },
  });
};
