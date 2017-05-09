/**
 * Copyright (c) 2017 Panjie Setiawan Wicaksono <panjie@panjiesw.com>
 *
 * This software is released under the MIT License.
 * https://panjiesw.mit-license.org
 */

import * as firebase from 'firebase';
import TodoStore from 'common/stores/todo';

let COUNTER = 0;

export function firebaseApp(): firebase.app.App {
	return firebase.initializeApp({
		databaseURL: 'ws://localhost.firebaseio.test:5000',
	}, `myreac-test-${++COUNTER}`);
}

export function authStoreObj(): any {
	return {
		user: {
			uid: 'testuser',
		},
	};
}

export function todoStore() {
	const authStore = authStoreObj();
	const app = firebaseApp();
	return {
		app,
		authStore,
		todoStore: new TodoStore(app, authStore),
	};
}
