/**
 * Copyright (c) 2017 Panjie Setiawan Wicaksono <panjie@panjiesw.com>
 *
 * This software is released under the MIT License.
 * https://panjiesw.mit-license.org
 */

import React, { PropTypes, SFC } from 'react';
import { StatusBar, View } from 'react-native';
import tinycolor from 'tinycolor2';

export interface IAdaptiveStatusBarProps {
	colorBehindStatusBar: string;
}

const adaptiveStatusBar: SFC<IAdaptiveStatusBarProps> = ({ colorBehindStatusBar }) => {
	return (
		<View>
			{tinycolor(colorBehindStatusBar).isLight() ?
				<StatusBar translucent barStyle="default" backgroundColor="rgba(0,0,0,.05)"/> :
				<StatusBar translucent barStyle="light-content" backgroundColor="rgba(0,0,0,.20)"/>
			}
		</View>
	);
};
adaptiveStatusBar.propTypes = {
	colorBehindStatusBar: PropTypes.string.isRequired,
};
adaptiveStatusBar.displayName = 'AdaptiveStatusBar';

export default adaptiveStatusBar;
