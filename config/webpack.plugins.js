// Copyright (c) 2016 Panjie Setiawan Wicaksono
//
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php

// Temporary webpack-dotenv-plugin source until this is merged:
// https://github.com/nwinch/webpack-dotenv-plugin/pull/9

const dotenv = require('dotenv-safe');
const fs = require('fs');
const DefinePlugin = require('webpack').DefinePlugin;

function DotenvPlugin(options) {
	options = options || {};
	if (!options.sample) options.sample = './.env.default';
	if (!options.path) options.path = './.env';

	dotenv.config(options);
	this.example = dotenv.parse(fs.readFileSync(options.sample));
	this.env = dotenv.parse(fs.readFileSync(options.path));
}

DotenvPlugin.prototype.apply = function (compiler) {
	const definitions = Object.keys(this.example).reduce((definitions, key) => {
		const existing = process.env[key];

		if (existing) {
			definitions[key] = JSON.stringify(existing);
			return definitions;
		}

		const value = this.env[key];
		if (value) definitions[key] = JSON.stringify(value);

		return definitions;
	}, {});

	const plugin = {
		'process.env': definitions,
	};

	compiler.apply(new DefinePlugin(plugin));
};

exports.DotenvPlugin = DotenvPlugin;
