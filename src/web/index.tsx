/**
 * Copyright (c) 2017 Panjie Setiawan Wicaksono <panjie@panjiesw.com>
 *
 * This software is released under the MIT License.
 * https://panjiesw.mit-license.org
 */

import * as React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import App from './components/App';

const doRender = (Component: React.ComponentClass<any>) => {
	ReactDOM.render(
		(
			<AppContainer>
				<Component />
			</AppContainer>
		), document.getElementById('app'));
};

doRender(App);

if (module.hot) {
	module.hot.accept('./components/App', () => doRender(App));
}
