// Copyright (c) 2016 Panjie Setiawan Wicaksono
//
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php

// import * as react from 'react';
// import * as rd from 'react-dom';
// import * as rr from 'react-router';
// import { PlainRoute } from 'react-router';
// import c from 'history/lib/createBrowserHistory';
// import * as root from './components/Root';

// require.ensure([], () => {
// 	const React = require<typeof react>('react');
// 	const { render } = require<typeof rd>('react-dom');
// 	const { Router, useRouterHistory } = require<typeof rr>('react-router');
// 	const createBrowserHistory = require<typeof c>('history/lib/createBrowserHistory');
// 	const { Root, rootController } = require<typeof root>('./components/Root');

// 	const browserHistory = useRouterHistory(createBrowserHistory)({ basename: '/' })

// 	const rootRoute: PlainRoute = {
// 		childRoutes: [{
// 			path: '/',
// 			component: Root,
// 			indexRoute: {
// 				onEnter: rootController.onRouteEnter(),
// 				getComponent(_, next) {
// 					// System.import('./components/Landing')
// 					// 	.then(mod => next(null, mod.default))
// 					// 	.catch(next);
// 					require.ensure([], (require) => {
// 						next(null, require<any>('./components/Landing').default);
// 					}, 'landing');
// 				}
// 			}
// 		}]
// 	}

// 	render((
// 		<Router
// 			history={browserHistory}
// 			routes={rootRoute} />
// 	), document.getElementById('app'))
// }, 'index')

import * as React from 'react';
import { render } from 'react-dom';
import { Router, PlainRoute, useRouterHistory } from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import { getPolyfill } from './utils/polyfill';
import { Root, rootController } from './components/Root';

const browserHistory = useRouterHistory(createBrowserHistory)({ basename: '/' })

const rootRoute: PlainRoute = {
	childRoutes: [{
		path: '/',
		component: Root,
		indexRoute: {
			onEnter: rootController.onRouteEnter(),
			getComponent(_, next) {
				// System.import('./components/Landing')
				// 	.then(mod => next(null, mod.default))
				// 	.catch(next);
				require.ensure([], (require) => {
					next(null, require<any>('./components/Landing').default);
				}, 'landing');
			}
		}
	}]
}

getPolyfill(() => {
	render((
		<Router
			history={browserHistory}
			routes={rootRoute} />
	), document.getElementById('app'))
})
