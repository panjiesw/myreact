// Copyright (c) 2016 Panjie Setiawan Wicaksono
//
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php

import * as firebase from 'firebase';
import {
	action,
	asStructure,
	computed,
	observable
} from 'mobx';

export interface FirebaseConfig {
	apiKey: string;
	authDomain: string;
	databaseURL?: string;
	storageBucket?: string;
	messagingSenderId?: string;
}

export interface IFirebaseController {
	readonly app: firebase.app.App | null;
	readonly authError: firebase.auth.Error | null;
	readonly isInitialized: boolean;
	readonly user: firebase.User | null;
	readonly isLoggedIn: boolean;

	initialize(): void;
}

export class FirebaseController implements IFirebaseController {
	@observable user: firebase.User | null = asStructure(null);
	@observable authError: firebase.auth.Error | null = asStructure(null);
	@observable isInitialized = false;

	@computed get isLoggedIn(): boolean {
		return this.user != null;
	}

	app: firebase.app.App | null = null;

	initialize = action('Firebase:initializeApp', () => {
		if (this.app == null) {
			this.app = firebase.initializeApp(this.config);
			this.isInitialized = true;
			this.authObserver = this.app.auth()
				.onAuthStateChanged(this.onAuthStateChanged, this.onAuthStateError);
		}
	})

	private authObserver: any = null;

	private onAuthStateChanged = action('Firebase:authStateChanged', (user: firebase.User | null) => {
		this.user = user;
	});

	private onAuthStateError = action('Firebase:authStateError', (error: firebase.auth.Error) => {
		this.authError = error;
	})

	constructor(private config: FirebaseConfig) {
	}
}

const firebaseController = new FirebaseController({
	apiKey: process.env.FIREBASE_API_KEY,
	authDomain: process.env.FIREBAE_AUTH_DOMAIN
});
firebaseController.initialize();

export { firebaseController };
