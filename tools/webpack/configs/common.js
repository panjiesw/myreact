// Copyright (c) 2017 Panjie Setiawan Wicaksono
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

const path = require('path');
const webpack = require('webpack');
const atl = require('awesome-typescript-loader');

const CheckerPlugin = atl.CheckerPlugin;
const TsConfigPathsPlugin = atl.TsConfigPathsPlugin;

exports.common = (env = {}) => ({
	bail: true,

})
