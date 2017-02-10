// Copyright (c) 2017 Panjie Setiawan Wicaksono
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { PlainRoute } from 'react-router';
import { rootStore } from '../../components/Root';

const landingRoute: PlainRoute = {
	path: '/',
	onEnter: rootStore.onRouteEnter(),
	getComponent(_, cb) {
		require.ensure([], () => {
			cb(null, require<any>('./components/Wrapper').default);
		}, 'pages.landing');
	},
};

export default landingRoute;
