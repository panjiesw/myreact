/**
 * Copyright (c) 2017 Panjie Setiawan Wicaksono <panjie@panjiesw.com>
 *
 * This software is released under the MIT License.
 * https://panjiesw.mit-license.org
 */

const webpack = require('webpack');
const merge = require('webpack-merge');
const sharedConfig = require('webpack-configs');
const nodeExternals = require('webpack-node-externals');
const pkg = require('./package.json');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const DotenvPlugin = require('webpack-dotenv-plugin');

const versions = {
	react: require('./node_modules/react/package.json').version,
	firebase: require('./node_modules/firebase/package.json').version,
	firebaseui: require('./node_modules/firebaseui/package.json').version,
};

const theme = {};

const htmlTemplate = (scripts = []) => ({
	filename: 'index.html',
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
		`//cdn.firebase.com/libs/firebaseui/${versions.firebaseui}/firebaseui.css`,
	],
	scripts,
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

const extractedStyleGlobal = () => styleGlobal()
	.extract({ filename: 'assets/css/[name].[hash].css' });

const typescriptOptions = (configFileName) => ({
	configFileName,
	babelOptions: {
		presets: [
			'react',
			['env', {
				targets: {
					browsers: ['last 2 versions'],
				},
				useBuiltIns: true,
				modules: false,
			}],
		],
		plugins: [
			['import', {
				libraryName: 'antd',
				style: true,
			}],
		],
	},
});

const typescriptNonDev = () => sharedConfig.typescript({
	exclude: [
		/node_modules/,
		/\.less\.d\.ts$/,
		sharedConfig.resolve(['.dist']),
		sharedConfig.resolve(['.build']),
	],
	options: typescriptOptions('tsconfig.web.json'),
});

const common = () => merge([
	sharedConfig.typescript.sourcemap(),
	{
		bail: true,
		resolve: {
			unsafeCache: false,
			extensions: ['.js', '.ts', '.tsx', '.json', '.css', '.less'],
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
			new webpack.EnvironmentPlugin(['NODE_ENV']),
		],
		node: {
			fs: 'empty',
		},
	},
]);

const nonTest = ({ scripts = [] } = {}) => ({
	output: {
		path: sharedConfig.resolve(['.dist']),
		publicPath: '/',
	},
	plugins: [
		new HtmlWebpackPlugin(htmlTemplate(scripts)),
	],
});

const nonProd = () => ({
	devtool: 'inline-source-map',
	performance: false,
});

const development = () => merge([
	common(),
	styleGlobal(),
	nonTest(),
	nonProd(),
	{
		entry: {
			myreact: [
				'react-hot-loader/patch',
				'webpack-dev-server/client?http://localhost:7777',
				'webpack/hot/only-dev-server',
				'./src/web/index',
			],
		},
		plugins: [
			new webpack.NamedModulesPlugin(),
		],
		module: {
			rules: [{
				test: /\.ts(x?)$/,
				exclude: [
					/node_modules/,
					/\.less\.d\.ts$/,
					sharedConfig.resolve(['dist']),
					sharedConfig.resolve(['build']),
				],
				use: [
					'react-hot-loader/webpack',
					{
						loader: 'awesome-typescript-loader',
						options: typescriptOptions('tsconfig.web.json'),
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
	styleGlobal(),
	nonProd(),
	typescriptNonDev(),
	{
		target: 'node',
		entry: {
			main: [
				'./tests/index',
			],
		},
		output: {
			path: sharedConfig.resolve(['.tests']),
			filename: 'tests.js',
		},
		externals: [nodeExternals()],
	},
]);

const production = () => merge([
	common(),
	extractedStyleGlobal(),
	nonTest({
		scripts: [
			`//cdnjs.cloudflare.com/ajax/libs/react/${versions.react}/react.min.js`,
			`//cdnjs.cloudflare.com/ajax/libs/react/${versions.react}/react-dom.min.js`,
			`//www.gstatic.com/firebasejs/${versions.firebase}/firebase.js`,
			`//cdn.firebase.com/libs/firebaseui/${versions.firebaseui}/firebaseui.js`,
		],
	}),
	typescriptNonDev(),
	{
		devtool: 'source-map',
		entry: {
			vendor: [
				'react-router',
				'react-router-dom',
				'react-loadable',
			],
			myreact: './src/web/index',
		},
		output: {
			filename: 'assets/js/[name].[chunkhash].js',
			chunkFilename: 'assets/js/[name].[chunkhash].js',
		},
		externals: {
			react: {
				root: 'React',
				commonjs2: 'react',
				commonjs: 'react',
				amd: 'react',
				umd: 'react',
			},
			'react-dom': {
				root: 'ReactDOM',
				commonjs2: 'react-dom',
				commonjs: 'react-dom',
				amd: 'react-dom',
				umd: 'react-dom',
			},
			firebase: 'firebase',
			firebaseui: 'firebaseui',
		},
		plugins: [
			new webpack.optimize.CommonsChunkPlugin({
				names: ['vendor', 'manifest'],
			}),
			new webpack.optimize.UglifyJsPlugin({
				sourceMap: true,
			}),
		],
	},
]);

module.exports = (env = {}) => {
	if (env.production) {
		process.env.NODE_ENV = 'production';
		return production();
	} else if (env.test) {
		process.env.NODE_ENV = 'test';
		return test();
	}
	process.env.NODE_ENV = 'development';
	return development();
};
