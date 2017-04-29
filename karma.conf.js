/**
 * Copyright (c) 2017 Panjie Setiawan Wicaksono <panjie@panjiesw.com>
 *
 * This software is released under the MIT License.
 * https://panjiesw.mit-license.org
 */

const webpackConfig = require('./webpack.config')({ test: true });
const sharedConfig = require('webpack-configs');

module.exports = karma => {
	const config = {
		frameworks: ['tap'],
		files: [
			{ pattern: 'tests.webpack.js', watched: false, included: true },
		],
		preprocessors: {
			'tests.webpack.js': ['webpack', 'sourcemap'],
		},
		webpack: webpackConfig,
		webpackMiddleware: { stats: 'errors-only' },
		webpackServer: { noInfo: true },
		reporters: ['tap-pretty'],
		tapReporter: {
			prettifier: 'tap-spec',
			sepparator: '**********************************************',
		},
		customLaunchers: {
			ChromeNoSandboxHeadless: {
				base: 'Chrome',
				flags: [
					// See https://chromium.googlesource.com/chromium/src/+/lkgr/headless/README.md
					'--headless',
					'--disable-gpu',
					// Without a remote debugging port, Google Chrome exits immediately.
					' --remote-debugging-port=9222',
				],
			},
		},
		browsers: ['ChromeNoSandboxHeadless'],
		autoWatch: false,
		singleRun: true,
	};

	karma.set(config);
};
