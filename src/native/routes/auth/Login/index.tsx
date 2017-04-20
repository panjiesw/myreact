/**
 * Copyright (c) 2017 Panjie Setiawan Wicaksono <panjie@panjiesw.com>
 *
 * This software is released under the MIT License.
 * https://panjiesw.mit-license.org
 */

import React, { Component, PropTypes } from 'react';
import { View } from 'react-native';
import { RouteComponentProps } from 'react-router-native';
import { inject, observer } from 'mobx-react/native';
import { Text, Toast } from 'native-base';
import { IAuthStore } from 'common/stores/auth';
import { IGoogleStore } from 'native/stores/google';
import { FacebookLogin, GoogleLogin, FormLogin } from '../providers';
import styles from './styles';

export interface ILoginProps extends RouteComponentProps<any> {
	authStore: IAuthStore;
	googleStore: IGoogleStore;
}

export interface IPLoginProps extends RouteComponentProps<any> {
	authStore?: IAuthStore;
	googleStore?: IGoogleStore;
}

class Login extends Component<ILoginProps, void> {
	public static displayName = 'LoginRaw';
	public static propTypes = {
		authStore: PropTypes.object.isRequired,
		googleStore: PropTypes.object.isRequired,
	};

	public render(): JSX.Element | null {
		const { authStore, googleStore, history, location } = this.props;
		return (
			<View style={styles.box}>
				<Text style={{ textAlign: 'center' }}>Login to Start</Text>
				<FormLogin
					authStore={authStore}
					history={history}
					location={location}
					showToast={this.showToast} />
				<GoogleLogin
					enabled={googleStore.isEnabled}
					authStore={authStore}
					googleStore={googleStore}
					history={history}
					location={location}
					showToast={this.showToast} />
				<FacebookLogin
					enabled
					authStore={authStore}
					history={history}
					location={location}
					showToast={this.showToast} />
			</View>
		);
	}

	private showToast = (text: string, buttonText: string, type: 'success' | 'danger' | 'warning') => {
		Toast.show({
			text,
			type,
			buttonText,
			position: __DEV__ ? 'top' : 'bottom',
		});
	}
}

const login = inject<IPLoginProps>('authStore', 'googleStore')(observer<IPLoginProps>(Login));
login.displayName = 'Login';

export { Login as LoginRaw };
export default login;
