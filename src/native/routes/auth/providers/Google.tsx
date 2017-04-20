/**
 * Copyright (c) 2017 Panjie Setiawan Wicaksono <panjie@panjiesw.com>
 *
 * This software is released under the MIT License.
 * https://panjiesw.mit-license.org
 */

import React, { Component, PropTypes } from 'react';
import { Button, Icon, Text } from 'native-base';
import { observer } from 'mobx-react/native';
import { History, Location } from 'history';
import { IAuthStore } from 'common/stores/auth';
import { IGoogleStore } from 'native/stores/google';

export interface IGoogleLoginProps {
	enabled?: boolean;
	authStore: IAuthStore;
	googleStore: IGoogleStore;
	history: History;
	location: Location;
	showToast(text: string, buttonText: string, type: 'success' | 'danger' | 'warning'): void;
}

// rgb(219, 64, 44)
class GoogleLogin extends Component<IGoogleLoginProps, void> {
	public static displayName = 'GoogleLoginRaw';
	public static propTypes = {
		authStore: PropTypes.object.isRequired,
		googleStore: PropTypes.object.isRequired,
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
				style={{ justifyContent: 'flex-start', backgroundColor: 'rgb(219, 64, 44)', borderRadius: 5 }}
				onPress={this.handleGoogle}>
				<Icon style={{ borderRightColor: 'white', borderRightWidth: 0.5, paddingRight: 9 }} name="logo-googleplus" />
				<Text style={{textAlign: 'center', flex: 1}}>Sign in with Google</Text>
			</Button>
		) : null;
	}

	private handleGoogle = async () => {
		const { googleStore, authStore, history, location, showToast } = this.props;
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
				showToast('Login is cancelled', 'Dismiss', 'warning');
			} else if (err.code === 12500) {
				showToast('Login failed. Please try again with other account', 'Dismiss', 'danger');
			} else if (err.code === 7) {
				showToast('Network error. Please try again later', 'Dismiss', 'danger');
			} else if (err.code === 5) {
				showToast('Invalid account', 'Dismiss', 'danger');
			} else if (err.code === 8) {
				showToast('Internal error. Please try again later', 'Dismiss', 'warning');
			} else {
				showToast(`Unknown error. ${
					err.message ?
						err.message : typeof err === 'string' ?
							err : ''}`, 'Dismiss', 'danger');
			}
		}
	}
}

export { GoogleLogin as GoogleLoginRaw };

export default observer(GoogleLogin);
