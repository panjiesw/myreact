// Copyright (c) 2016 Panjie Setiawan Wicaksono
//
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php

const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const configs = require('webpack-configs');
const wt = require('./tools/webpack');
const pkg = require('./package.json');

const fb = {
	core: require('./node_modules/firebase/package.json').version,
	ui: require('./node_modules/firebaseui/package.json').version
}

const HtmlWebpackPlugin = require('html-webpack-plugin');
const DotenvPlugin = wt.DotenvPlugin;
const CompressionPlugin = require("compression-webpack-plugin");

const htmlTemplate = (filename = 'index.html') => ({
	filename,
	title: 'My React Playground',
	inject: false,
	template: configs.utils.resolve(['tools', 'webpack', 'template.ejs']),
	appMountClasses: 'my-app',
	appMountId: 'app',
	meta: [
		{
			name: 'description',
			content: pkg.description
		}
	],
	links: [
		'https://fonts.googleapis.com/css?family=Roboto',
		'https://fonts.googleapis.com/icon?family=Material+Icons'
	]
});

const style = () => configs.style({ test: /\.scss$/ })
	.use(configs.style.css({
		modules: true,
		localIdentName: '[name]__[local]___[hash:base64:5]',
		importLoaders: 2
	}))
	.use(configs.style.post())
	.use(configs.style.sass());

const extractedStyle = () => style()
	.extract({ filename: 'assets/css/[name].[hash].css' })

const common = () => merge([
	{
		bail: true,
		resolve: {
			unsafeCache: false,
			extensions: ['.js', '.ts', '.tsx', '.json', '.css', '.scss'],
			mainFields: ['browser', 'web', 'browserify', 'main', 'style'],
			modules: [
				configs.utils.resolve(['src']),
				'node_modules'
			],
		},
		plugins: [
			new webpack.LoaderOptionsPlugin({
				debug: true,
				context: __dirname,
				options: {
					context: '/',
					postcss: {
						plugins: () => [require('autoprefixer')()]
					},
					sassLoader: {
						includePaths: [
							configs.utils.resolve(['src']),
							configs.utils.resolve(['node_modules']),
						]
					}
				},
			}),
			new DotenvPlugin({
				path: './.env'
			}),
			new webpack.DefinePlugin({
				'process.env': {
					FIREBASE_VERSION: JSON.stringify(fb.core),
					FIREBASEUI_VERSION: JSON.stringify(fb.ui),
					NODE_ENV: JSON.stringify(process.env.NODE_ENV)
				}
			})
		]
	},
	configs.typescript({
		exclude: [
			/node_modules/,
			/\.scss\.d\.ts$/,
			configs.utils.resolve(['dist'])
		]
	})
])

const nonTest = () => ({
	output: {
		path: configs.utils.resolve(['dist']),
		publicPath: '/',
	},
	plugins: [
		new HtmlWebpackPlugin(htmlTemplate())
	]
});

const nonProd = () => ({
	devtool: 'eval-source-map',
	performance: false,
	entry: {
		app: [
			'webpack-dev-server/client?http://localhost:7777',
			'webpack/hot/only-dev-server',
			'./src/sass/entry/globals.scss',
			'./src/index'
		]
	},
	plugins: [
		new webpack.NamedModulesPlugin(),
	]
})

const development = () => merge([
	common(),
	style(),
	nonTest(),
	nonProd(),
	configs.devServer({
		host: 'localhost',
		port: 7777,
		hot: true,
		hotOnly: false,
		contentBase: configs.utils.resolve(['src', 'assets'])
	}),
]);

const test = () => merge([
	common(),
	style(),
	nonProd(),
]);

const production = () => merge([
	common(),
	extractedStyle(),
	nonTest(),
	{
		entry: {
			'vendor.react': [
				'react',
				'react-dom',
				'react-router',
			],
			app: [
				'./src/sass/entry/globals.scss',
				'./src/index'
			]
		},
		output: {
			filename: 'assets/js/[name].[chunkhash].js',
			chunkFilename: 'assets/js/[name].[chunkhash].js'
		},
		externals: {
			firebase: 'firebase',
			firebaseui: 'firebaseui'
		},
		plugins: [
			new webpack.optimize.CommonsChunkPlugin({
				names: ['vendor.toolbox', 'vendor.react', 'manifest']
			}),
			new webpack.optimize.UglifyJsPlugin({
				sourceMap: true
			}),
			new webpack.optimize.AggressiveMergingPlugin(),
		]
	}
]);

module.exports = (env = {}) => {
	if (env.production) {
		process.env.NODE_ENV = 'production';
		return production();
	} else if (env.test) {
		process.env.NODE_ENV = 'test';
		return test();
	} else {
		return development();
	}
}
