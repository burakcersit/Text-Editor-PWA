const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

// TODO: Add and configure workbox plugins for a service worker and manifest file.
// TODO: Add CSS loaders and babel to webpack.

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      new HtmlWebpackPlugin({
				template: './index.html',
        title: "jate- text editor"
			}),
      new InjectManifest({
				swSrc: './src-sw.js',
				swDest: 'service-worker.js',
			}),
			new WebpackPwaManifest({// manifes json file creating
        fingerprints: false,
				inject: true,
				name: 'jate-Text Editor',
				short_name: 'jate-te',
				description: 'Just Another Text Editor',
				background_color: '#1e1e1e',
				theme_color: '#1e1e1e',
				start_url: '/',
				publicPath: '/',

				icons: [
					{
						src: path.resolve('src/images/logo.png'),
						sizes: [96, 128, 192, 256, 384, 512],
						destination: path.join('assets', 'icons'),
					},
				],
			}),
	
    ],
// loader for css to webpack
    module: {
      rules: [
        {// .css file and adds the in the js file
					test: /\.css$/i,
					use: ['style-loader', 'css-loader'],
				},
				{
					test: /\.m?js$/,
					exclude: /node_modules/,
					use: {// usibg babel loader - es6
						loader: 'babel-loader',
						options: {
							presets: ['@babel/preset-env'],
							plugins: [
								'@babel/plugin-proposal-object-rest-spread', '@babel/transform-runtime',
							],
						},
					},
				},
      ],
    },
  };
};
