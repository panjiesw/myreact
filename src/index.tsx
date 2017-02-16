// Copyright (c) 2017 Panjie Setiawan Wicaksono
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import * as React from 'react';

import { render } from 'react-dom';
import { Router, PlainRoute, useRouterHistory } from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import { getPolyfill } from './util/loaders/polyfills';
import { Root } from './components/Root';
import landingRoute from './routes/Landing';
import authRoutes from './routes/Auth';
import appRoutes from './routes/App';

const browserHistory = useRouterHistory(createBrowserHistory)({ basename: '/' });

const rootRoute: PlainRoute = {
	childRoutes: [
		landingRoute,
		authRoutes,
		appRoutes,
	],
};

getPolyfill(() => {
	render((
		<Root>
			<Router
				history={browserHistory}
				routes={rootRoute} />
		</Root>
	), document.getElementById('app'));
});
