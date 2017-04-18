/**
 * Copyright (c) 2017 Panjie Setiawan Wicaksono <panjie@panjiesw.com>
 *
 * This software is released under the MIT License.
 * https://panjiesw.mit-license.org
 */

import * as firebase from 'firebase';

export interface IUser extends firebase.UserInfo {
	emailVerified: boolean;
	isAnonymous: boolean;
	providerData: Array<firebase.UserInfo | null>;
	refreshToken: string;
}

export interface IUserState {
	isLoggedIn: boolean;
	user: IUser;
}
