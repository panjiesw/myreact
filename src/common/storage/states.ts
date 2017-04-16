// Copyright (c) 2017 Panjie Setiawan Wicaksono
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

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
