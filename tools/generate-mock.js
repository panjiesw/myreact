/**
 * Copyright (c) 2017 Panjie Setiawan Wicaksono <panjie@panjiesw.com>
 *
 * This software is released under the MIT License.
 * https://panjiesw.mit-license.org
 */

require('ts-node').register({
	cwd: process.cwd(),
	target: 'es6',
	module: 'commonjs',
	outDir: '.build',
});

const fs = require('fs');
const fbdbmock = `${process.cwd()}/tools/fbdbmock.json`;

fs.truncateSync(fbdbmock);
fs.writeFileSync(fbdbmock, JSON.stringify(require('../src/common/fbdbmock').default, null, '\t'));
