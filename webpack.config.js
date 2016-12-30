// Copyright (c) 2016 Panjie Setiawan Wicaksono
//
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php

const path = require('path');
const webpack = require('webpack');
const atl = require('awesome-typescript-loader');

const CheckerPlugin = atl.CheckerPlugin;
const TsConfigPathsPlugin = atl.TsConfigPathsPlugin;
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const DotenvPlugin = require('./config/webpack.plugins').DotenvPlugin;
const CompressionPlugin = require("compression-webpack-plugin");

function createConfig(env) {
	env = env || {};

	const config = {
		bail: true
	};

	if (env.prod) {
		config.devtool = 'cheap-module-source-map';
	} else {
		config.devtool = 'eval-source-map';
	}

	if (env.prod) {
		config.entry = {
			'vendor.react': [
				'react',
				'react-dom',
				'react-addons-css-transition-group',
				'react-router',
				// 'flexbox-react',
				// 'react-toolbox'
			],
			// 'vendor.toolbox': [
			// 	'react-toolbox/lib/app_bar',
			// 	'react-toolbox/lib/button',
			// 	'react-toolbox/lib/checkbox',
			// 	'react-toolbox/lib/font_icon',
			// 	'react-toolbox/lib/input',
			// 	'react-toolbox/lib/overlay',
			// 	'react-toolbox/lib/progress_bar',
			// 	'react-toolbox/lib/ripple',
			// 	'react-toolbox/lib/snackbar',
			// 	'react-toolbox/lib/tooltip',
			// 	'react-toolbox/lib/utils',
			// ],
			app: [
				'./src/index'
			]
		}
	} else {
		config.entry = {
			app: [
				'webpack-dev-server/client?http://localhost:8080',
				'webpack/hot/only-dev-server',
				'./src/index'
			]
		}
	}

	if (!env.test) {
		config.output = {
			path: path.resolve(__dirname, 'dist'),
			publicPath: '/',
			filename: env.prod ? 'assets/js/[name].[chunkhash].js' : 'bundle.js'
		}
	}

	config.resolve = {
		unsafeCache: false,
		extensions: ['.js', '.ts', '.tsx', '.json', '.css', '.scss'],
		mainFields: ['browser', 'web', 'browserify', 'main', 'style']
	}

	const commonStyleRules = [
		{
			loader: 'css-loader',
			query: {
				modules: true,
				sourceMap: true,
				minimize: true,
				localIdentName: '[name]__[local]___[hash:base64:5]',
				importLoaders: 2
			}
		},
		{ loader: 'postcss-loader', query: { config: 'config' } },
		{ loader: 'sass-loader', query: {sourceMap: true} }
	];
	const cssRule = {
		test: /\.css$|\.scss$/
	}
	if (env.prod) {
		cssRule.loader = ExtractTextPlugin.extract({
			fallbackLoader: 'style-loader',
			loader: commonStyleRules
		})
	} else {
		cssRule.use = ['style-loader'].concat(commonStyleRules);
	}
	config.module = {
		rules: [
			{ test: /\.scss\.d\.ts$/, loader: 'null-loader' },
			{
				test: /\.ts(x?)$/,
				loader: 'awesome-typescript-loader',
				exclude: [
					/node_modules/,
					/\.scss\.d\.ts$/
				]
			},
			{
				test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
				loader: 'file-loader',
				query: { name: 'assets/[name].[hash].[ext]' }
			},
			cssRule
		]
	}

	config.plugins = [
		new webpack.LoaderOptionsPlugin({
			debug: true,
			context: __dirname
		}),
		new CheckerPlugin(),
		new TsConfigPathsPlugin(),
		new DotenvPlugin({
			path: env.fb ? './.env.fb' : './.env'
		})
	];

	if (env.prod) {
		config.plugins.push(
			new ExtractTextPlugin({ filename: 'assets/css/[name].[hash].css' }),
			new webpack.optimize.CommonsChunkPlugin({
				names: [/*'vendor.toolbox', */'vendor.react', 'manifest']
			}),
			new webpack.optimize.UglifyJsPlugin({
				sourceMap: true
			}),
			new HtmlWebpackPlugin({
				template: path.join(__dirname, 'public', 'index.tpl.html'),
				inject: 'body'
			}),
			new CopyWebpackPlugin([{
				from: path.join(__dirname, 'public', 'assets'),
				to: 'assets'
			}])
		)
		if (!env.fb) {
			config.plugins.push(new CompressionPlugin({
				asset: "[path].gz[query]",
				algorithm: "zopfli",
				test: /\.js$|\.css$/,
				threshold: 10240,
				minRatio: 0.8
			}))
		}
	} else if (!env.prod && !env.test) {
		config.plugins.push(
			new webpack.NamedModulesPlugin(),
			new webpack.HotModuleReplacementPlugin()
		)
	}

	if (!env.test && !env.prod) {
		config.devServer = {
			hot: true,
			contentBase: path.resolve(__dirname, 'public'),
			publicPath: '/',
			stats: {
				colors: true
			},
			historyApiFallback: true
		}
	}

	return config;
}

module.exports = createConfig;
