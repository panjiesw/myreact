// Copyright (c) 2017 Panjie Setiawan Wicaksono
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { action, computed, when, observable } from 'mobx';
import { firebaseStore, IFirebaseStore } from 'stores/firebase';

export interface IAuthUIStore {
	config: firebaseui.auth.UIConfig;
	isInitialized: boolean;
	isLoggedIn: boolean;
	initialize(): void;
	startUI(id: string): void;
}

export class AuthUIStore implements IAuthUIStore {

	@observable
	isInitialized = false;

	@computed
	get isLoggedIn(): boolean {
		return this.firebaseStore.isLoggedIn;
	}

	private fui: firebaseui.auth.AuthUI;

	private initUI = action('AuthUIStore:initUI', () => {
		if (!this.isInitialized && this.firebaseStore.app) {
			this.fui = new firebaseui.auth.AuthUI(this.firebaseStore.app.auth());
			this.isInitialized = true;
		}
	})

	initialize = () => {
		when(
			'AuthUIStore:waiting firebase init',
			() => this.firebaseStore.isInitialized,
			() => this.initUI());
	}

	startUI = (id: string) => {
		this.fui.start(id, this.config);
	}

	constructor(
		public config: firebaseui.auth.UIConfig,
		private firebaseStore: IFirebaseStore) { }
}

const authUIStore = new AuthUIStore({
	callbacks: {
		signInSuccess(_) {
			return false;
		}
	},
	signInFlow: 'popup',
	signInOptions: [
		firebase.auth.EmailAuthProvider.PROVIDER_ID,
		firebase.auth.GithubAuthProvider.PROVIDER_ID
	],
	tosUrl: ''
}, firebaseStore);

export { authUIStore };
