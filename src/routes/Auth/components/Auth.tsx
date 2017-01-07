// Copyright (c) 2017 Panjie Setiawan Wicaksono
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import * as React from 'react';
import { InjectedRouter, RouteComponentProps, withRouter } from 'react-router';
import { observer, inject } from 'mobx-react';
import { when } from 'mobx';
import Flexbox from 'flexbox-react';
import { IRootStore } from 'components/Root';
import { IAuthUIStore } from './store';
import './theme.css';

export interface AuthProps extends RouteComponentProps<{}, {}> {
	authUIStore?: IAuthUIStore;
	rootStore?: IRootStore;
	router?: InjectedRouter;
}

const factory: () => React.ComponentClass<AuthProps> = () =>
	class Auth extends React.PureComponent<AuthProps, {}> {
		ui: firebaseui.auth.AuthUI;

		startUI = () => {
			const { authUIStore } = this.props;
			if (authUIStore) {
				setTimeout(() => authUIStore.startUI('#fuiContainer'), 500);
			}
		}

		goToDashboard = () => {
			const { router, location } = this.props;
			let nextPage = '/app'
			if (location && location.state && (location.state as any).nextPage) {
				nextPage = (location.state as any).nextPage
			}
			if (router)
				router.replace({
					pathname: nextPage,
					state: {
						inpage: 'app'
					}
				})
		}

		constructor(props?: AuthProps, context?: any) {
			super(props, context);
		}

		componentDidMount() {
			this.startUI();
			const { authUIStore, rootStore } = this.props;

			if (authUIStore) {
				when(
					'Auth:watching user login state',
					() => authUIStore.isLoggedIn,
					() => this.goToDashboard())
			}

			if (rootStore) {
				rootStore.entered('auth');
			}
		}

		render(): JSX.Element | null {
			return (
				<Flexbox width='100%'
					flexWrap='nowrap' flexDirection='column'
					alignItems='center' justifyContent='center' >
					<div id='fuiContainer'></div>
				</Flexbox>
			)
		}
	}

const AuthRaw = withRouter(factory());
AuthRaw.displayName = 'AuthRaw';

const Auth = withRouter(inject('authUIStore', 'rootStore')(observer(factory())));
Auth.displayName = 'Auth';

export { AuthRaw as Auth, factory as authFactory };
export default Auth;
