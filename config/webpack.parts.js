exports.devServer = ({ host, port } = {}) => ({
  devServer: {
    historyApiFallback: false, // if you are using HTML5 History API based routing. React router page refresh works in dev mode with this
    // open: true, // open: 'Chrome' to open a specofoc browser
    host: host, // Defaults to `localhost`
    port: port, // Defaults to 8080
    contentBase: "public"
  },
});

exports.loadImages = ({ include, exclude, options } = {}) => ({
  module: {
    rules: [
      {
        test: /\.(jpg|png)$/,
        use: {
          loader: "url-loader",
          options,
        },
      },
    ],
  },
});

exports.loadSCSS_global = ({ include, exclude } = {}) => (
  {
    module: {
      rules: [
        {
          test: /\.(css|scss)$/,
          use: ["style-loader", "css-loader", "sass-loader"],
          include,
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

exports.loadSVG_inline = ({ include, exclude } = {}) => (
  {
    module: {
      rules: [
        {
          test: /\.svg$/,
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


exports.loadSCSS_modules = ({ include, exclude, localIdentName } = {}) => (
  {
    module: {
      rules: [
        {
          test: /\.(css|scss)$/,
          // exclude global.css and make its own test so as to not run a css module version 
          // use can be written like this for defualt chaining use: ["style-loader", "css-loader"]
          // or can be expanded for each individual array entry to expand options
          exclude,
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
