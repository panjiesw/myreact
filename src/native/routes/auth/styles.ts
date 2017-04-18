/**
 * Copyright (c) 2017 Panjie Setiawan Wicaksono <panjie@panjiesw.com>
 *
 * This software is released under the MIT License.
 * https://panjiesw.mit-license.org
 */

import { StyleSheet, ViewStyle } from 'react-native';

export interface IAuthStyle {
	spacer: ViewStyle;
}

export default StyleSheet.create<IAuthStyle>({
	spacer: {
		flex: 1,
	},
});
