/**
 * Copyright (c) 2017 Panjie Setiawan Wicaksono <panjie@panjiesw.com>
 *
 * This software is released under the MIT License.
 * https://panjiesw.mit-license.org
 */

const supportAllFeatures = () => fetch && Symbol && Set && Map;

const loadFetch = () => System.import('whatwg-fetch');

const loadCollections = () => Promise.all([
	System.import('core-js/es6/map'),
	System.import('core-js/es6/set'),
]);

const loadSymbol = () => Promise.all([
	System.import('core-js/es6/symbol'),
	System.import('core-js/fn/symbol/iterator'),
]);

const loadArray = () => System.import('core-js/fn/array/iterator');

const loadPolyfills = (): Promise<any> => {
	if (supportAllFeatures()) {
		return Promise.resolve();
	}
	return Promise.all([
		loadFetch(),
		loadCollections(),
		loadSymbol(),
		loadArray(),
	]);
};

export default loadPolyfills;
