// Copyright (c) 2017 Panjie Setiawan Wicaksono
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { computed } from 'mobx';
import { EnterHook } from 'react-router';
import 'rxjs/add/operator/first';
import { firebaseStore, IFirebaseStore } from './firebase';

export interface IAuthStore {
	readonly shouldEnter: EnterHook;
	readonly user: FirebaseUser;
}

export class AuthStore implements IAuthStore {
	@computed get user(): FirebaseUser {
		return this.firebaseStore.userObservable.current;
	}

	constructor(private firebaseStore: IFirebaseStore) {
	}

	public shouldEnter: EnterHook = (nextState, replace, cb) => {
		this.firebaseStore.loggedInSubject.first().subscribe((user) => {
			if (nextState.location.pathname === 'auth' && user !== null) {
				replace('app');
			} else if (nextState.location.pathname !== 'auth' &&
				nextState.location.pathname !== '/' &&
				user === null) {
				replace('auth');
			}

			if (cb) {
				cb();
			}
		});
	}
}

const authStore = new AuthStore(firebaseStore);

export { authStore };
