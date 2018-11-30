const HtmlWebpackPlugin = require("html-webpack-plugin");

const path = require('path');
console.log(path);

const merge = require("webpack-merge");
const parts = require("./webpack.parts");


const commonConfig = merge([
  parts.loadSVG_inline({
    include: /svg\/inline/,
  }),
  parts.loadSVG({
    exclude: /svg\/inline/,
  }),
  parts.loadSCSS_global({
    include: /styles\/global/,
  }),
  parts.loadSCSS_modules({
    exclude: /styles\/global/,
    localIdentName: '[path][name]__[local]--[hash:base64:5]',
  }),
  {
    /* https://github.com/jantimon/html-webpack-plugin  plugins list to extend 
      but you can also use https://www.npmjs.com/package/html-webpack-template as an alternative with additonal functionality */
    plugins: [
      new HtmlWebpackPlugin({
        title: "Webpack demo",
        filename: 'index.html',
        template: 'src/public/index.html',
        /* cdn: "www.google.co.uk", // can create any arbitrary data here that can be used in the html file   <link src="<%= htmlWebpackPlugin.options.cdn %>" /> */
        minify: {
          /* collapseWhitespace: true, // to ugligy html on to one line */
          removeComments: true,
          removeRedundantAttributes: true,
          removeScriptTypeAttributes: true,
          removeStyleLinkTypeAttributes: true,
          useShortDoctype: true,
          minifyCSS: true
        }
      })
    ],
  },
]);

const productionConfig = merge([
  parts.loadImages({
    options: {
      limit: 10,
      name: "[name]_[hash:5].[ext]",
    },
  }),
]);

const developmentConfig = merge([
  parts.loadImages(),
  parts.devServer({
    host: process.env.HOST,
    port: process.env.PORT,
  })
]);

// const ErrorOverlayPlugin = require('error-overlay-webpack-plugin') // plugin for showing better error overlay in browser when code breaks. https://www.npmjs.com/package/error-overlay-webpack-plugin
module.exports = mode => {
  if (mode === "production") {
    return merge(commonConfig, productionConfig, { mode });
  }
  return merge(commonConfig, developmentConfig, { mode });

};
