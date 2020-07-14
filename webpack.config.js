const path = require('path');
const fs = require('fs')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const appDirectory = fs.realpathSync(process.cwd())
const resolveApp = relativePath => path.resolve(appDirectory, relativePath)

module.exports = {
  mode: 'development',//'production',
  entry: './src/index.ts',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  target: 'node',
  externals: {
    'ejs': 'commonjs ejs',
    'chalk': 'commonjs chalk',
    'inquirer': 'commonjs inquirer',
    'yargs': 'commonjs yargs',
    'make-dir': 'commonjs make-dir',
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ],
    alias: {
      '@': resolveApp('src')
    }
  },
  output: {
    filename: 'index.js',
    path: path.resolve(process.cwd(), 'dist'),
  },
  plugins: [
    new CleanWebpackPlugin({})
  ],
};
