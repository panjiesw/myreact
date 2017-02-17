// Copyright (c) 2017 Panjie Setiawan Wicaksono
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import * as React from 'react';

import { render } from 'react-dom';
import { PlainRoute } from 'react-router';
import { AppContainer } from 'react-hot-loader';
import { getPolyfill } from 'util/loaders/polyfills';
import { Root } from 'components/Root';
import HackyRouter from 'components//HackyRouter';
import landingRoute from 'routes/Landing';
import authRoutes from 'routes/Auth';
import appRoutes from 'routes/App';

const appEl = document.getElementById('app');

const rootRoute: PlainRoute = {
	childRoutes: [
		landingRoute,
		authRoutes,
		appRoutes,
	],
};

let doRender = () => {
	render((
		<AppContainer>
			<Root>
				<HackyRouter
					routes={rootRoute} />
			</Root>
		</AppContainer>
	), appEl);
};

getPolyfill(doRender);

if (module.hot) {
	module.hot.accept();
	doRender();
}
