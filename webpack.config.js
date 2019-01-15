const webpack = require("webpack");

module.exports = {
  entry: ["@babel/polyfill", "./src/index.js"],
  output: {
    path: __dirname + "/docs",
    publicPath: "/",
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader", "eslint-loader"]
      }
    ]
  },
  resolve: {
    extensions: ["*", ".js", ".jsx"]
  },
  plugins: [new webpack.HotModuleReplacementPlugin()],
  devServer: {
    contentBase: "./docs",
    hot: true
  }
};
