/**
 * Copyright (c) 2017 Panjie Setiawan Wicaksono <panjie@panjiesw.com>
 *
 * This software is released under the MIT License.
 * https://panjiesw.mit-license.org
 */

import { GoogleSignin, IGoogleUser } from 'react-native-google-signin';
import Config from 'react-native-config';
import { action, observable } from 'mobx';

export interface IGoogleStore {
	isInitialized: boolean;
	isEnabled: boolean;
	initialize(): Promise<void>;
	signIn(): Promise<IGoogleUser>;
}

// TODO on firebase signout
class GoogleStore implements IGoogleStore {
	@observable public isInitialized: boolean = false;
	@observable public isEnabled: boolean = false;

	public async initialize(): Promise<void> {
		try {
			await GoogleSignin.hasPlayServices({ autoResolve: true });
			await GoogleSignin.configure({
				webClientId: Config.GOOGLE_WEB_CLIENT_ID,
			});
			this.setEnabled();
			this.setInitialized();
		} catch (err) {
			console.warn('Error initializing google signin, disable provider', err);
			this.setEnabled(false);
		}
	}

	public async signIn(): Promise<IGoogleUser> {
		const user = await GoogleSignin.signIn();
		return user;
	}

	@action.bound private setInitialized(initialized: boolean = true) {
		this.isInitialized = initialized;
	}

	@action.bound private setEnabled(enabled: boolean = true) {
		this.isEnabled = enabled;
	}
}

export default GoogleStore;
