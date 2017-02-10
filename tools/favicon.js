// Copyright (c) 2017 Panjie Setiawan Wicaksono
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

const fs = require('fs');
const path = require('path');
const favicons = require('favicons');
const pkg = require('../package.json');
const dir = path.resolve(process.cwd(), 'src', 'assets', 'icons');
const source = path.resolve(dir, 'favicon.png');
const configuration = {
	appName: pkg.name.toUpperCase(),
	appDescription: pkg.description,
	developerName: pkg.author.name,
	developerURL: pkg.author.url,
	path: '/icons',
	start_url: '/',
	version: pkg.version,
	logging: true,
}

const writer = (name, content) => {
	fs.writeFile(path.resolve(dir, name), content, (err) => {
		if (err) {
			console.error(err);
		} else {
			console.log(`saved ${name}`);
		}
	})
}

favicons(source, configuration, (error, response) => {
	let i;
	for (i = 0; i < response.images.length; i++) {
		const img = response.images[i];
		writer(img.name, img.contents);
	}
	for (i = 0; i < response.files.length; i++) {
		const file = response.files[i];
		writer(file.name, file.contents);
	}
	console.log(response.html);
})
