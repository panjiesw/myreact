// Copyright (c) 2017 Panjie Setiawan Wicaksono
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import * as React from 'react';
import { InjectedRouter, RouteComponentProps, withRouter } from 'react-router';
import { observer, inject } from 'mobx-react';
import { when } from 'mobx';
import Flexbox from 'flexbox-react';
import * as firebase from 'firebase';
import * as firebaseui from 'firebaseui';
import { IRootController } from '../../../components/Root';
import { IFirebaseController } from '../../../controllers/firebase';
import './theme.css';

export interface AuthProps extends RouteComponentProps<{}, {}> {
	firebaseController?: IFirebaseController;
	rootController?: IRootController;
	router?: InjectedRouter;
}

const factory: () => React.ComponentClass<AuthProps> = () =>
	class Auth extends React.PureComponent<AuthProps, {}> {
		ui: firebaseui.auth.AuthUI;

		startUI = () => {
			const { firebaseController } = this.props;
			if (firebaseController && firebaseController.app) {
				this.ui = new firebaseui.auth.AuthUI(firebaseController.app.auth());
				setTimeout(() => {
					this.ui.start('#fuiContainer', {
						callbacks: {
							signInSuccess(_) {
								return false;
							}
						},
						signInFlow: 'popup',
						signInOptions: [
							firebase.auth.EmailAuthProvider.PROVIDER_ID,
							firebase.auth.GithubAuthProvider.PROVIDER_ID
						],
						tosUrl: ''
					})
				}, 500);
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
			const { firebaseController, rootController } = this.props;
			if (rootController) {
				rootController.entered('auth');
			}

			when(
				'Auth:waiting firebase init',
				() => firebaseController !== undefined && firebaseController.isInitialized,
				() => this.startUI());

			when(
				'Auth:watching user login state',
				() => firebaseController !== undefined && firebaseController.isLoggedIn,
				() => this.goToDashboard())
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

const Auth = withRouter(inject('firebaseController', 'rootController')(observer(factory())));
Auth.displayName = 'Auth';

export { AuthRaw as Auth, factory as authFactory };
export default Auth;
