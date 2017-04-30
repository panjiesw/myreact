/**
 * Copyright (c) 2017 Panjie Setiawan Wicaksono <panjie@panjiesw.com>
 *
 * This software is released under the MIT License.
 * https://panjiesw.mit-license.org
 */

const webpack = require('webpack');
const merge = require('webpack-merge');
const sharedConfig = require('webpack-configs');
const pkg = require('./package.json');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const DotenvPlugin = require('webpack-dotenv-plugin');

const theme = {};

const htmlTemplate = (filename = 'index.html') => ({
	filename,
	title: 'My React Space',
	inject: false,
	template: sharedConfig.resolve(['tools', 'webpack', 'template.ejs']),
	appMountClasses: 'my-react',
	appMountId: 'my-react',
	meta: [
		{
			name: 'description',
			content: pkg.description,
		},
	],
	links: [
		'/assets/css/loader.css',
	],
});

const styleGlobal = () => sharedConfig
	.style({
		test: /\.less$/,
	})
	.use(sharedConfig.style.css({
		modules: false,
		importLoaders: 2,
	}))
	.use(sharedConfig.style.post())
	.use(sharedConfig.style.less({
		options: {
			modifyVars: theme,
		},
	}));

const extractedStyle = () => styleGlobal()
	.extract({ filename: 'assets/css/[name].[hash].css' });

const common = () => merge([
	{
		bail: true,
		resolve: {
			unsafeCache: false,
			extensions: ['.js', '.ts', '.tsx', '.json', '.css', '.scss'],
			mainFields: ['browser', 'web', 'browserify', 'main', 'style'],
			modules: [
				sharedConfig.resolve(['src']),
				'node_modules',
			],
		},
		plugins: [
			new webpack.LoaderOptionsPlugin({
				debug: true,
				context: __dirname,
				options: {
					context: '/',
					postcss: {
						plugins: () => [require('autoprefixer')()],
					},
				},
			}),
			new DotenvPlugin({
				sample: sharedConfig.resolve(['.env.example']),
				path: sharedConfig.resolve(['.env']),
			}),
		],
		node: {
			fs: 'empty',
		},
	},
]);

const nonTest = () => ({
	output: {
		path: sharedConfig.resolve(['dist']),
		publicPath: '/',
	},
	plugins: [
		new HtmlWebpackPlugin(htmlTemplate()),
	],
});

const nonProd = () => ({
	devtool: 'inline-source-map',
	performance: false,
	entry: {
		app: [
			'react-hot-loader/patch',
			'webpack-dev-server/client?http://localhost:7777',
			'webpack/hot/only-dev-server',
			'antd/dist/antd.less',
			'./src/web/index',
		],
	},
	plugins: [
		new webpack.NamedModulesPlugin(),
	],
});

const development = () => merge([
	common(),
	styleGlobal(),
	nonTest(),
	nonProd(),
	sharedConfig.typescript.sourcemap(),
	{
		module: {
			rules: [{
				test: /\.ts(x?)$/,
				exclude: [
					/node_modules/,
					/\.scss\.d\.ts$/,
					sharedConfig.resolve(['dist']),
				],
				use: [
					'react-hot-loader/webpack',
					{
						loader: 'awesome-typescript-loader',
						options: {
							configFileName: 'tsconfig.web.json',
						},
					},
				],
			}],
		},
	},
	sharedConfig.devServer({
		host: 'localhost',
		port: 7777,
		hot: true,
		contentBase: sharedConfig.resolve(['src', 'web']),
		publicPath: '/',
	}),
]);

const test = () => merge([
	common(),
	sharedConfig.typescript.sourcemap(),
	sharedConfig.typescript({
		exclude: [
			/node_modules/,
			/\.scss\.d\.ts$/,
			sharedConfig.resolve(['dist']),
		],
		options: {
			configFileName: 'tsconfig.web.json',
		},
	}),
	styleGlobal(),
	nonProd(),
]);

module.exports = (env = {}) => {
	/*if (env.production) {
		process.env.NODE_ENV = 'production';
		return production();
	} else*/
	if (env.test) {
		process.env.NODE_ENV = 'test';
		return test();
	} /*else {
		return development();
	}*/
	return development();
};
