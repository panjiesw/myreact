/**
 * Copyright (c) 2017 Panjie Setiawan Wicaksono <panjie@panjiesw.com>
 *
 * This software is released under the MIT License.
 * https://panjiesw.mit-license.org
 */

import React, { Component } from 'react';
import { Route, RouteComponentProps, withRouter } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import { Layout } from 'antd';
import { IAuthStore } from 'common/stores/auth';
import Dashboard from '../routes/Dashboard';

export interface IAppProps extends RouteComponentProps<any> {
	authStore: IAuthStore;
}

class App extends Component<IAppProps, void> {
	public render(): JSX.Element | null {
		const { match } = this.props;
		return (
			<Layout className="my-app">
				<Route strict exact path={match.url} component={Dashboard} />
			</Layout>
		);
	}
}

export { App as AppRaw };
export default inject('authStore')(withRouter(observer(App)));
