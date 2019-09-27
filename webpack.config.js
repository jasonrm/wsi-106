const SriPlugin = require('webpack-subresource-integrity');
const FixStyleOnlyEntriesPlugin = require("webpack-fix-style-only-entries");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WebpackAssetsManifest = require('webpack-assets-manifest');

module.exports = {
  entry: {
    index: ["./index.js"],
    style: ["./style.css"],
  },
  mode: "production",
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1
            }
          }
        ]
      },
    ],
  },
  output: {
    crossOriginLoading: 'anonymous'
  },
  plugins: [
    new FixStyleOnlyEntriesPlugin(),
    new MiniCssExtractPlugin({
      filename: "[name].css",
    }),
    new WebpackAssetsManifest({integrity: true}),
    new SriPlugin({
      hashFuncNames: ['sha256', 'sha384'],
      enabled: true
    }),
  ],
};
