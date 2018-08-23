import * as webpack from 'webpack'
import * as path from 'path'
import * as CopyWebpackPlugin from 'copy-webpack-plugin'
import * as HtmlWebpackPlugin from 'html-webpack-plugin'
import * as ChromeExtensionReloader from 'webpack-chrome-extension-reloader'

const configrations: webpack.Configuration = {
  entry: {
    'background': path.resolve(__dirname, 'src', 'scripts', 'background.ts'),
    'content_script': path.resolve(__dirname, 'src', 'scripts', 'content_script.ts'),
    'popup': path.resolve(__dirname, 'src', 'scripts', 'popup.ts')
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist', 'scripts')
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader'
      },
      {
        test: /\.pug$/,
        use: 'pug-loader',
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    // copy manifest.json to dist
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, 'src', 'manifest.json'),
        to: path.resolve(__dirname, 'dist')
      }
    ]),
    // transpile popup.pug
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src', 'templates', 'popup.pug'),
      filename: path.resolve(__dirname, 'dist', 'popup.html'),
      inject: false
    }),
    // transpile options.pug
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src', 'templates', 'options.pug'),
      filename: path.resolve(__dirname, 'dist', 'options.html'),
      inject: false
    }),
    new ChromeExtensionReloader({
      reloadPage: true
    })
  ],
  resolve: {
    extensions: [ '.ts', '.pug' ]
  },
  devtool: 'cheap-module-source-map'
}

export default configrations
