/**
 * Copyright (c) 2017 Panjie Setiawan Wicaksono <panjie@panjiesw.com>
 *
 * This software is released under the MIT License.
 * https://panjiesw.mit-license.org
 */

import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'mobx-react';
import { useStrict } from 'mobx';
import Home from 'web/routes/main/Home';
// import ProtectedRoute from './WebProtectedRoute';

useStrict(true);

class App extends Component<any, any> {
	public render(): JSX.Element | null {
		return (
			<Provider>
				<BrowserRouter>
					<Switch>
						<Route strict path="/" component={Home} />
					</Switch>
				</BrowserRouter>
			</Provider>
		);
	}
}

export default App;
