/**
 * Copyright (c) 2017 Panjie Setiawan Wicaksono <panjie@panjiesw.com>
 *
 * This software is released under the MIT License.
 * https://panjiesw.mit-license.org
 */

import React, { Component } from 'react';
import * as propTypes from 'prop-types';
import { TextStyle, ViewStyle } from 'react-native';
import { Button, Icon, Text } from 'native-base';
import { observer } from 'mobx-react/native';
import { History, Location } from 'history';
import { parseError } from 'common/utils/errors';
import { IOAuthStore } from 'native/stores/oauth';

export interface IFacebookSigninProps {
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

// #4267B2 rgb(66, 103, 178)
class FacebookSignin extends Component<IFacebookSigninProps, void> {
	public static displayName = 'FacebookSigninRaw';
	public static propTypes = {
		history:  propTypes.object.isRequired,
		location:  propTypes.object.isRequired,
		showToast:  propTypes.func.isRequired,
	};

	public render(): JSX.Element | null {
		const {
			enabled,
			disabled,
			iconStyle,
			style,
			textStyle,
		} = this.props;
		return enabled ? (
			<Button
				iconLeft
				block
				disabled={disabled}
				onPress={this.handleOnPress}
				style={style}>
				<Icon style={iconStyle} name="logo-facebook" />
				<Text style={textStyle}>Sign in with Facebook</Text>
			</Button>
		) : null;
	}

	private handleOnPress = async () => {
		const { showToast, oauthStore, history, location } = this.props;
		try {
			await oauthStore.signInFacebook();
			history.replace(location.state.from);
		} catch (err) {
			showToast(parseError(err), 'Dismiss', 'danger');
		}
	}
}

export { FacebookSignin as FacebookSigninRaw };
export default observer(FacebookSignin);
