// Copyright (c) 2016 Panjie Setiawan Wicaksono
//
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php

/* tslint:disable */
import * as React from 'react';
/* tslint:enable */
import { render } from 'react-dom';
import { Router, PlainRoute, useRouterHistory } from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import { getPolyfill } from './loaders/polyfill';
import { Root } from './components/Root';
import landingRoute from './routes/Landing';
import authRoutes from './routes/Auth';
import appRoutes from './routes/App';

const browserHistory = useRouterHistory(createBrowserHistory)({ basename: '/' })

const rootRoute: PlainRoute = {
	childRoutes: [
		landingRoute,
		authRoutes,
		appRoutes
	]
}

getPolyfill(() => {
	render((
		<Root>
			<Router
				history={browserHistory}
				routes={rootRoute} />
		</Root>
	), document.getElementById('app'))
})
