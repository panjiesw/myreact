// Copyright (c) 2017 Panjie Setiawan Wicaksono
//
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php

// Various webpack plugin manually copied from their source
// because of incompatibility with Webpack 2

const DotenvPlugin = require('./dotenv');
const FaviconsWebpackPlugin = require('./favicon');

exports.DotenvPlugin = DotenvPlugin;
exports.FaviconsWebpackPlugin = FaviconsWebpackPlugin;
