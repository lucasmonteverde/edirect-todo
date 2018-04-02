const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const NodemonPlugin = require('nodemon-webpack-plugin');

require('dotenv').config({ silent: true });

const sassLoader = [
	MiniCssExtractPlugin.loader,
	{
		loader: 'css-loader',
		options: {
			minimize: {
				safe: true
			}
		}
	},
	'postcss-loader',
	'sass-loader'
];

module.exports = {
	entry: {
		app: path.resolve(__dirname, 'src')
	},
	output: {
		path: path.resolve(__dirname, 'dist'),
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
				use: 'babel-loader'
			},
			{
				test: /\.s?css$/,
				use: sassLoader
			},
			{
				test: /\.vue$/,
				loader: 'vue-loader',
				options: {
					loaders: {
						js: 'babel-loader',
						scss: sassLoader
					}
				}
			}
		]
	},
	plugins: [
		new HtmlWebPackPlugin({
			template: './src/index.html',
			favicon: './src/assets/favicon.ico',
			filename: 'index.html'
		}),
		new MiniCssExtractPlugin({
			filename: 'css/style.css'
		}),
		new NodemonPlugin({
			script: 'server.js',
			watch: ['app','server.js']
		})
	]
};