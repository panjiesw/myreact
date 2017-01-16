// Copyright (c) 2016 Panjie Setiawan Wicaksono
//
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php

const path = require('path');
const webpack = require('webpack');
const atl = require('awesome-typescript-loader');
const wt = require('./tools/webpack');
const pkg = require('./package.json');

const fb = {
	core: require('./node_modules/firebase/package.json').version,
	ui: require('./node_modules/firebaseui/package.json').version
}

const CheckerPlugin = atl.CheckerPlugin;
const TsConfigPathsPlugin = atl.TsConfigPathsPlugin;
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const DotenvPlugin = wt.DotenvPlugin;
const FaviconsWebpackPlugin = wt.FaviconsWebpackPlugin;
const CompressionPlugin = require("compression-webpack-plugin");

function htmlTemplate(filename = 'index.html') {
	return {
		filename,
		title: 'My React Playground',
		inject: false,
		template: path.resolve(__dirname, 'tools', 'webpack', 'template.ejs'),
		appMountClasses: 'appContainer',
		appMountId: 'app',
		meta: [
			{
				content: 'ie=edge',
				'http-equiv': 'x-ua-compatible'
			},
			{
				name: 'description',
				content: pkg.description
			},
			{
				name: 'viewport',
				content: 'initial-scale=1.0,user-scalable=no,maximum-scale=1,width=device-width'
			},
			{
				name: 'viewport',
				content: 'initial-scale=1.0,user-scalable=no,maximum-scale=1,width=device-width',
				media: '(device-height: 568px)'
			}
		],
		links: [
			'https://fonts.googleapis.com/css?family=Roboto',
			'https://fonts.googleapis.com/icon?family=Material+Icons'
		]
	}
}

function createConfig(env) {
	env = env || {};

	const config = {
		bail: true
	};

	if (env.prod) {
		config.devtool = 'cheap-module-source-map';
		config.performance = {
			maxEntrypointSize: 400000
		}
	} else {
		config.devtool = 'eval-source-map';
		config.performance = false;
	}

	if (env.prod) {
		config.entry = {
			'vendor.react': [
				'react',
				'react-dom',
				'react-router',
				// 'flexbox-react',
				// 'react-toolbox'
			],
			'vendor.toolbox': [
				'react-addons-css-transition-group',
				// 	'react-toolbox/lib/app_bar',
				// 	'react-toolbox/lib/button',
				// 	'react-toolbox/lib/checkbox',
				// 	'react-toolbox/lib/font_icon',
				'react-toolbox/lib/hoc/ActivableRenderer',
				'react-toolbox/lib/hoc/Portal',
				// 	'react-toolbox/lib/input',
				'react-toolbox/lib/overlay/Overlay',
				// 	'react-toolbox/lib/progress_bar',
				// 	'react-toolbox/lib/ripple',
				// 	'react-toolbox/lib/snackbar',
				// 	'react-toolbox/lib/tooltip',
				// 	'react-toolbox/lib/utils',
			],
			app: [
				'normalize.css',
				'./src/assets/globals.css',
				'./src/assets/spinner.css',
				'./src/index'
			]
		}
	} else {
		config.entry = {
			app: [
				'webpack-dev-server/client?http://localhost:8080',
				'webpack/hot/only-dev-server',
				'normalize.css',
				'./src/assets/globals.css',
				'./src/assets/spinner.css',
				'./src/index'
			]
		}
	}

	if (!env.test) {
		config.output = {
			path: path.resolve(__dirname, 'dist'),
			publicPath: '/',
			filename: env.prod ? 'assets/js/[name].[chunkhash].js' : 'bundle.js',
			chunkFilename: env.prod ? 'assets/js/[name].[chunkhash].js' : '[name].bundle.js'
		}
	}

	config.resolve = {
		unsafeCache: false,
		extensions: ['.js', '.ts', '.tsx', '.json', '.css'],
		mainFields: ['browser', 'web', 'browserify', 'main', 'style'],
		modules: [
			path.resolve(__dirname, 'src'),
			'node_modules'
		]
	}

	const commonStyleRules = [
		{
			loader: 'css-loader',
			query: {
				modules: true,
				sourceMap: true,
				minimize: true,
				localIdentName: '[name]__[local]___[hash:base64:5]',
				importLoaders: 1
			}
		},
		{ loader: 'postcss-loader', query: { config: 'tools' } }
	];
	const cssRule = {
		test: /\.css$/
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
			{
				test: /\.css\.d\.ts$/,
				loader: 'null-loader',
				include: [path.resolve(__dirname, 'src')],
			},
			{
				test: /\.ts(x?)$/,
				loader: 'awesome-typescript-loader',
				exclude: [
					/node_modules/,
					/\.css\.d\.ts$/
				]
			},
			{
				test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|svg|ico)$/,
				loader: 'file-loader',
				query: { name: 'assets/[name].[hash].[ext]' },
				include: [path.resolve(__dirname, 'src')]
			},
			cssRule
		]
	}

	config.externals = {
		firebase: 'firebase',
		firebaseui: 'firebaseui'
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
		}),
		new webpack.DefinePlugin({
			'process.env': {
				FIREBASE_VERSION: JSON.stringify(fb.core),
				FIREBASEUI_VERSION: JSON.stringify(fb.ui)
			}
		})
	];

	if (!env.test) {
		config.plugins.push(new HtmlWebpackPlugin(htmlTemplate()));
	}
	if (env.prod) {
		config.plugins.push(
			new ExtractTextPlugin({ filename: 'assets/css/[name].[hash].css' }),
			new webpack.optimize.CommonsChunkPlugin({
				names: ['vendor.toolbox', 'vendor.react', 'manifest']
			}),
			new webpack.optimize.UglifyJsPlugin({
				sourceMap: true
			}),
			new webpack.optimize.AggressiveMergingPlugin(),
			new FaviconsWebpackPlugin({
				logo: './src/assets/favicon.png',
				icons: {
					android: true,
					appleIcon: false,
					appleStartup: false,
					coast: false,
					favicons: true,
					firefox: false,
					opengraph: false,
					twitter: false,
					yandex: false,
					windows: true
				}
			})
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
