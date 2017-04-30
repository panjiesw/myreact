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
import stores from 'web/stores';
import Home from 'web/routes/Home';
import Auth from 'web/routes/Auth';
import Dashboard from 'web/routes/App/Dashboard';
import ProtectedRoute from './WebProtectedRoute';

useStrict(true);

class MyReact extends Component<any, any> {
	public render(): JSX.Element | null {
		return (
			<Provider {...stores}>
				<BrowserRouter>
					<Switch>
						<Route strict exact path="/" component={Home} />
						<Route strict exact path="/auth/signin" component={Auth} />
						<ProtectedRoute strict path="/app" component={Dashboard} />
					</Switch>
				</BrowserRouter>
			</Provider>
		);
	}
}

export default MyReact;
