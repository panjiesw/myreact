/**
 * Copyright (c) 2017 Panjie Setiawan Wicaksono <panjie@panjiesw.com>
 *
 * This software is released under the MIT License.
 * https://panjiesw.mit-license.org
 */

export interface IFirebaseAuthProvider<T extends firebase.auth.AuthProvider> {
	provider: T;
	id: string;
	credential: (token: string) => firebase.auth.AuthCredential;
}

export interface IFirebaseWrapper {
	readonly app: firebase.app.App;

	facebook: IFirebaseAuthProvider<firebase.auth.FacebookAuthProvider>;
	google: IFirebaseAuthProvider<firebase.auth.GoogleAuthProvider>;
	github: IFirebaseAuthProvider<firebase.auth.GithubAuthProvider>;
	email: IFirebaseAuthProvider<firebase.auth.EmailAuthProvider>;
}
