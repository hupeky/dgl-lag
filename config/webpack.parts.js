const ExtractCssChunks = require("extract-css-chunks-webpack-plugin")
var path = require('path')

exports.devServer = ({ host, port } = {}) => ({
  devServer: {
    historyApiFallback: false, // if you are using HTML5 History API based routing. React router page refresh works in dev mode with this
    // open: true, // open: 'Chrome' to open a specofoc browser
    host: host, // Defaults to `localhost`
    port: port, // Defaults to 8080
    contentBase: "public"
  },
  devtool: 'inline-source-map',
  output: {
    // your stuff
    publicPath: '/'
  },
});

exports.loadJS = ({ include, exclude } = {}) => (
  {
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              babelrc: true,
              babelrcRoots: [
                ".",
              ]
            }
          }
        }
      ]
    }
  });

exports.loadFonts = ({ include, exclude } = {}) => (
  {
    module: {
      rules: [
        {
          // Match woff2 in addition to patterns like .woff?v=1.1.1.
          test: /\.(ttf|woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
          use: {
            loader: "url-loader",
            options: {
              // Limit at 50k. Above that it emits separate files
              limit: 50000,
              // url-loader sets mimetype if it's passed.
              // Without this it derives it from the file extension mimetype: "application/font-woff",
              // Output below fonts directory
              name: "./fonts/[name].[ext]",
            }
          },
        },
      ],
    },
  });

exports.loadSVG_inline = ({ include, exclude } = {}) => (
  {
    module: {
      rules: [
        {
          test: /\.svg$/,
          exclude,
          include,
          use: {
            loader: "svg-inline-loader",
            options: {
              removeTags: true
            }
          }
        },
      ],
    },
  });

exports.loadImages = ({ include, exclude, options, target } = {}) => {
  console.log("target", target)
  return {
    module: {
      rules: [
        {
          test: /\.(jpg|png|svg)$/,
          use: {
            loader: "url-loader",
            options,
          },
          exclude,
          include,
        },
      ],
    },
  }
};

exports.loadSCSS_global = ({ include, exclude, env } = {}) => (
  {
    module: {
      rules: [
        {
          test: /\.(css|scss)$/,
          use: [env === "prod" ? (
            "style-loader",
            ExtractCssChunks.loader)
            :
            "style-loader",
            "css-loader",
            "sass-loader",
          {
            loader: "postcss-loader",
            options: {
              plugins: () => ([
                require("autoprefixer")
              ]),
            },
          },],
          include,
          exclude,
        },
      ],
    },
  });

exports.loadSCSS_modules = ({ include, exclude, localIdentName, env } = {}) => (
  {
    module: {
      rules: [
        {
          test: /\.(css|scss)$/,
          // exclude global.css and make its own test so as to not run a css module version 
          // use can be written like this for defualt chaining use: ["style-loader", "css-loader"]
          // or can be expanded for each individual array entry to expand options
          exclude,
          include,
          use: [
            env === "prod" ? (
              "style-loader",
              ExtractCssChunks.loader)
              :
              "style-loader",
            {
              loader: "css-loader",
              options: {
                sourceMap: true,
                modules: true,
                localIdentName,
                importLoaders: 2, // tells css-loader to use both sass loader and postCss loader for imports directly in css
              }
            },
            "sass-loader",
            {
              loader: "postcss-loader",
              options: {
                sourceMap: true,
                plugins: () => ([
                  require("autoprefixer")
                ]),
              },
            },
          ],
        },
      ],
    },
  });

  /*exports.loadSVG = () => (
  {
    module: {
      rules: [
        {
          test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
          issuer: {
            test: /\.js?$/
          },
          use: ['babel-loader', '@svgr/webpack', 'url-loader']
        },
        {
          test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
          loader: 'url-loader'
        },
      ]
    }
  }
); */
