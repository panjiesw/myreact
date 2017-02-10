// Copyright (c) 2017 Panjie Setiawan Wicaksono
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

const supportAllFeatures = () => window.fetch && window.Promise && window.Symbol && Set && Map;

const loadPromise = (next: Function) => {
	require.ensure([], () => {
		next({
			promise: require('core-js/fn/promise'),
		});
	}, 'polyfills.promise');
};

const loadFetch = (): Promise<any> =>
	new Promise((resolve) => {
		require.ensure([], () => {
			resolve(require('whatwg-fetch'));
		}, 'polyfills.fetch');
	});

const loadCollections = (): Promise<any> =>
	new Promise((resolve) => {
		require.ensure([], () => {
			resolve({
				map: require('core-js/es6/map'),
				set: require('core-js/es6/set'),
			});
		}, 'polyfills.collections');
	});

const loadSymbol = (): Promise<any> =>
	new Promise((resolve) => {
		require.ensure([], () => {
			resolve({
				'symbol': require('core-js/es6/symbol'),
				'symbol-iterator': require('core-js/fn/symbol/iterator'),
			});
		}, 'polyfills.symbol');
	});

const loadArray = (): Promise<any> =>
	new Promise((resolve) => {
		require.ensure([], () => {
			resolve({
				'array-iterator': require('core-js/fn/array/iterator'),
			});
		}, 'polyfills.array');
	});

const loadOthers = (next: Function) => async () => {
	await Promise.all([
		loadFetch(),
		loadSymbol(),
		loadArray(),
		loadCollections(),
	]);
	next();
};

const getPolyfill = (next: Function) => {
	if (!supportAllFeatures()) {
		return loadPromise(loadOthers(next));
	}
	return next();
};

export { getPolyfill };
