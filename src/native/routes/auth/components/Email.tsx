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

export interface IEmailSigninProps {
	authStore: IAuthStore;
	history: History;
	location: Location;
	signup?: boolean;
	style?: ViewStyle;
	showToast(text: string, buttonText: string, type: 'success' | 'danger' | 'warning'): void;
}

export interface IFormFields {
	email: string;
	password: string;
	passwordConfirm: string;
	emailValid: boolean;
	passwordValid: boolean;
}

export interface IFormBlockProps {
	authStore: IAuthStore;
	inputHandler: (name: string) => (value: string) => void;
	pref: (input: { _root: TextInput }) => void;
	prefC?: (input: { _root: TextInput }) => void;
	onEmailSubmit: () => void;
	onPasswordSubmit: () => void;
	values: IFormFields;
	signup?: boolean;
}

// tslint:disable-next-line:variable-name
export const FormBlock: SFC<IFormBlockProps> =
	({ authStore, pref, prefC, inputHandler, onEmailSubmit, onPasswordSubmit, values, signup }) => (
		<Form>
			<Item floatingLabel error={!values.emailValid}>
				<Label style={{ color: 'white' }}>Email</Label>
				<Input
					style={{ color: 'white' }}
					keyboardType="email-address"
					returnKeyType="next"
					onSubmitEditing={onEmailSubmit}
					value={values.email}
					onChangeText={inputHandler('email')}
					editable={!authStore.isLoading} />
			</Item>
			<Item floatingLabel error={!values.passwordValid}>
				<Label style={{ color: 'white' }}>Password</Label>
				<Input
					style={{color: 'white'}}
					secureTextEntry
					returnKeyType={signup ? 'next' : 'go'}
					getRef={pref}
					onSubmitEditing={onPasswordSubmit}
					value={values.password}
					onChangeText={inputHandler('password')}
					editable={!authStore.isLoading} />
			</Item>
			{
				signup ? (
					<Item floatingLabel error={!values.passwordValid}>
						<Label style={{ color: 'white' }}>Confirm Password</Label>
						<Input
							style={{color: 'white'}}
							secureTextEntry
							returnKeyType="go"
							getRef={prefC}
							value={values.passwordConfirm}
							onChangeText={inputHandler('passwordConfirm')}
							editable={!authStore.isLoading} />
					</Item>
				) : null
			}
		</Form>
	);

class EmailSignin extends Component<IEmailSigninProps, void> {
	private passwordRef: { _root: TextInput };
	private passwordRefC: { _root: TextInput };

	@observable private values = {
		email: '',
		password: '',
		passwordConfirm: '',
		emailDirty: false,
		passwordDirty: false,
		passwordConfirmDirty: false,
	};

	@computed private get blockValues(): IFormFields {
		return {
			email: this.values.email,
			emailValid: this.isEmailVaild,
			password: this.values.password,
			passwordConfirm: this.values.passwordConfirm,
			passwordValid: this.isPasswordValid,
		};
	}

	@computed private get isEmailVaild(): boolean {
		const { email, emailDirty } = this.values;
		return !(emailDirty
			&& (email.length === 0 || !isEmail(email)));
	}

	@computed private get isPasswordValid(): boolean {
		const { signup } = this.props;
		const { password, passwordConfirm, passwordDirty, passwordConfirmDirty } = this.values;
		return !(passwordDirty
			&& password.length === 0
			&& (signup ? passwordConfirmDirty && password !== passwordConfirm : false));
	}

	@computed private get isFormValid(): boolean {
		const { signup } = this.props;
		const { email, password, passwordConfirm } = this.values;
		return this.isEmailVaild
			&& this.isPasswordValid
			&& email.length > 0
			&& password.length > 0
			&& (signup ? passwordConfirm.length > 0 : true);
	}

	public render(): JSX.Element | null {
		const { authStore, style, signup } = this.props;
		return (
			<View style={style}>
				<FormBlock
					signup={signup}
					authStore={authStore}
					values={this.blockValues}
					inputHandler={this.handleInput}
					pref={this.setPasswordRef}
					prefC={signup ? this.setPasswordRefC : undefined}
					onEmailSubmit={this.handleEmailSubmit}
					onPasswordSubmit={this.handlePasswordSubmit} />
				<Button
					iconLeft
					light
					block
					style={{ justifyContent: 'flex-start', marginTop: 20, borderRadius: 5 }}
					onPress={this.handleSubmit}
					disabled={authStore.isLoading}>
					<Icon
						style={{ borderRightColor: 'white', borderRightWidth: 0.5, paddingRight: 12 }}
						name="mail" />
					<Text style={{ textAlign: 'center', flex: 1 }}>Sign {signup ? 'up' : 'in'}</Text>
				</Button>
				{
					signup ? null : (
						<View style={{ flexDirection: 'row', marginTop: 10 }}>
							<Button transparent style={{ flex: 1, paddingLeft: 5 }}>
								<Text style={{ textDecorationLine: 'underline', color: 'white' }}>Forgot Password?</Text>
							</Button>
							<Button
								transparent
								onPress={this.handleSignup}
								style={{ flex: 1, paddingRight: 5, justifyContent: 'flex-end' }}>
								<Text style={{ textDecorationLine: 'underline', color: 'white' }}>Sign Up</Text>
							</Button>
						</View>
					)
				}
			</View>
		);
	}

	private setPasswordRef = (input: { _root: TextInput }) => {
		this.passwordRef = input;
	}

	private setPasswordRefC = (input: { _root: TextInput }) => {
		this.passwordRefC = input;
	}

	@action.bound private handleEmailSubmit() {
		this.passwordRef._root.focus();
		this.values.emailDirty = true;
	}

	@action.bound private handlePasswordSubmit() {
		if (this.props.signup) {
			this.passwordRefC._root.focus();
			this.values.passwordDirty = true;
		}
	}

	private handleInput = (name: string) => action('Login.handleInput', (value: string) => {
		this.setDirty(name);
		if (name === 'email') {
			this.values.email = value;
		} else if (name === 'password') {
			this.values.password = value;
		} else if (name === 'passwordConfirm') {
			this.values.passwordConfirm = value;
		}
	})

	@action.bound private setDirty(name: string) {
		if (name === 'email') {
			this.values.emailDirty = true;
		} else if (name === 'password') {
			this.values.passwordDirty = true;
		} else if (name === 'passwordConfirm') {
			this.values.passwordConfirmDirty = true;
		}
	}

	private handleSignup = () => {
		const { history } = this.props;
		history.push('/auth/signup');
	}

	private handleSubmit = () => {
		this.setDirty('email');
		this.setDirty('password');
		this.setDirty('passwordConfirm');
		if (this.isFormValid) {
			this.doSubmit();
		} else {
			this.props.showToast('Invalid form', 'Dismiss', 'danger');
		}
	}

	private doSubmit = async () => {
		const {
			authStore,
			history,
			location,
			showToast,
			signup,
		} = this.props;
		const { email, password } = this.values;
		if (signup) {
			await authStore.signUp(email, password);
		} else {
			await authStore.signIn({
				provider: 'password',
				data: { email, password },
			});
		}

		if (authStore.lastError) {
			showToast(authStore.lastError, 'Dismiss', 'danger');
		} else {
			history.replace(location.state.from);
		}
	}
}

export default observer<IEmailSigninProps>(EmailSignin);
