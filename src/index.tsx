// Copyright (c) 2016 Panjie Setiawan Wicaksono
//
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php

import * as React from 'react';
import { render } from 'react-dom';
import { Router, PlainRoute, useRouterHistory } from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import App from './components/App';

console.log('Using react version', React.version);

const browserHistory = useRouterHistory(createBrowserHistory)({basename: '/'})

const rootRoute: PlainRoute = {
	childRoutes: [{
		path: '/',
		component: App
	}]
}

render((
	<Router
		history={browserHistory}
		routes={rootRoute} />
), document.getElementById('app'))
