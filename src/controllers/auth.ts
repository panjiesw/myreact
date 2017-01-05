// Copyright (c) 2017 Panjie Setiawan Wicaksono
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { EnterHook } from 'react-router';
import { autorunAsync, when } from 'mobx';
import { IFirebaseController, firebaseController } from './firebase';

export interface IAuthController {
	firebaseController: IFirebaseController;
	onEnterAuthRoute: EnterHook
}

export class AuthController implements IAuthController {

	onEnterAuthRoute: EnterHook = (nextState, replace, cb) => {
		when(
			'AuthController:onEnterAuthRoute(init firebase)',
			() => this.firebaseController.isInitialized,
			() => this.enterAuthHook(nextState, replace, cb));
	}

	constructor(public firebaseController: IFirebaseController) {
	}

	private enterAuthHook: EnterHook = (_, replace, cb) => {
		autorunAsync('AuthController:enterAuthHook', () => {
			if (this.firebaseController.isLoggedIn) {
				replace('app');
			}

			if (cb) {
				cb();
			}
		}, 500);
	}
}

const authController = new AuthController(firebaseController);

export { authController };
