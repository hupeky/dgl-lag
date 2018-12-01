const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ExtractCssChunks = require("extract-css-chunks-webpack-plugin")
// const GoogleFontsPlugin = require("google-fonts-webpack-plugin") // google fonts downloader not currently working with this version of webpack, needs updating

const path = require('path');
console.log(path);

const merge = require("webpack-merge");
const parts = require("./webpack.parts");


const commonConfig = merge([
  parts.loadFonts({
    include: /svg\/inline/,
  }),
  parts.loadSVG_inline({
    include: /svg\/inline/,
  }),
  {
    /* https://github.com/jantimon/html-webpack-plugin  plugins list to extend 
      but you can also use https://www.npmjs.com/package/html-webpack-template as an alternative with additonal functionality */
    plugins: [
      /* new GoogleFontsPlugin({ // example download of google fonts not working with this version of webpack
        fonts: [{ family: "Roboto", variants: ["400", "700italic"] }]
      }), */
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
      }),
    ],
  },
]);

const developmentConfig = merge([

  parts.loadImages(),

  parts.loadSCSS_global({
    include: /styles\/global/,
    env: "dev"
  }),

  parts.loadSCSS_modules({
    exclude: /styles\/global/,
    localIdentName: '[path][name]__[local]--[hash:base64:5]',
    env: "dev"
  }),

  parts.devServer({
    host: process.env.HOST,
    port: process.env.PORT,
  })

]);

const productionConfig = merge([

  parts.loadSCSS_global({
    include: /styles\/global/,
    env: "prod"
  }),

  parts.loadSCSS_modules({
    exclude: /styles\/global/,
    localIdentName: '[path][name]__[local]--[hash:base64:5]',
    env: "prod"
  }),

  parts.loadImages({
    exclude: /svg\/inline/,
    options: {
      limit: 100000,
      name: "[name]_[hash:5].[ext]",
    },
  }),
  {

    plugins: [
      new ExtractCssChunks(
        {
          // Options similar to the same options in webpackOptions.output
          // both options are optional
          filename: "[name].css",
          chunkFilename: "[id].css",
          hot: true, // if you want HMR - we try to automatically inject hot reloading but if it's not working, add it to the config
          orderWarning: true, // Disable to remove warnings about conflicting order between imports
          reloadAll: true, // when desperation kicks in - this is a brute force HMR flag
          cssModules: true // if you use cssModules, this can help.
        }
      ),
    ],
  },
]);

// const ErrorOverlayPlugin = require('error-overlay-webpack-plugin') // plugin for showing better error overlay in browser when code breaks. https://www.npmjs.com/package/error-overlay-webpack-plugin
module.exports = mode => {
  if (mode === "production") {
    return merge(commonConfig, productionConfig, { mode });
  }
  return merge(commonConfig, developmentConfig, { mode });
};
