/**
 * Copyright (c) 2017 Panjie Setiawan Wicaksono <panjie@panjiesw.com>
 *
 * This software is released under the MIT License.
 * https://panjiesw.mit-license.org
 */

import React, { Component } from 'react';
import { NativeRouter, Route, Switch } from 'react-router-native';
import { Provider } from 'mobx-react';
import { useStrict } from 'mobx';
import ProtectedRoute from './components/NativeProtectedRoute';
import Auth from './routes/auth/Auth';
import Dashboard from './routes/main/Dashboard';
import Empty from './components/Empty';
import fb from './utils/firebase';
import stores from './stores';

useStrict(true);

class App extends Component<any, any> {
	public render(): JSX.Element | null {
		return (
			<Provider {...stores} fb={fb}>
				<NativeRouter>
					<Switch>
						<Route strict path="/auth" component={Auth} />
						<ProtectedRoute strict path="/main" component={Dashboard} />
						<Route exact path="/" component={Empty} />
					</Switch>
				</NativeRouter>
			</Provider>
		);
	}
}

export default App;
