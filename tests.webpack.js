/**
 * Copyright (c) 2017 Panjie Setiawan Wicaksono <panjie@panjiesw.com>
 *
 * This software is released under the MIT License.
 * https://panjiesw.mit-license.org
 */

// [
// 	require.context('./tests', true, /\.ts(x?)$/),
// 	require.context('./src/common', true, /\.ts(x?)$/),
// 	require.context('./src/web', true, /\.ts(x?)$/),
// ].forEach(function(context) {
// 		context.keys().forEach(context);
// 	});

const context = require.context('./tests', true, /\.ts(x?)$/);
context.keys().forEach(context);
