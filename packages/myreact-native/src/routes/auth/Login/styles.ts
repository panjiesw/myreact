// Copyright (c) 2017 Panjie Setiawan Wicaksono
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { StyleSheet, ViewStyle } from 'react-native';

export interface ILoginStyle {
	container: ViewStyle;
	spacer: ViewStyle;
	box: ViewStyle;
}

export default StyleSheet.create<ILoginStyle>({
	container: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'center',
	},
	spacer: {
		flex: 1,
	},
	box: {
		flex: 2,
		flexDirection: 'column',
		justifyContent: 'center',
		paddingLeft: 20,
		paddingRight: 20,
	},
});
