// Copyright (c) 2017 Panjie Setiawan Wicaksono
//
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php

const supportAllFeatures = () => window.Promise && window.Symbol

const loadPromise = (next: Function) => {
	require.ensure([], () => {
		next({
			promise: require('core-js/fn/promise')
		});
	}, 'polyfills.promise')
}

const loadSymbol = (): Promise<any> => {
	return new Promise(resolve => {
		require.ensure([], () => {
			resolve({
				symbol: require('core-js/es6/symbol'),
				'symbol-iterator': require('core-js/fn/symbol/iterator')
			});
		}, 'polyfills.symbol')
	})
}

const loadArray = (): Promise<any> => {
	return new Promise(resolve => {
		require.ensure([], () => {
			resolve({
				'array-iterator': require('core-js/fn/array/iterator')
			})
		}, 'polyfills.array')
	})
}

const loadOthers = (next: Function) => async () => {
	await Promise.all([
		loadSymbol(),
		loadArray()
	]);
	next();
}

const getPolyfill = (next: Function) => {
	if (!supportAllFeatures()) {
		return loadPromise(loadOthers(next));
	}
	return next();
}

export { getPolyfill };
