/**
 * Copyright (c) 2017 Panjie Setiawan Wicaksono <panjie@panjiesw.com>
 *
 * This software is released under the MIT License.
 * https://panjiesw.mit-license.org
 */

import * as firebase from 'firebase';
import { IFirebaseWrapper } from 'common/utils/firebase';

const app = firebase.initializeApp({
	apiKey: process.env.FIREBASE_API_KEY,
	authDomain: process.env.FIREBASE_AUTH_DOMAIN,
	databaseURL: process.env.FIREBASE_DATABASE_URL,
	projectId: process.env.FIREBASE_PROJECT_ID,
	storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
	messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
});

const wrapper: IFirebaseWrapper = {
	app,
	facebook: {
		provider: firebase.auth.FacebookAuthProvider,
		id: firebase.auth.FacebookAuthProvider.PROVIDER_ID,
		credential: firebase.auth.FacebookAuthProvider.credential,
	},
	google: {
		provider: firebase.auth.GoogleAuthProvider,
		id: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
		credential: firebase.auth.GoogleAuthProvider.credential,
	},
	github: {
		provider: firebase.auth.GithubAuthProvider,
		id: firebase.auth.GithubAuthProvider.PROVIDER_ID,
		credential: firebase.auth.GithubAuthProvider.credential,
	},
	email: {
		provider: firebase.auth.EmailAuthProvider,
		id: firebase.auth.EmailAuthProvider.PROVIDER_ID,
		credential: firebase.auth.EmailAuthProvider.credential,
	},
};

export default wrapper;
