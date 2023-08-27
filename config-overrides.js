const webpack = require("webpack");
const path = require("path");
const Dotenv = require("dotenv-webpack");

module.exports = function override(config) {
  const fallback = config.resolve.fallback || {};
  Object.assign(fallback, {
    crypto: require.resolve("crypto-browserify"),
    stream: require.resolve("stream-browserify"),
    http: require.resolve("stream-http"),
    https: require.resolve("https-browserify"),
    os: require.resolve("os-browserify"),
  });
  config.resolve.alias = {
    "@": path.resolve(__dirname, "src"),
  };
  config.resolve.fallback = fallback;
  config.ignoreWarnings = [/Failed to parse source map/, /Conflicting values/];
  config.plugins = (config.plugins || []).concat([
    new webpack.ProvidePlugin({
      process: "process/browser",
      Buffer: ["buffer", "Buffer"],
    }),
    new Dotenv({ systemvars: true }),
  ]);
  config.module.rules.push({
    test: /\.m?js/,
    resolve: {
      fullySpecified: false,
    },
  });
  return config;
};
