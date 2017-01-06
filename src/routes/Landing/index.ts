// Copyright (c) 2016 Panjie Setiawan Wicaksono
//
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php

import { PlainRoute } from 'react-router';
import { rootStore } from '../../components/Root';

const landingRoute: PlainRoute = {
	path: '/',
	onEnter: rootStore.onRouteEnter(),
	getComponent(_, cb) {
		require.ensure([], () => {
			cb(null, require<any>('./components/Wrapper').default);
		}, 'pages.landing');
	}
}

export default landingRoute;
