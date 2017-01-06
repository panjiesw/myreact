// Copyright (c) 2017 Panjie Setiawan Wicaksono
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { EnterHook } from 'react-router';
import { autorunAsync, when } from 'mobx';
import { IFirebaseStore, firebaseStore } from './firebase';

export interface IAuthStore {
	firebaseStore: IFirebaseStore;
	onEnterAuthRoute: EnterHook
}

export class AuthStore implements IAuthStore {

	onEnterAuthRoute: EnterHook = (nextState, replace, cb) => {
		when(
			'AuthStore:onEnterAuthRoute(init firebase)',
			() => this.firebaseStore.isInitialized,
			() => this.enterAuthHook(nextState, replace, cb));
	}

	constructor(public firebaseStore: IFirebaseStore) {
	}

	private enterAuthHook: EnterHook = (nextState, replace, cb) => {
		autorunAsync('AuthStore:enterAuthHook', () => {
			if (nextState.location.pathname === 'auth' && this.firebaseStore.isLoggedIn) {
				replace('app');
			} else if (nextState.location.pathname !== 'auth' &&
				nextState.location.pathname !== '/' &&
				!this.firebaseStore.isLoggedIn) {
				replace('auth');
			}

			if (cb) {
				cb();
			}
		}, 500);
	}
}

const authStore = new AuthStore(firebaseStore);

export { authStore };
