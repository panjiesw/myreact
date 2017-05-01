/**
 * Copyright (c) 2017 Panjie Setiawan Wicaksono <panjie@panjiesw.com>
 *
 * This software is released under the MIT License.
 * https://panjiesw.mit-license.org
 */

import 'babel-polyfill';
import 'antd/lib/style/index.less';
import './style/common.less';
import * as React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import MyReact from './components/MyReact';

const doRender = (Component: React.ComponentClass<any>) => {
	ReactDOM.render(
		(
			<AppContainer>
				<Component />
			</AppContainer>
		), document.getElementById('my-react'));
};

// loaders.polyfill().then(() => doRender(MyReact));

doRender(MyReact);

if (module.hot) {
	module.hot.accept('./components/MyReact', () => doRender(MyReact));
}
