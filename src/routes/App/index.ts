// Copyright (c) 2017 Panjie Setiawan Wicaksono
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { PlainRoute } from 'react-router';
import { IAuthStore } from 'stores/auth';
import { rootStore } from 'components/Root';
import { loadFirebase } from 'loaders/firebase';

const appRoutes: PlainRoute = {
	path: 'app',
	onEnter: rootStore.onRouteEnter((nexState, replace, cb) => {
		require.ensure([], () => {
			loadFirebase().then(() => {
				const authStore: IAuthStore = require<any>('stores/auth').authStore;
				authStore.onEnterAuthRoute(nexState, replace, cb);
			});
		}, 'ctrl.auth');
	}),
	getComponent(_, cb) {
		require.ensure([], () => {
			cb(null, require<any>('./components/Wrapper').default);
		}, 'pages.app')
	}
}

export default appRoutes;
