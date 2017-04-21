/**
 * Copyright (c) 2017 Panjie Setiawan Wicaksono <panjie@panjiesw.com>
 *
 * This software is released under the MIT License.
 * https://panjiesw.mit-license.org
 */

import React, { Component, PropTypes } from 'react';
import { TextStyle, ViewStyle } from 'react-native';
import { Button, Icon, Text } from 'native-base';
import { observer } from 'mobx-react/native';
import { History, Location } from 'history';
import { parseError } from 'common/utils/errors';
import { IOAuthStore } from 'native/stores/oauth';

export interface IGoogleSigninProps {
	enabled?: boolean;
	disabled?: boolean;
	style?: ViewStyle;
	textStyle?: TextStyle;
	iconStyle?: TextStyle;
	oauthStore: IOAuthStore;
	history: History;
	location: Location;
	showToast(text: string, buttonText: string, type: 'success' | 'danger' | 'warning'): void;
}

// rgb(219, 64, 44)
class GoogleSignin extends Component<IGoogleSigninProps, void> {
	public static displayName = 'GoogleSigninRaw';
	public static propTypes = {
		oauthStore: PropTypes.object.isRequired,
		history: PropTypes.object.isRequired,
		location: PropTypes.object.isRequired,
		showToast: PropTypes.func.isRequired,
	};

	public render(): JSX.Element | null {
		const {
			enabled,
			iconStyle,
			style,
			textStyle,
		} = this.props;
		return enabled ? (
			<Button
				iconLeft
				block
				style={style}
				onPress={this.handleOnPress}>
				<Icon style={iconStyle} name="logo-googleplus" />
				<Text style={textStyle}>Sign in with Google</Text>
			</Button>
		) : null;
	}

	private handleOnPress = async () => {
		const { oauthStore, history, location, showToast } = this.props;
		try {
			await oauthStore.signInGoogle();
			history.replace(location.state.from);
		} catch (err) {
			if (err.code === 12501) {
				showToast('Login is cancelled', 'Dismiss', 'warning');
			} else if (err.code === 12500) {
				showToast('Login failed. Please try again with other account', 'Dismiss', 'danger');
			} else if (err.code === 7) {
				showToast('Network error. Please try again later', 'Dismiss', 'danger');
			} else if (err.code === 5) {
				showToast('Invalid account', 'Dismiss', 'danger');
			} else if (err.code === 8) {
				showToast('Internal error. Please try again later', 'Dismiss', 'warning');
			} else {
				showToast(parseError(err), 'Dismiss', 'danger');
			}
		}
	}
}

export { GoogleSignin as GoogleSigninRaw };

export default observer(GoogleSignin);
