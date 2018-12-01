const ExtractCssChunks = require("extract-css-chunks-webpack-plugin")

exports.devServer = ({ host, port } = {}) => ({
  devServer: {
    historyApiFallback: false, // if you are using HTML5 History API based routing. React router page refresh works in dev mode with this
    // open: true, // open: 'Chrome' to open a specofoc browser
    host: host, // Defaults to `localhost`
    port: port, // Defaults to 8080
    contentBase: "public"
  },
  output: {
    // your stuff
    publicPath: '/'
  },
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

exports.loadSVG = ({ include, exclude } = {}) => (
  {
    module: {
      rules: [
        {
          test: /\.svg$/,
          exclude,
          use: {
            loader: "file-loader",
            options: {
              name: '[name].[ext]',
            }
          }
        },
      ],
    },
  });

exports.loadImages = ({ include, exclude, options } = {}) => ({
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
});

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
            "css-loader", "sass-loader"],
          include,
          exclude,
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
                modules: true,
                localIdentName,
                importLoaders: 2, // tells css-loader to use both sass loader and postCss loader for imports directly in css
              }
            },
            "sass-loader",
            {
              loader: "postcss-loader",
              options: {
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

exports.extractSCSS_modules = ({ include, exclude, localIdentName } = {}) => (
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
            "style-loader",
            {
              loader: "css-loader",
              options: {
                modules: true,
                localIdentName,
                importLoaders: 2, // tells css-loader to use both sass loader and postCss loader for imports directly in css
              }
            },
            "sass-loader",
            {
              loader: "postcss-loader",
              options: {
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