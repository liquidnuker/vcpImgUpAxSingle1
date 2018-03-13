const path = require('path');
const webpack = require('webpack');
var Promise = require('es6-promise').Promise;

const glob = require('glob-all');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const PurifyCSSPlugin = require('purifycss-webpack');
const extractCSS = new ExtractTextPlugin('../[name].bundle.css');

module.exports = {
	context: path.resolve(__dirname, './src'),
	entry: {
		index: './index.js'
			// vendor: ['jquery', 'lodash']
	},
	output: {
		path: path.resolve(__dirname, './dist'),
		publicPath: "dist/",
		filename: '[name].bundle.js',
		chunkFilename: '[id].chunk.js'
	},
	module: {
		rules: [
			// extractCSS
			{
				test: /\.scss$/,
				loader: extractCSS.extract(['css-loader', 'sass-loader'])
			},
			// url loader
			{
				test: /\.(png|svg|jpg|otf|ttf)$/,
				use: [{
					loader: 'url-loader',
					options: {
						limit: 10000
					} // Convert images < 10k to base64 strings
				}]
			}, {
				test: /\.vue$/,
				loader: 'vue-loader',
				options: {
					loaders: {
						// Since sass-loader (weirdly) has SCSS as its default parse mode, we map
						// the "scss" and "sass" values for the lang attribute to the right configs here.
						// other preprocessors should work out of the box, no loader config like this nessessary.
						'scss': 'vue-style-loader!css-loader!sass-loader',
						'sass': 'vue-style-loader!css-loader!sass-loader?indentedSyntax'
					},
					esModule: false
						// other vue-loader options go here
				}
			},
			// babel-loader
			{
				test: /\.js$/,
				loader: 'babel-loader',
				options: {
					presets: ['env'],
					plugins: ['syntax-dynamic-import']
						// plugins: ['syntax-dynamic-import','transform-runtime']
				},
				exclude: /node_modules/
			}
		]
	},
	externals: {
		$: 'jquery',
		Vue: 'vue',
		VueRouter: 'vue-router'
	},
	plugins: [
		// new webpack.ProvidePlugin({
		//   $: 'jquery',
		//   jQuery: 'jquery'
		// }),
		// new webpack.optimize.CommonsChunkPlugin({
		//   name: 'vendor',
		// }),
		extractCSS,
		new PurifyCSSPlugin({
			// Give paths to parse for rules. These should be absolute!
			paths: glob.sync([
				path.join(__dirname, '*.html'),
				path.join(__dirname, 'src/vue-components/*.vue')
			]),
      purifyOptions: {
        whitelist: [ '*:not*' ]
      },
      minimize: true
		})
	],
	resolve: {
		modules: [
			'../../node_modules',
		]
	}
};