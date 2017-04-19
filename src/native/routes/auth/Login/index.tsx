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
import { action, observable } from 'mobx';
import { Button, Text, Toast } from 'native-base';
import { GoogleSigninButton } from 'react-native-google-signin';
import { IAuthStore } from 'common/stores/auth';
import { IGoogleStore } from 'native/stores/google';
import LoginForm from './Form';
import styles from './styles';

export interface ILoginProps extends RouteComponentProps<any> {
	authStore: IAuthStore;
	googleStore: IGoogleStore;
	fb: typeof firebase;
}

export interface IPLoginProps extends RouteComponentProps<any> {
	authStore?: IAuthStore;
	googleStore?: IGoogleStore;
	fb?: typeof firebase;
}

class Login extends Component<ILoginProps, void> {
	public static displayName = 'LoginRaw';
	public static propTypes = {
		authStore: PropTypes.object.isRequired,
		googleStore: PropTypes.object.isRequired,
		fb: PropTypes.object.isRequired,
	};

	@observable private values = {
		valid: false,
		email: '',
		password: '',
		emailDirty: false,
		passwordDirty: false,
	};

	public render(): JSX.Element | null {
		const { authStore, googleStore } = this.props;
		return (
			<View style={styles.box}>
				<Text style={{ textAlign: 'center' }}>Login to Start</Text>
				<LoginForm values={this.values} authStore={authStore} inputHandler={this.handleInput} />
				<Button block style={{ marginTop: 20 }} onPress={this.handleSubmit} disabled={authStore.isLoading}>
					<Text>Login</Text>
				</Button>
				<View style={{ flexDirection: 'row', marginTop: 10 }}>
					<Button transparent info style={{ flex: 1, paddingLeft: 5 }}>
						<Text style={{ textDecorationLine: 'underline' }}>Forgot Password?</Text>
					</Button>
					<Button transparent warning style={{ flex: 1, paddingRight: 5, justifyContent: 'flex-end' }}>
						<Text style={{ textDecorationLine: 'underline' }}>Sign Up</Text>
					</Button>
				</View>
				{
					googleStore.isEnabled ? (
						<View style={{ flexDirection: 'row', height: 52 }}>
							<GoogleSigninButton
								style={{ flex: 1 }}
								size={GoogleSigninButton.Size.Wide}
								color={GoogleSigninButton.Color.Auto}
								onPress={this.handleGoogle} />
						</View>
					) : null
				}
			</View>
		);
	}

	private handleInput = (name: string) => action('Login.handleInput', (value: string) => {
		this.setDirty(name);
		if (name === 'email') {
			this.values.email = value;
		} else if (name === 'password') {
			this.values.password = value;
		}
	})

	@action.bound private setDirty(name: string) {
		if (name === 'email') {
			this.values.emailDirty = true;
		} else if (name === 'password') {
			this.values.passwordDirty = true;
		}
	}

	private handleGoogle = async () => {
		const { googleStore, authStore, history, location } = this.props;
		try {
			const user = await googleStore.signIn();
			await authStore.login({
				provider: 'google',
				data: { token: user.idToken },
			});
			// TODO error
			history.replace(location.state.from);
		} catch (err) {
			if (err.code === 12501) {
				console.warn('cancelled');
			} else if (err.code === 12500) {
				console.error('Google signin failed', err);
			} else if (err.code === 7) {
				console.warn('Network error');
			} else if (err.code === 5) {
				console.warn('Invalid account');
			} else if (err.code === 8) {
				console.warn('Internal error');
			} else {
				console.error('Unknown Google error', err);
			}
		}
	}

	private handleSubmit = () => {
		const { valid } = this.values;
		this.setDirty('email');
		this.setDirty('password');
		if (valid) {
			this.doSubmit();
		} else {
			Toast.show({
				text: 'Invalid credential',
				buttonText: 'Dismiss',
				type: 'danger',
				position: __DEV__ ? 'top' : 'bottom',
			});
		}
	}

	private doSubmit = async () => {
		const { authStore, history, location } = this.props;
		const { email, password } = this.values;
		await authStore.login({
			provider: 'password',
			data: { email, password },
		});

		if (authStore.lastError) {
			Toast.show({
				text: authStore.lastError,
				buttonText: 'Dismiss',
				type: 'danger',
				position: __DEV__ ? 'top' : 'bottom',
			});
		} else {
			history.replace(location.state.from);
		}
	}
}

const login = inject<IPLoginProps>('authStore', 'googleStore', 'fb')(observer<IPLoginProps>(Login));
login.displayName = 'Login';

export { Login as LoginRaw };
export default login;
