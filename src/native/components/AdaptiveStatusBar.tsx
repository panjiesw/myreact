/**
 * Copyright (c) 2017 Panjie Setiawan Wicaksono <panjie@panjiesw.com>
 *
 * This software is released under the MIT License.
 * https://panjiesw.mit-license.org
 */

import React, { SFC } from 'react';
import * as propTypes from 'prop-types';
import { StatusBar, View } from 'react-native';
import tinycolor from 'tinycolor2';

// tslint:disable-next-line:variable-name
const SBar: any = StatusBar;

export interface IAdaptiveStatusBarProps {
	colorBehindStatusBar: string;
}

const adaptiveStatusBar: SFC<IAdaptiveStatusBarProps> = ({ colorBehindStatusBar }) => {
	return (
		<View>
			{tinycolor(colorBehindStatusBar).isLight() ?
				<SBar translucent barStyle="dark-content" backgroundColor={colorBehindStatusBar}/> :
				<SBar translucent barStyle="light-content" backgroundColor={colorBehindStatusBar}/>
			}
		</View>
	);
};
adaptiveStatusBar.propTypes = {
	colorBehindStatusBar:  propTypes.string.isRequired,
};
adaptiveStatusBar.displayName = 'AdaptiveStatusBar';

export default adaptiveStatusBar;
