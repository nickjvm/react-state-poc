const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (env) => {
  const isProduction = env.production;
  const plugins = [
    new HtmlWebpackPlugin({
      template:  path.resolve('./index.html'),
    }),
  ];

  if (isProduction) {
    plugins.push(
      new MiniCssExtractPlugin({
        filename: 'style.css',
        chunkFilename: '[name].css',
      }));
  }

  return{
    entry: './src/index.jsx',
    output: {
      path: path.resolve(__dirname, 'build'),
      publicPath: '/',
      filename: 'bundle.js',
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
      extensions: ['.js', '.jsx'],
    },
    devServer: {
      liveReload: true,
    },
    module: {
      rules : [
        {
          test    : /\.(js|jsx)$/,
          exclude : /node_modules/,
          use     : [ 'babel-loader', 'eslint-loader' ],
        },
        {
          test : /\.scss$/,
          use  : isProduction ? [
            MiniCssExtractPlugin.loader,
            'style-loader',
            'css-loader',
            'sass-loader',
          ] : ['style-loader', 'css-loader', 'sass-loader'],
        },
      ],
    },
    plugins,
    devtool : isProduction ? 'source-map' : 'inline-source-map',
  };
};