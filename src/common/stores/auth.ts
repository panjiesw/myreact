/**
 * Copyright (c) 2017 Panjie Setiawan Wicaksono <panjie@panjiesw.com>
 *
 * This software is released under the MIT License.
 * https://panjiesw.mit-license.org
 */

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

	signIn(params: ILoginParams): Promise<void>;
	signUp(email: string, password: string): Promise<void>;
	signOut(): Promise<void>;
	registerAuthStateListener(next: (user: firebase.User | null) => void): () => any;
}

class AuthStore implements IAuthStore {
	@observable public user: firebase.User | null = null;
	@observable public isLoggedIn: boolean = false;
	@observable public isLoading: boolean = false;

	@computed public get lastError(): string | null {
		if (this._lastError === null) {
			return null;
		}
		if (typeof this._lastError === 'string') {
			return this._lastError;
		} else {
			return this._lastError.message ? this._lastError.message : 'Unknown Error';
		}
	}

	@observable private _lastError: Error | string | null = null;

	constructor(private fb: typeof firebase) {
	}

	public registerAuthStateListener = (next: (user: firebase.User | null) => void): () => any =>
		this.fb.auth().onAuthStateChanged((user: firebase.User | null) => {
			this.setUser(user);
			next(user);
		})

	public signIn = async (params: ILoginParams): Promise<void> => {
		this.setLoading(true);
		try {
			let user: firebase.User | undefined;
			if (params.provider === 'password'
				&& params.data.email
				&& params.data.password) {
				user = await this.fb.auth().signInWithEmailAndPassword(params.data.email, params.data.password);
			} else if (params.data.token) {
				const token: string = params.data.token;
				let credential: firebase.auth.AuthCredential;
				if (params.provider.indexOf('facebook') === 0) {
					credential = this.fb.auth.FacebookAuthProvider.credential(token);
				} else if (params.provider.indexOf('google') === 0) {
					credential = this.fb.auth.GoogleAuthProvider.credential(token);
				} else {
					credential = this.fb.auth.GithubAuthProvider.credential(token);
				}
				user = await this.fb.auth().signInWithCredential(credential);
			} else {
				user = undefined;
			}

			if (user) {
				this.setUser(user);
			} else {
				//noinspection ExceptionCaughtLocallyJS
				throw new Error('Invalid provider for login');
			}
		} catch (err) {
			let e: any = err;
			if (err.code === 'auth/invalid-email'
				|| err.code === 'auth/user-not-found'
				|| err.code === 'auth/wrong-password') {
				e = 'Invalid credential';
			} else if (err.code === 'auth/user-disabled') {
				e = 'Account is disabled';
			} else if (err.code === 'auth/invalid-credential') {
				e = 'Invalid Provider credential';
			} else if (err.code === 'auth/operation-not-allowed') {
				e = 'Provider is not enabled for this app';
			} else {
				console.warn('Failed to login', err);
			}
			// TODO auth/account-exists-with-different-credential
			this.setError(e);
		}
		this.setLoading(false);
	}

	public signUp = async (email: string, password: string): Promise<void> => {
		this.setLoading();
		let user: firebase.User | undefined;
		try {
			user = await this.fb.auth().createUserWithEmailAndPassword(email, password);
			if (!user) {
				throw new Error('Invalid sign up state');
			}
			this.setUser(user);
		} catch (err) {
			console.warn(err);
			this.setError(err);
		}
		this.setLoading(false);
	}

	public signOut = async (): Promise<void> => {
		await this.fb.auth().signOut();
	}

	@action('AuthStore.updateUser')
	private setUser(user: firebase.User | null) {
		this.user = user;
		this.isLoggedIn = user !== null;
	}

	@action('AuthStore.updateLoading')
	private setLoading(loading = true) {
		this.isLoading = loading;
	}

	@action('AuthStore.updateError')
	private setError(err: Error | string | null) {
		this._lastError = err;
	}
}

export default AuthStore;
