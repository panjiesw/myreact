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
import { IOAuthStore } from 'native/stores/oauth';
import { FacebookSignin, GoogleSignin, EmailSignin } from '../components';
import styles from './styles';

export interface ISignupProps extends RouteComponentProps<any> {
	authStore: IAuthStore;
	oauthStore: IOAuthStore;
}

export interface IPSignupProps extends RouteComponentProps<any> {
	authStore?: IAuthStore;
	oauthStore?: IOAuthStore;
}

class Signup extends Component<ISignupProps, void> {
	public static displayName = 'SignupRaw';
	public static propTypes = {
		authStore: PropTypes.object.isRequired,
		oauthStore: PropTypes.object.isRequired,
	};

	public render(): JSX.Element | null {
		const { authStore, oauthStore, history, location } = this.props;
		return (
			<View style={styles.box}>
				<Text style={{ textAlign: 'center', color: 'white' }}>Sign in to Start</Text>
				<EmailSignin
					signup
					authStore={authStore}
					history={history}
					location={location}
					showToast={this.showToast} />
				<GoogleSignin
					enabled={oauthStore.isGoogleEnabled}
					style={{ justifyContent: 'flex-start', marginTop: 10, backgroundColor: 'rgb(219, 64, 44)', borderRadius: 5 }}
					iconStyle={{ borderRightColor: 'white', borderRightWidth: 0.5, paddingRight: 9 }}
					textStyle={{ textAlign: 'center', flex: 1 }}
					oauthStore={oauthStore}
					history={history}
					location={location}
					showToast={this.showToast} />
				<FacebookSignin
					enabled
					style={{ justifyContent: 'flex-start', marginTop: 10, backgroundColor: 'rgb(66, 103, 178)', borderRadius: 5 }}
					textStyle={{ textAlign: 'center', flex: 1 }}
					iconStyle={{ borderRightColor: 'white', borderRightWidth: 0.5, paddingRight: 15 }}
					oauthStore={oauthStore}
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

const signup = inject<IPSignupProps>('authStore', 'oauthStore')(observer<IPSignupProps>(Signup));
signup.displayName = 'Signup';

export { Signup as SignupRaw };
export default signup;
