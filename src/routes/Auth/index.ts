// Copyright (c) 2017 Panjie Setiawan Wicaksono
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { PlainRoute } from 'react-router';
import { IAuthStore } from 'stores/auth';
import { rootStore } from 'components/Root';
import { loadFirebase } from 'loaders/firebase';
import { loadFirebaseUI } from 'loaders/firebaseui';

const authRoutes: PlainRoute = {
	path: 'auth',
	onEnter: rootStore.onRouteEnter((nexState, replace, cb) => {
		require.ensure([], () => {
			loadFirebase().then(() => {
				const authStore: IAuthStore = require<any>('stores/auth').authStore;
				authStore.shouldEnter(nexState, replace, cb);
			});
		}, 'ctrl.auth');
	}),
	getComponent(_, cb) {
		require.ensure([], () => {
			loadFirebaseUI().then(() => {
				cb(null, require<any>('./components/Wrapper').default);
			});
		}, 'pages.auth')
	}
}

export default authRoutes;
