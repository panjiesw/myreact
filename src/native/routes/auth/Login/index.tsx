/**
 * Copyright (c) 2017 Panjie Setiawan Wicaksono <panjie@panjiesw.com>
 *
 * This software is released under the MIT License.
 * https://panjiesw.mit-license.org
 */

import React, { Component, PropTypes } from 'react';
import { View } from 'react-native';
import { RouteComponentProps, withRouter } from 'react-router-native';
import { inject, observer } from 'mobx-react/native';
import { Button, Container, Content, Form, Input, Item, Label, Text, Toast } from 'native-base';
import { IAuthStore } from 'common/stores/auth';
import AdaptiveStatusBar from 'native/components/AdaptiveStatusBar';
import styles from './styles';

export interface ILoginProps extends RouteComponentProps<any> {
	authStore: IAuthStore;
	fb: typeof firebase;
}

export interface IPLoginProps extends RouteComponentProps<any> {
	authStore?: IAuthStore;
	fb?: typeof firebase;
}

export interface ILoginState {
	email: string;
	password: string;
	emailDirty: boolean;
	passwordDirty: boolean;
}

class Login extends Component<ILoginProps, ILoginState> {
	public static displayName = 'LoginRaw';
	public static propTypes = {
		authStore: PropTypes.object.isRequired,
		fb: PropTypes.object.isRequired,
	};

	public state: ILoginState = {
		email: '',
		password: '',
		emailDirty: false,
		passwordDirty: false,
	};

	public render(): JSX.Element | null {
		const { email, password } = this.state;
		const { authStore } = this.props;
		return (
			<Container style={{ flex: 1, flexDirection: 'column', justifyContent: 'center' }}>
				<AdaptiveStatusBar colorBehindStatusBar="rgb(255,255,255)"/>
				<Content padder contentContainerStyle={{ flex: 1, flexDirection: 'column', justifyContent: 'center' }}>
					<View style={styles.spacer}/>
					<View style={styles.box}>
						<Text style={{ textAlign: 'center' }}>Login to Start</Text>
						<Form>
							<Item floatingLabel>
								<Label>Email</Label>
								<Input
									keyboardType="email-address"
									value={email}
									onChangeText={this.handleInput('email')}
									editable={authStore.isLoading}/>
							</Item>
							<Item floatingLabel>
								<Label>Password</Label>
								<Input
									secureTextEntry
									value={password}
									onChangeText={this.handleInput('password')}
									editable={authStore.isLoading}/>
							</Item>
						</Form>
						<Button block style={{ marginTop: 20 }} onPress={this.handleSubmit} disabled={authStore.isLoading}>
							<Text>Login</Text>
						</Button>
						<View style={{ flexDirection: 'row', marginTop: 10 }}>
							<Button transparent info style={{ flex: 1, paddingLeft: 5 }} onPress={() => console.log('hello')}>
								<Text style={{textDecorationLine: 'underline'}}>Forgot Password?</Text>
							</Button>
							<Button transparent warning style={{ flex: 1, paddingRight: 5, justifyContent: 'flex-end' }}
								onPress={() => console.log('hello2')}>
								<Text style={{textDecorationLine: 'underline'}}>Sign Up</Text>
							</Button>
						</View>
					</View>
					<View style={styles.spacer}/>
				</Content>
			</Container>
		);
	}

	private handleInput = (name: string) => (value: string) => {
		if (name === 'email') {
			this.setState({
				email: value,
				emailDirty: false,
			});
		} else if (name === 'password') {
			this.setState({
				password: value,
				passwordDirty: false,
			});
		}
	}

	private handleSubmit = async () => {
		const { email, password } = this.state;
		const { authStore, fb, history, location } = this.props;
		await authStore.login({
			provider: fb.auth.EmailAuthProvider.PROVIDER_ID,
			data: { email, password },
		});
		history.replace(location.state.from);

		if (authStore.lastError) {
			Toast.show({
				text: authStore.lastError,
				buttonText: 'Dismiss',
				type: 'danger',
				position: __DEV__ ? 'top' : 'bottom',
			});
		}
	}
}

const login = inject<IPLoginProps>('authStore', 'fb')(withRouter(observer<IPLoginProps>(Login)));
login.displayName = 'Login';

export { Login as LoginRaw };
export default login;
