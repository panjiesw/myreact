/**
 * Copyright (c) 2017 Panjie Setiawan Wicaksono <panjie@panjiesw.com>
 *
 * This software is released under the MIT License.
 * https://panjiesw.mit-license.org
 */

import * as firebase from 'firebase';
import FirebaseServer from 'firebase-server';
import db from 'common/fbdbmock';
import TodoStore from 'common/stores/todo';

let COUNTER = 0;

export function firebaseServer(): {port: number; server: FirebaseServer.FirebaseServerClass} {
	const id = COUNTER++;
	const port = 5000 + id;
	return {
		port,
		server: new FirebaseServer(port, `localhost.firebaseio${id}.test`, db),
	};
}

export function firebaseApp(port: number): firebase.app.App {
	return firebase.initializeApp({
		databaseURL: `ws://localhost.firebaseio.test:${port}`,
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
	const {port, server} = firebaseServer();
	const authStore = authStoreObj();
	const app = firebaseApp(port);
	return {
		app,
		authStore,
		firebaseServer: server,
		todoStore: new TodoStore(app, authStore),
	};
}

export function closeFirebaseServer(server: FirebaseServer.FirebaseServerClass) {
	server.close();
}
