const path = require('path');
const exit = require('process').exit;
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');
const DEFAULT_STEP = 'common/app';

module.exports = function(env = {}, args) {
  if (process.env.NODE_ENV === 'production') {
    env.production = true;
  }

  const stepArg = process.argv.find(arg => arg.startsWith('--step-'));
  let stepDir = stepArg && stepArg.replace('--step-', '');
  const STEPS_DIRECTORY = 'steps/';
  stepDir = stepDir === '' || stepDir === 'true' ? DEFAULT_STEP : `${STEPS_DIRECTORY}${stepDir}`;
  const stepGenericName = stepDir.substring(STEPS_DIRECTORY.length).split('-').shift();
  if (!fs.existsSync(stepDir)) {
      stepDir = DEFAULT_STEP;
  }

  console.log(`Will run step ${stepDir}`);
  console.log(`=== Running ${env.step ? `step ${env.step}` : `the base app`} ===`);

  let paths;
  try {

    paths = {
      step: stepDir,
      dist: env.prod ? 'build': '.tmp',
      assets: 'assets',
      commons: 'common',
      indexTemplate: ''
    };

    fs.accessSync(path.resolve(__dirname, paths.step));

    const landingFile = '/templates/landing.html';
    try {
      paths.indexTemplate = path.join(paths.step, landingFile);
      fs.accessSync(paths.indexTemplate, fs.constants.R_OK);
    } catch (err) {
      paths.indexTemplate = path.join('common/default-for-steps/', stepGenericName, landingFile);
      fs.accessSync(paths.indexTemplate, fs.constants.R_OK);
    }

  } catch (err) {
    console.error(`

    ¯\_(ツ)_/¯ Oops ...

Sorry, but step ${env.step} does not exist, or isn't supported by this webpack config !
Check the folder name in steps/, read the README and try again.

    `);
    exit();
  }

  try {
    const stepIndex = path.join(__dirname, paths.step, 'app/index.js');
    fs.accessSync(stepIndex, fs.constants.R_OK);
    paths.indexjs = stepIndex;
  } catch (err) {
    paths.indexjs = path.resolve('common/app', 'index.js')
  }

  console.log(`Will use ${paths.indexjs} as entry point`);

  return {
    mode: 'development',
    entry: paths.indexjs,
    output: {
      path: path.resolve(__dirname, '.build'),
      filename: 'bundle.js',
      publicPath: '/'
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          loader: 'babel-loader'
          // Babel options are loaded from .babelrc
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader']
        },
        {
          test: /\.svg$/,
          loader: 'file-loader'
        },
        { test: /\.(png|woff|woff2|eot|ttf|svg)$/, loader: 'url-loader?limit=100000' }
      ]
    },
    plugins: [
      // Emit HTML files that serve the app
      new HtmlWebpackPlugin({
        template: path.resolve(paths.indexTemplate),
        filename: path.resolve(__dirname, paths.dist, 'index.html'),
        alwaysWriteToDisk: true
      })
    ].concat(
      env.production
        ? []
        : [
            // Force writing the HTML files to disk when running in the development mode
            // (otherwise, webpack-dev-server won’t serve the app)
            new HtmlWebpackHarddiskPlugin()
          ]
    ),
    devServer: {
      contentBase: [
        path.join(__dirname, paths.dist),
        path.join(__dirname, paths.assets),
        path.join(__dirname, paths.commons),
        path.join(__dirname, paths.step)
      ],
      compress: true,
      historyApiFallback: true
    }
  };
};
