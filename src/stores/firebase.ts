// Copyright (c) 2016 Panjie Setiawan Wicaksono
//
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php

import * as firebase from 'firebase';
import { fromStream } from 'mobx-utils';
import { ReplaySubject } from 'rxjs/ReplaySubject';

export interface IFirebaseConfig {
	apiKey: string;
	authDomain: string;
	databaseURL?: string;
	storageBucket?: string;
	messagingSenderId?: string;
}

export interface IFirebaseStore {
	readonly app: firebase.app.App;
	readonly loggedInSubject: ReplaySubject<FirebaseUser>;
	readonly userObservable: MobxRxObservable<FirebaseUser>;
}

export class FirebaseStore implements IFirebaseStore {
	public loggedInSubject: ReplaySubject<FirebaseUser> = new ReplaySubject<FirebaseUser>(1);
	public userObservable: MobxRxObservable<FirebaseUser> = fromStream<FirebaseUser>(this.loggedInSubject);
	public app: firebase.app.App;

	constructor(config: IFirebaseConfig) {
		this.app = firebase.initializeApp(config);
		this.app.auth().onAuthStateChanged(this.loggedInSubject);
	}
}

const firebaseStore = new FirebaseStore({
	apiKey: process.env.FIREBASE_API_KEY,
	authDomain: process.env.FIREBAE_AUTH_DOMAIN,
});

export { firebaseStore };
