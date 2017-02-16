// Copyright (c) 2017 Panjie Setiawan Wicaksono
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import React, { PureComponent, ComponentState, ComponentClass } from 'react';
import { InjectedRouter, RouteComponentProps, withRouter } from 'react-router';
import { when } from 'mobx';
import { inject, observer } from 'mobx-react';
import NavigationDrawer from 'react-md/lib/NavigationDrawers';
import Button from 'react-md/lib/Buttons/Button';
import { IRootStore } from 'components/Root';
import { IFirebaseStore } from 'stores/firebase';

export type AppProps = {
	firebaseStore: IFirebaseStore;
	rootStore: IRootStore;
	router: InjectedRouter;
} & RouteComponentProps<{}, {}>;

export class AppRaw extends PureComponent<AppProps, ComponentState> {
	public componentDidMount() {
		const { rootStore, firebaseStore } = this.props;
		when(
			'Auth:watching user login state',
			() => firebaseStore.userObservable.current === null,
			() => this.goToAuth());

		rootStore.entered('app');
	}

	public render(): JSX.Element {
		// const {children} = this.props;
		return (
			<NavigationDrawer>
				<Button primary raised label='Logout' onClick={this.logout}></Button>
			</NavigationDrawer>
		);
	}

	private logout = () => {
		const { firebaseStore } = this.props;
		firebaseStore.app.auth().signOut();
	}

	private goToAuth = () => {
		const { router, location } = this.props;
		if (location) {
			router.replace({
				pathname: '/auth',
				state: {
					inpage: 'auth',
					nextPage: location.pathname,
				},
			});
		}
	}
}

const App: ComponentClass<Partial<AppProps>> =
	inject('rootStore', 'firebaseStore')(withRouter(observer(AppRaw)));
App.displayName = 'App';

export default App;
