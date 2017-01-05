// Copyright (c) 2017 Panjie Setiawan Wicaksono
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { PlainRoute } from 'react-router';
import { IAuthController } from '../../controllers/auth';
import { rootController } from '../../components/Root';
import { loadFirebase } from '../../loaders/firebase';
import { loadFirebaseUI } from '../../loaders/firebaseui';

const authRoutes: PlainRoute = {
	path: 'auth',
	onEnter: rootController.onRouteEnter((nexState, replace, cb) => {
		require.ensure([], () => {
			loadFirebase().then(() => {
				const authController: IAuthController = require<any>('../../controllers/auth').authController;
				authController.onEnterAuthRoute(nexState, replace, cb);
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
