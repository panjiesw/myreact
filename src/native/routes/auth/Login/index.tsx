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
import { IAuthStore } from 'common/stores/auth';
import LoginForm from './form';
import styles from './styles';

export interface ILoginProps extends RouteComponentProps<any> {
	authStore: IAuthStore;
	fb: typeof firebase;
}

export interface IPLoginProps extends RouteComponentProps<any> {
	authStore?: IAuthStore;
	fb?: typeof firebase;
}

class Login extends Component<ILoginProps, void> {
	public static displayName = 'LoginRaw';
	public static propTypes = {
		authStore: PropTypes.object.isRequired,
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
		const { authStore } = this.props;
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
		const { authStore, fb, history, location } = this.props;
		const { email, password } = this.values;
		await authStore.login({
			provider: fb.auth.EmailAuthProvider.PROVIDER_ID,
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

const login = inject<IPLoginProps>('authStore', 'fb')(observer<IPLoginProps>(Login));
login.displayName = 'Login';

export { Login as LoginRaw };
export default login;
