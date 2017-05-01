/**
 * Copyright (c) 2017 Panjie Setiawan Wicaksono <panjie@panjiesw.com>
 *
 * This software is released under the MIT License.
 * https://panjiesw.mit-license.org
 */

import * as firebaseui from 'firebaseui';
import { IFirebaseWrapper } from 'common/utils/firebase';

export interface IAuthUIStore {
	startFirebaseUI(id: string): void;
}

class AuthUIStore implements IAuthUIStore {
	private fui: firebaseui.auth.AuthUI;

	constructor(private wrapper: IFirebaseWrapper) {
		this.fui = new firebaseui.auth.AuthUI(wrapper.app.auth());
	}

	public startFirebaseUI(id: string, config?: firebaseui.auth.IConfig): void {
		let _conf: firebaseui.auth.IConfig;
		if (config) {
			_conf = config;
		} else {
			_conf = {
				callbacks: {
					signInSuccess(_) {
						return false;
					},
				},
				signInFlow: 'popup',
				signInOptions: [
					this.wrapper.email.id,
					this.wrapper.google.id,
					this.wrapper.facebook.id,
					this.wrapper.github.id,
				],
				tosUrl: '',
			};
		}
		this.fui.start(id, _conf);
	}
}

export default AuthUIStore;
