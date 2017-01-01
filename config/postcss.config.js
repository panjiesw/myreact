// Copyright (c) 2016 Panjie Setiawan Wicaksono
//
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php

const path = require('path');

module.exports = {
	plugins: [
		require('postcss-import')({
			root: path.join(__dirname, '../'),
			path: [
				path.join(__dirname, '../src'),
				path.join(__dirname, '../src/node_modules')
			]
		}),
		require('postcss-mixins')(),
		require('postcss-each')(),
		require('postcss-cssnext')(),
		require('postcss-reporter')({ clearMessages: true })
	]
}
