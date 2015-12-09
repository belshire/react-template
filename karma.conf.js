var webpack = require('webpack');

module.exports = function(config) {
  config.set({

    browsers: ['PhantomJS'],

    singleRun: !!process.env.CONTINUOUS_INTEGRATION,

    frameworks: ['mocha', 'chai', 'sinon-chai'],

    files: [
      './node_modules/phantomjs-polyfill/bind-polyfill.js',
      'tests.webpack.js'
    ],

    preprocessors: {
      'tests.webpack.js': ['webpack', 'sourcemap']
    },

    reporters: ['mocha', 'progress', 'coverage'],

    coverageReporter: {
      type: 'html',
      dir: 'coverage/'
    },

    webpack: {
      devtool: 'inline-source-map',
      module: {
        loaders: [
          {
            test: /\.(jpe?g|png|gif|svg)$/,
            loader: 'url',
            query: {limit: 10240}
          },
          {
            test: /\.js$/,
            exclude: /node_modules|\.spec\.js/,
            loader: 'isparta?{babel: {stage: 0}}'
          },
          {
            test: /\.spec\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader'
          },
          {
            test: /\.json$/,
            loader: 'json-loader'
          },
          {
            test: /\.scss$/,
            loader: 'style!css?modules&importLoaders=2&sourceMap&localIdentName=[local]___[hash:base64:5]!autoprefixer?browsers=last 2 version!sass?outputStyle=expanded&sourceMap'
          }
        ]
      },
      resolve: {
        modulesDirectories: [
          'src',
          'node_modules'
        ],
        extensions: ['', '.json', '.js']
      },
      node: {
        fs: 'empty'
      },
      plugins: [
        new webpack.IgnorePlugin(/\.json$/),
        new webpack.NoErrorsPlugin(),
        new webpack.DefinePlugin({
          'process.env': {
            BROWSER: true,
            NODE_ENV: JSON.stringify('test')
          },
          __CLIENT__: true,
          __SERVER__: false,
          __DEVELOPMENT__: true
        })
      ]
    },

    webpackServer: {
      noInfo: true
    }

  });
};
