const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const NodemonPlugin = require('nodemon-webpack-plugin');

require('dotenv').config({ silent: true });

module.exports = {
	entry: {
		app: path.resolve(__dirname, 'src')
	},
	output: {
		path: __dirname + '/dist',
		//publicPath: '/public/',
		publicPath: '/',
		filename: 'js/[name].js'
	},
	resolve: {
		alias: {
			'vue$': 'vue/dist/vue.esm.js'
		},
		extensions: ['*', '.js', '.vue', '.json']
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader'
				}
			},
			{
				test: /\.scss$/,
				use: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: ['css-loader', 'sass-loader']
				})
			},
			{
				test: /\.vue$/,
				loader: 'vue-loader'
			},
			{
				test: /\.html$/,
				use: {
					loader: 'html-loader',
				}
			}
		]
	},
	optimization:{
		runtimeChunk: false,
		splitChunks: {
			minSize: 300000,
			//chunks: 'all',
		}
	},
	plugins: [
		new HtmlWebPackPlugin({
			template: './src/index.html',
			filename: 'index.html'
		}),
		//new ExtractTextPlugin('css/style.css'),
		new NodemonPlugin({
			script: 'server.js',
			watch: ['app','server.js']
		})
	]
};