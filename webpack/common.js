const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  context: path.resolve(__dirname, '../src'),  
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        enforce: 'pre',
        loader: 'tslint-loader',
        options: {
          typeCheck: true
        },
      },
      {
        test: /\.tsx?$/,
        use: [{ 
          loader: 'ts-loader',
          options: {
            happyPackMode: true,
          },
        } ],
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        loaders:  ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader'
        })
      },
      {
        test: /\.(scss|sass)$/,
        loaders:  ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', {
            loader: 'sass-loader',
            options: {
              includePaths: [path.resolve(__dirname, '../src')],
            },
          }]
        })
      },
      {
        test: /\.svg$/,
        loader: 'svg-react-loader',
      },
      {
        test: /\.(gif|png|jpe?g)$/i,
        loader: 'url-loader',
        options: {
          limit: 8000,         
          name: 'images/[hash]-[name].[ext]'          
        }
      },
      {
        test: /\.(eot|woff2|otf|woff|ttf)$/i,
        loader: 'url-loader',
        options: {
          limit: 65000,
          mimetype: 'application/octet-stream ',        
          name: 'fonts/[name].[ext]'          
        }
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.ts', '.tsx', '.css', '.scss'],    
    modules: [
      path.resolve('src'),
      path.resolve('node_modules')
    ]
  },
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new ExtractTextPlugin({ filename: '[name]-styles.css', disable: true }),
    new HtmlWebpackPlugin({
      title: 'Follow ball',
      filename: 'index.html',
      template: 'index.html',
      inject: 'body',
      hash: true,
      cache: true
    }),
  ],
}
