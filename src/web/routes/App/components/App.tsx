/**
 * Copyright (c) 2017 Panjie Setiawan Wicaksono <panjie@panjiesw.com>
 *
 * This software is released under the MIT License.
 * https://panjiesw.mit-license.org
 */

import React, { Component } from 'react';
import { Route, RouteComponentProps, withRouter } from 'react-router-dom';
import { when } from 'mobx';
import { inject, observer } from 'mobx-react';
import { Layout } from 'antd';
import { IAuthStore } from 'common/stores/auth';
import Header from './Header';
import DevTool from 'web/components/DevTool';
import Dashboard from '../routes/Dashboard';

const { Content } = Layout;

export interface IAppProps extends RouteComponentProps<any> {
	authStore: IAuthStore;
}

class App extends Component<IAppProps, void> {

	public componentDidMount() {
		const { authStore } = this.props;
		when(
			'signed out',
			() => !authStore.isLoggedIn,
			() => this.goToAuth(),
			this,
		);
	}

	public render(): JSX.Element | null {
		const { match, history } = this.props;
		return (
			<Layout className="my-app">
				<DevTool />
				<Header history={history} />
				<Content style={{ padding: '0 50px' }}>
					<Route strict exact path={match.url} component={Dashboard} />
				</Content>
			</Layout>
		);
	}

	private goToAuth() {
		const { history, location } = this.props;
		history.replace('/auth/signin', { from: location });
	}
}

export { App as AppRaw };
export default inject('authStore')(withRouter(observer(App)));
