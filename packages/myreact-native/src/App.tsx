// Copyright (c) 2017 Panjie Setiawan Wicaksono
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import React, { Component } from 'react';
import { View } from 'react-native';
import { NativeRouter, Route, Switch } from 'react-router-native';
import { Provider } from 'mobx-react';
import ProtectedRoute from 'myreact/lib/components/ProtectedRoute/native';
import Login from './routes/auth/Login';
import fb from './utils/firebase';
import stores from './stores';

class Dashboard extends Component<any, any> {
	public render(): JSX.Element | null {
		return (
			<View>
				Hello
			</View>
		);
	}
}

class App extends Component<any, any> {
	public render(): JSX.Element | null {
		return (
			<Provider {...stores} fb={fb}>
				<NativeRouter>
					<Switch>
						<Route exact strict path="/login" component={Login} />
						<ProtectedRoute exact path="/" component={Dashboard} />
					</Switch>
				</NativeRouter>
			</Provider>
		);
	}
}

export default App;
