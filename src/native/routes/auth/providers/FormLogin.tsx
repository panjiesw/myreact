/**
 * Copyright (c) 2017 Panjie Setiawan Wicaksono <panjie@panjiesw.com>
 *
 * This software is released under the MIT License.
 * https://panjiesw.mit-license.org
 */

import React, { Component, SFC } from 'react';
import { TextInput, View, ViewStyle } from 'react-native';
import { observer } from 'mobx-react/native';
import { action, computed, observable } from 'mobx';
import { Button, Icon, Text, Form, Item, Label, Input } from 'native-base';
import { History, Location } from 'history';
import { IAuthStore } from 'common/stores/auth';
import { isEmail } from 'common/utils/validation';

export interface ILoginFormProps {
	authStore: IAuthStore;
	history: History;
	location: Location;
	style?: ViewStyle;
	showToast(text: string, buttonText: string, type: 'success' | 'danger' | 'warning'): void;
}

export interface IFormBlockProps {
	authStore: IAuthStore;
	inputHandler: (name: string) => (value: string) => void;
	pref: (input: { _root: TextInput }) => void;
	onEmailSubmit: () => void;
	values: {
		email: string;
		password: string;
		emailValid: boolean;
		passwordValid: boolean;
	};
}

// tslint:disable-next-line:variable-name
export const FormBlock: SFC<IFormBlockProps> =
	({ authStore, pref, inputHandler, onEmailSubmit, values }) => (
		<Form>
			<Item floatingLabel error={!values.emailValid}>
				<Label>Email</Label>
				<Input
					keyboardType="email-address"
					returnKeyType="next"
					onSubmitEditing={onEmailSubmit}
					value={values.email}
					onChangeText={inputHandler('email')}
					editable={!authStore.isLoading} />
			</Item>
			<Item floatingLabel last error={!values.passwordValid}>
				<Label>Password</Label>
				<Input
					secureTextEntry
					getRef={pref}
					value={values.password}
					onChangeText={inputHandler('password')}
					editable={!authStore.isLoading} />
			</Item>
		</Form>
	);

class LoginForm extends Component<ILoginFormProps, void> {
	private passwordRef: { _root: TextInput };

	@observable private values = {
		email: '',
		password: '',
		emailDirty: false,
		passwordDirty: false,
	};

	@computed private get blockValues(): any {
		return {
			email: this.values.email,
			emailValid: this.isEmailVaild,
			password: this.values.password,
			passwordValid: this.isPasswordValid,
		};
	}

	@computed private get isEmailVaild(): boolean {
		return !(
			this.values.emailDirty &&
			(this.values.email.length === 0 || !isEmail(this.values.email))
		);
	}

	@computed private get isPasswordValid(): boolean {
		return !(this.values.passwordDirty && this.values.password.length === 0);
	}

	@computed private get isFormValid(): boolean {
		return this.isEmailVaild &&
			this.isPasswordValid &&
			this.values.email.length > 0 &&
			this.values.password.length > 0;
	}

	public render(): JSX.Element | null {
		const { authStore, style } = this.props;
		return (
			<View style={style}>
				<FormBlock
					authStore={authStore}
					values={this.blockValues}
					inputHandler={this.handleInput}
					pref={this.sePasswordRef}
					onEmailSubmit={this.handleEmailSubmit} />
				<Button
					iconLeft
					info
					block
					style={{ justifyContent: 'flex-start', marginTop: 20, borderRadius: 5 }}
					onPress={this.handleSubmit}
					disabled={authStore.isLoading}>
					<Icon
						style={{ borderRightColor: 'white', borderRightWidth: 0.5, paddingRight: 12 }}
						name="mail" />
					<Text style={{textAlign: 'center', flex: 1}}>Sign in</Text>
				</Button>
				<View style={{ flexDirection: 'row', marginTop: 10 }}>
					<Button transparent style={{ flex: 1, paddingLeft: 5 }}>
						<Text style={{ textDecorationLine: 'underline' }}>Forgot Password?</Text>
					</Button>
					<Button transparent style={{ flex: 1, paddingRight: 5, justifyContent: 'flex-end' }}>
						<Text style={{ textDecorationLine: 'underline' }}>Sign Up</Text>
					</Button>
				</View>
			</View>
		);
	}

	private sePasswordRef = (input: { _root: TextInput }) => {
		this.passwordRef = input;
	}

	@action.bound private handleEmailSubmit() {
		this.passwordRef._root.focus();
		this.values.emailDirty = true;
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
		this.setDirty('email');
		this.setDirty('password');
		if (this.isFormValid) {
			this.doSubmit();
		} else {
			this.props.showToast('Invalid credential', 'Dismiss', 'danger');
		}
	}

	private doSubmit = async () => {
		const { authStore, history, location, showToast } = this.props;
		const { email, password } = this.values;
		await authStore.login({
			provider: 'password',
			data: { email, password },
		});

		if (authStore.lastError) {
			showToast(authStore.lastError, 'Dismiss', 'danger');
		} else {
			history.replace(location.state.from);
		}
	}
}

export default observer<ILoginFormProps>(LoginForm);
