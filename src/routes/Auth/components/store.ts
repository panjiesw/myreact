// Copyright (c) 2017 Panjie Setiawan Wicaksono
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { computed } from 'mobx';
import * as firebaseui from 'firebaseui';
import { firebaseStore, IFirebaseStore } from 'stores/firebase';

export interface IAuthUIStore {
	isLoggedIn: boolean;
	startUI(id: string): void;
}

export class AuthUIStore implements IAuthUIStore {

	@computed
	get isLoggedIn(): boolean {
		return this.firebaseStore.userObservable.current != null;
	}

	private fui: firebaseui.auth.AuthUI;

	constructor(private config: firebaseui.auth.UIConfig, private firebaseStore: IFirebaseStore) {
		this.fui = new firebaseui.auth.AuthUI(this.firebaseStore.app.auth());
	}

	public startUI = (id: string) => {
		this.fui.start(id, this.config);
	}

}

const authUIStore = new AuthUIStore({
	callbacks: {
		signInSuccess(_) {
			return false;
		},
	},
	signInFlow: 'popup',
	signInOptions: [
		firebase.auth.EmailAuthProvider.PROVIDER_ID,
		firebase.auth.GithubAuthProvider.PROVIDER_ID,
	],
	tosUrl: '',
}, firebaseStore);

export { authUIStore };
