// Copyright (c) 2017 Panjie Setiawan Wicaksono
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import * as React from 'react';
import { InjectedRouter, RouteComponentProps, withRouter } from 'react-router';
import { inject, observer } from 'mobx-react';
import { when } from 'mobx';
import { Layout, NavDrawer, Panel } from 'react-toolbox/lib/layout';
import { AppBar } from 'react-toolbox/lib/app_bar';
import { Button } from 'react-toolbox/lib/button';
import { IRootStore } from 'components/Root';
import { IFirebaseStore } from 'stores/firebase';
import * as theme from './theme.css';

export interface AppProps extends RouteComponentProps<{}, {}> {
	firebaseStore?: IFirebaseStore;
	rootStore?: IRootStore;
	router?: InjectedRouter;
}

const factory: () => React.ComponentClass<AppProps> = () =>
	class App extends React.PureComponent<AppProps, {}> {

		logout = () => {
			const { firebaseStore } = this.props;
			if (firebaseStore && firebaseStore.app) {
				firebaseStore.app.auth().signOut();
			}
		}

		goToAuth = () => {
			const { router, location } = this.props;
			if (router && location)
				router.replace({
					pathname: '/auth',
					state: {
						inpage: 'auth',
						nextPage: location.pathname
					}
				})
		}

		constructor(props?: AppProps, context?: any) {
			super(props, context);
		}

		componentDidMount() {
			const { rootStore, firebaseStore } = this.props;

			when(
				'Auth:watching user login state',
				() => firebaseStore != null && !firebaseStore.isLoggedIn,
				() => this.goToAuth())

			if (rootStore) {
				rootStore.entered('app');
			}
		}

		render(): JSX.Element | null {
			// return (
			// 	<Flexbox flexWrap='nowrap' flexDirection='column'
			// 		alignItems='center' justifyContent='center' >
			// 		<Button primary raised onClick={this.logout}>Logout</Button>
			// 	</Flexbox>
			// )
			return (
				<Layout theme={theme}>
					<NavDrawer
						active
						clipped
						permanentAt='md' >
						<p>I'm a NavDrawer content.</p>
					</NavDrawer>

					<AppBar
						theme={theme}
						fixed
						rightIcon='more_vert'
						leftIcon='menu'
						title='MyReact Dashboard' />

					<Panel bodyScroll={false}>
						<section style={{ margin: '1.8rem'}}>
							<Button primary raised onClick={this.logout}>Logout</Button>
						</section>
					</Panel>
				</Layout>
			)
		}
	}

const AppRaw = withRouter(factory());
AppRaw.displayName = 'AppRaw';

const App = withRouter(inject('firebaseStore', 'rootStore')(observer(factory())));
App.displayName = 'App';

export { AppRaw as Auth, factory as appFactory };
export default App;
