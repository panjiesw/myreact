// Copyright (c) 2017 Panjie Setiawan Wicaksono
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import React, { PureComponent, ComponentClass, ComponentState } from 'react';
import { InjectedRouter, RouteComponentProps, withRouter } from 'react-router';
import { observer, inject } from 'mobx-react';
import { when } from 'mobx';
import DevTools from 'mobx-react-devtools';
import Flexbox from 'flexbox-react';
import { IRootStore } from 'components/Root';
import { IAuthUIStore } from './store';
import './auth.scss';

export type AuthProps = {
	authUIStore: IAuthUIStore;
	rootStore: IRootStore;
	router: InjectedRouter;
} & RouteComponentProps<{}, {}>;

export class AuthRaw extends PureComponent<AuthProps, ComponentState> {

	public componentWillMount() {
		const {rootStore} = this.props;
		if (rootStore.adjustRootLayout) {
			rootStore.adjustRootLayout({ flexDirection: 'row' });
		}
	}

	public componentDidMount() {
		this.startUI();
		const { authUIStore, rootStore } = this.props;

		when(
			'Auth:watching user login state',
			() => authUIStore.isLoggedIn,
			() => this.goToDashboard());

		rootStore.entered('auth');
	}

	public render(): JSX.Element | null {
		let devtools: any;
		if (process.env.NODE_ENV !== 'production') {
			devtools = <DevTools />;
		} else {
			devtools = null;
		}
		return (
			<Flexbox width='100%'
				flexWrap='nowrap' flexDirection='column'
				alignItems='center' justifyContent='center' >
				<div id='fuiContainer'></div>
				{devtools}
			</Flexbox>
		);
	}

	private startUI() {
		const { authUIStore } = this.props;
		setTimeout(() => authUIStore.startUI('#fuiContainer'), 500);
	}

	private goToDashboard() {
		const { router, location } = this.props;
		let nextPage = '/app';
		if (location && location.state && (location.state as any).nextPage) {
			nextPage = (location.state as any).nextPage;
		}
		if (router) {
			router.replace({
				pathname: nextPage,
				state: {
					inpage: 'app',
				},
			});
		}
	}
}

const Auth: ComponentClass<Partial<AuthProps>> =
	inject('authUIStore', 'rootStore')(withRouter(observer(AuthRaw)));
Auth.displayName = 'Auth';

export default Auth;
