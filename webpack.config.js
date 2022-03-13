const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./static/index.ts",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle-[hash].js",
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    port: 3000,
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [
          {
            loader: "ts-loader",
            options: {
              configFile: path.resolve(__dirname, "tsconfig.json"),
            },
          }
        ]
      },
      {
        test: /\.pug$/,
        use: [{
          loader: "pug-loader",
          options: {}
        }]
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: "file-loader"
          },
          {
            loader: "svgo-loader",
          }
        ]
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {},
          },
          "css-loader",
          "sass-loader",
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./static/index.pug",
      filename: "index.html",
      minify: {
        collapseWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
      },
    }),
    new MiniCssExtractPlugin({
      filename: "style-[hash].css",
    }),
  ],
};
