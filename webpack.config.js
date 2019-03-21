const webpack = require("webpack");

module.exports = {
  entry: {
    bundle: "./src/index.js",
    platform: "./src/components/Platform/index.js",
    geoCode: "./src/components/GeoCode/index.js",
    layer: "./src/components/Layer/index.js",
    places: "./src/components/Places/index.js",
    route: "./src/components/Route/index.js",
    map: "./src/components/HMap/index.js",
    "/mapObjects/circle": "./src/components/HMap/objects/Circle.js",
    "/mapObjects/marker": "./src/components/HMap/objects/Marker.js",
    "/mapObjects/polygon": "./src/components/HMap/objects/Polygon.js",
    "/mapObjects/polyline": "./src/components/HMap/objects/Polyline.js",
    "/mapObjects/rectangle": "./src/components/HMap/objects/Rectangle.js"
  },
  output: {
    filename: "[name].js",
    path: __dirname + "/dist",
    publicPath: "/"
  },
  // entry: ["@babel/polyfill", "./src/index.js"],
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
