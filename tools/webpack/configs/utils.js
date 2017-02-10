// Copyright (c) 2017 Panjie Setiawan Wicaksono
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

const path = require('path');
const pkg = require('../../../package.json');

exports.resolve = (root, paths) => {
	if (Array.isArray(root)) {
		paths = root;
		root = process.cwd();
	}
	return path.resolve(root, ...paths);
}

exports.htmlTemplate = (filename = 'index.html') => ({
	filename,
	title: 'My React Playground',
	inject: false,
	template: resolve(['tools', 'webpack', 'template.ejs']),
	appMountClasses: 'my-app',
	appMountId: 'app',
	meta: [
		{
			content: 'ie=edge',
			'http-equiv': 'x-ua-compatible'
		},
		{
			name: 'description',
			content: pkg.description
		},
		{
			name: 'viewport',
			content: 'initial-scale=1.0,user-scalable=no,maximum-scale=1,width=device-width'
		},
		{
			name: 'viewport',
			content: 'initial-scale=1.0,user-scalable=no,maximum-scale=1,width=device-width',
			media: '(device-height: 568px)'
		}
	],
	links: [
		'https://fonts.googleapis.com/css?family=Roboto',
		'https://fonts.googleapis.com/icon?family=Material+Icons'
	]
});
