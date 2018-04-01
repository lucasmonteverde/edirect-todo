const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const NodemonPlugin = require('nodemon-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

require('dotenv').config({ silent: true });

module.exports = {
	entry: {
		app: path.resolve(__dirname, 'src')
	},
	output: {
		path: __dirname + '/dist',
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
				test: /\.css$/,
				use: [
					MiniCssExtractPlugin.loader,
					'css-loader'
				]
			},
			{
				test: /\.scss$/,
				use: [
					MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader',
						options: {
							minimize: {
								safe: true
							}
						}
					},
					'sass-loader'
				]
			},
			{
				test: /\.vue$/,
				loader: 'vue-loader',
				options: {
					loaders: {
						js: 'babel-loader',
						scss: [
							MiniCssExtractPlugin.loader,
							{
								loader: 'css-loader',
								options: {
									minimize: {
										safe: true
									}
								}
							},
							'sass-loader'
						]
					}
				}
			},
			/* {
				test: /\.html$/,
				use: {
					loader: 'html-loader',
				}
			} */
		]
	},
	optimization: {
		/* runtimeChunk: false,
		splitChunks: {
			//minSize: 300000,
			chunks: 'all'
		}, */
		/* splitChunks: {
			cacheGroups: {
				commons: {
					test: /\.js$/,
					name: 'js',
					chunks: 'all'
				},
				css: {
					name: 'styles',
					test: /\.(css|sass|scss)$/,
					chunks: 'all'
				}
			}
		},*/
		/* minimizer: [
			new UglifyJsPlugin({
				cache: true,
				parallel: true,
				sourceMap: false
			}),
			new OptimizeCSSAssetsPlugin({})
		] */
	},
	plugins: [
		new HtmlWebPackPlugin({
			template: './src/index.html',
			filename: 'index.html'
		}),
		new MiniCssExtractPlugin({
			filename: 'css/style.[hash].css'
		}),
		new NodemonPlugin({
			script: 'server.js',
			watch: ['app','server.js']
		})
	]
};