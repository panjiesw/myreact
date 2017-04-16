// Copyright (c) 2017 Panjie Setiawan Wicaksono
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { action, computed, observable } from 'mobx';

export interface IProviderData {
	email?: string;
	password?: string;
	token?: string;
}

export interface ILoginParams {
	provider: string;
	data: IProviderData;
}

export interface IAuthStore {
	readonly user: firebase.User | null;
	readonly isLoggedIn: boolean;
	readonly isLoading: boolean;
	readonly lastError: string | null;

	login(params: ILoginParams): Promise<void>;
}

class AuthStore implements IAuthStore {
	@observable public user: firebase.User | null = null;
	@observable public isLoggedIn: boolean = false;
	@observable public isLoading: boolean = false;

	@computed public get lastError(): string | null {
		if (typeof this._lastError === 'string') {
			return this._lastError;
		} else if (this._lastError instanceof Error) {
			return this._lastError.message ? this._lastError.message : 'Unknown Error';
		}
		return null;
	}

	@observable private _lastError: Error | string | null = null;

	constructor(private fb: typeof firebase) {
	}

	public login = async (params: ILoginParams): Promise<void> => {
		this.updateLoading(true);
		try {
			let user: firebase.User | undefined;
			if (params.provider === this.fb.auth.EmailAuthProvider.PROVIDER_ID
				&& params.data.email
				&& params.data.password) {
				user = await this.fb.auth().signInWithEmailAndPassword(params.data.email, params.data.password);
			} else if (params.data.token) {
				const token: string = params.data.token;
				let credential: firebase.auth.AuthCredential;
				if (params.provider === this.fb.auth.FacebookAuthProvider.PROVIDER_ID) {
					credential = this.fb.auth.FacebookAuthProvider.credential(token);
				} else if (params.provider === this.fb.auth.GoogleAuthProvider.PROVIDER_ID) {
					credential = this.fb.auth.GoogleAuthProvider.credential(token);
				} else {
					credential = this.fb.auth.GithubAuthProvider.credential(token);
				}
				user = await this.fb.auth().signInWithCredential(credential);
			} else {
				user = undefined;
			}

			if (user) {
				this.updateUser(user);
			} else {
				throw new Error('Invalid provider for login');
			}
		} catch (err) {
			console.warn('Failed to login', err);
			this.updateError(err);
		}
		this.updateLoading(false);
	}

	@action('AuthStore.updateUser')
	private updateUser(user: firebase.User | null) {
		this.user = user;
		if (user) {
			this.isLoggedIn = true;
		} else {
			this.isLoggedIn = false;
		}
	}

	@action('AuthStore.updateLoading')
	private updateLoading(loading = false) {
		this.isLoading = loading;
	}

	@action('AuthStore.updateError')
	private updateError(err: Error | string | null) {
		this._lastError = err;
	}
}

export default AuthStore;
