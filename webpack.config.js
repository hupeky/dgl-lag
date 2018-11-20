const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
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
    }),],
};
