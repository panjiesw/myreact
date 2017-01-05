// Copyright (c) 2017 Panjie Setiawan Wicaksono
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { PlainRoute } from 'react-router';
import { rootController } from '../../components/Root';

const authRoutes: PlainRoute = {
	onEnter: rootController.onRouteEnter(),
	path: 'app',
	getComponent(_, cb) {
		require.ensure([], () => {
			cb(null, require<any>('./components/App').default);
		}, 'pages.app')
	}
}

export default authRoutes;
