// Copyright (c) 2017 Panjie Setiawan Wicaksono
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import React, { Component } from 'react';
// import { View, Text } from 'react-native';
import { NativeRouter, Route, Switch } from 'react-router-native';
import { Provider } from 'mobx-react';
// import ProtectedRoute from './components/NativeProtectedRoute';
import Login from './routes/auth/Login';
import fb from './utils/firebase';
import stores from './stores';

class App extends Component<any, any> {
	public render(): JSX.Element | null {
		return (
			<Provider {...stores} fb={fb}>
				<NativeRouter>
					<Switch>
						<Route exact strict path="/login" component={Login} />
					</Switch>
				</NativeRouter>
			</Provider>
		);
	}
}

export default App;
