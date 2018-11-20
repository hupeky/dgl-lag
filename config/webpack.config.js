const HtmlWebpackPlugin = require("html-webpack-plugin");
// const ErrorOverlayPlugin = require('error-overlay-webpack-plugin') // plugin for showing better error overlay in browser when code breaks. https://www.npmjs.com/package/error-overlay-webpack-plugin
console.log ("fuck you", HtmlWebpackPlugin);
module.exports = {
  devServer: {
    historyApiFallback: false, // if you are using HTML5 History API based routing. React router page refresh works in dev mode with this
    open: true, // open: 'Chrome' to open a specofoc browser
    host: process.env.HOST, // Defaults to `localhost`
    port: process.env.PORT, // Defaults to 8080
    contentBase: "public"
  },
  

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
};
