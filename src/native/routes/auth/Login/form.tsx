/**
 * Copyright (c) 2017 Panjie Setiawan Wicaksono <panjie@panjiesw.com>
 *
 * This software is released under the MIT License.
 * https://panjiesw.mit-license.org
 */

import React, { Component } from 'react';
import { TextInput } from 'react-native';
import { observer } from 'mobx-react/native';
import { action, autorun, computed } from 'mobx';
import { Form, Item, Label, Input } from 'native-base';
import { IAuthStore } from 'common/stores/auth';

export interface ILoginFormProps {
	inputHandler: (name: string) => (value: string) => void;
	authStore: IAuthStore;
	values: {
		valid: boolean;
		email: string;
		password: string;
		emailDirty: boolean;
		passwordDirty: boolean;
	};
}

class LoginForm extends Component<ILoginFormProps, void> {
	private passwordRef: { _root: TextInput };
	private validaWatcher: () => any;

	@computed private get isEmailVaild(): boolean {
		const { values } = this.props;
		return !(
			values.emailDirty &&
			(values.email.length === 0 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email))
		);
	}

	@computed private get isPasswordValid(): boolean {
		const { values } = this.props;
		return !(values.passwordDirty && values.password.length === 0);
	}

	public componentDidMount() {
		this.validaWatcher = autorun(() => {
			const {values} = this.props;
			if (this.isEmailVaild && this.isPasswordValid && values.email.length > 0 && values.password.length > 0) {
				values.valid = true;
			}
		});
	}

	public componentWillUnmount() {
		if (this.validaWatcher) {
			this.validaWatcher();
		}
	}

	public render(): JSX.Element | null {
		const { authStore, values, inputHandler } = this.props;
		return (
			<Form>
				<Item floatingLabel error={!this.isEmailVaild}>
					<Label>Email</Label>
					<Input
						keyboardType="email-address"
						returnKeyType="next"
						onSubmitEditing={this.handleEmailSubmit}
						value={values.email}
						onChangeText={inputHandler('email')}
						editable={!authStore.isLoading} />
				</Item>
				<Item floatingLabel last error={!this.isPasswordValid}>
					<Label>Password</Label>
					<Input
						secureTextEntry
						getRef={this.sePasswordRef}
						value={values.password}
						onChangeText={inputHandler('password')}
						editable={!authStore.isLoading} />
				</Item>
			</Form>
		);
	}

	private sePasswordRef = (input: { _root: TextInput }) => {
		this.passwordRef = input;
	}

	@action.bound private handleEmailSubmit() {
		this.passwordRef._root.focus();
		this.props.values.emailDirty = true;
	}
}

export default observer<ILoginFormProps>(LoginForm);
