/**
 * Copyright (c) 2017 Panjie Setiawan Wicaksono <panjie@panjiesw.com>
 *
 * This software is released under the MIT License.
 * https://panjiesw.mit-license.org
 */

import { GoogleSignin, IGoogleUser } from 'react-native-google-signin';
import { AccessToken, LoginManager, LoginResult } from 'react-native-fbsdk';
import Config from 'react-native-config';
import { action, computed, observable } from 'mobx';
import { IAuthStore } from 'common/stores/auth';

export interface IOAuthStore {
	readonly isInitialized: boolean;
	readonly isLoading: boolean;
	readonly isGoogleEnabled: boolean;
	initialize(): Promise<void>;
	signInGoogle(): Promise<void>;
	signInFacebook(): Promise<void>;
}

class OAuthStore implements IOAuthStore {
	@observable public isInitialized: boolean = false;
	@observable public isGoogleEnabled: boolean = false;
	@computed get isLoading(): boolean {
		return this.authStore.isLoading ||
			this.isGoogleLoading ||
			this.isFacebookLoading;
	}

	@observable private isGoogleLoading = false;
	@observable private isFacebookLoading = false;

	constructor(public authStore: IAuthStore) {
	}

	public async initialize(): Promise<void> {
		try {
			await GoogleSignin.hasPlayServices({ autoResolve: true });
			await GoogleSignin.configure({
				webClientId: Config.GOOGLE_WEB_CLIENT_ID,
			});
			this.setGoogleEnabled();
			this.setInitialized();
		} catch (err) {
			console.warn('Error initializing google signin, disable provider', err);
			this.setGoogleEnabled(false);
		}
	}

	public async signInGoogle(): Promise<void> {
		this.setGoogleLoading();
		const user: IGoogleUser = await GoogleSignin.signIn();
		await this.authStore.signIn({
			provider: 'google',
			data: { token: user.idToken },
		});
		this.setGoogleLoading(false);
		if (this.authStore.lastError) {
			throw new Error(this.authStore.lastError);
		}
	}

	public async signInFacebook(): Promise<void> {
		this.setFacebookLoading();
		const result: LoginResult = await LoginManager
			.logInWithReadPermissions(['public_profile', 'email']);
		if (result.isCancelled) {
			this.setFacebookLoading(false);
			throw new Error('Login is cancelled');
		}
		const accessToken: AccessToken | null = await AccessToken
			.getCurrentAccessToken();
		if (!accessToken) {
			this.setFacebookLoading(false);
			throw new Error('Invalid login state');
		}
		await this.authStore.signIn({
			provider: 'facebook',
			data: { token: accessToken.accessToken },
		});
		this.setFacebookLoading(false);
		if (this.authStore.lastError) {
			throw new Error(this.authStore.lastError);
		}
	}

	@action.bound private setInitialized(initialized: boolean = true) {
		this.isInitialized = initialized;
	}

	@action.bound private setGoogleEnabled(enabled: boolean = true) {
		this.isGoogleEnabled = enabled;
	}

	@action.bound private setGoogleLoading(loading: boolean = true) {
		this.isGoogleLoading = loading;
	}

	@action.bound private setFacebookLoading(loading: boolean = true) {
		this.isFacebookLoading = loading;
	}
}

export default OAuthStore;
