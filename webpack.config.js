module.exports = {
  context: __dirname,
  entry: "./lib/main.js",
  output: {
    path: "./js",
    publicPath: "/js/",
    filename: "JMoD.js",
    devtoolModuleFilenameTemplate: '[resourcePath]',
    devtoolFallbackModuleFilenameTemplate: '[resourcePath]?[hash]'
  },
  devtool: 'source-maps'
};
