/**
 * Copyright (c) 2017 Panjie Setiawan Wicaksono <panjie@panjiesw.com>
 *
 * This software is released under the MIT License.
 * https://panjiesw.mit-license.org
 */

import React, { Component, PropTypes } from 'react';
// import { View } from 'react-native';
import { AccessToken, LoginManager, LoginResult } from 'react-native-fbsdk';
import { Button, Icon, Text } from 'native-base';
import { observer } from 'mobx-react/native';
import { History, Location } from 'history';
import { IAuthStore } from 'common/stores/auth';

export interface IFacebookLoginProps {
	enabled?: boolean;
	authStore: IAuthStore;
	history: History;
	location: Location;
	showToast(text: string, buttonText: string, type: 'success' | 'danger' | 'warning'): void;
}

// #4267B2 rgb(66, 103, 178)
class FacebookLogin extends Component<IFacebookLoginProps, void> {
	public static displayName = 'FacebookLoginRaw';
	public static propTypes = {
		authStore: PropTypes.object.isRequired,
		history: PropTypes.object.isRequired,
		location: PropTypes.object.isRequired,
		showToast: PropTypes.func.isRequired,
	};

	public render(): JSX.Element | null {
		const { enabled } = this.props;
		return enabled ? (
			<Button
				iconLeft
				block
				style={{ justifyContent: 'flex-start', marginTop: 10, backgroundColor: 'rgb(66, 103, 178)', borderRadius: 5 }}
				onPress={this.handleOnPress}>
				<Icon style={{ borderRightColor: 'white', borderRightWidth: 0.5, paddingRight: 15 }} name="logo-facebook" />
				<Text style={{textAlign: 'center', flex: 1}}>Sign in with Facebook</Text>
			</Button>
		) : null;
	}

	private handleOnPress = async () => {
		const { showToast } = this.props;
		try {
			const result = await LoginManager.logInWithReadPermissions(['public_profile', 'email']);
			this.handleFacebook(result);
		} catch (err) {
			showToast(`Unknown error. ${
				err.message ?
					err.message : typeof err === 'string' ?
						err : ''}`, 'Dismiss', 'danger');
		}
	}

	private handleFacebook = (result: LoginResult) => {
		const { showToast } = this.props;
		if (result.isCancelled) {
			showToast('Login is cancelled', 'Dismiss', 'warning');
		} else {
			this.doLogin();
		}
	}

	private doLogin = async () => {
		const { authStore, history, location, showToast } = this.props;
		try {
			const data = await AccessToken.getCurrentAccessToken();
			if (data) {
				await authStore.login({
					provider: 'facebook',
					data: { token: data.accessToken },
				});
				// TODO error
				history.replace(location.state.from);
			} else {
				showToast('Invalid login state', 'Dismiss', 'danger');
			}
		} catch (err) {
			showToast(`Unknown error. ${
				err.message ?
					err.message : typeof err === 'string' ?
						err : ''}`, 'Dismiss', 'danger');
		}
	}
}

export { FacebookLogin as FacebookLoginRaw };
export default observer(FacebookLogin);
