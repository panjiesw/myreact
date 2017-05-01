/**
 * Copyright (c) 2017 Panjie Setiawan Wicaksono <panjie@panjiesw.com>
 *
 * This software is released under the MIT License.
 * https://panjiesw.mit-license.org
 */

import React, { Component } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import { Button } from 'antd';
import { IAuthStore } from 'common/stores/auth';

export interface IDashboardProps extends RouteComponentProps<any> {
	authStore: IAuthStore;
}

class Dashboard extends Component<IDashboardProps, void> {
	public render(): JSX.Element | null {
		return (
			<Button onClick={this.onClick}>
				Sign Out
			</Button>
		);
	}

	private onClick = () => {
		const { authStore } = this.props;
		authStore.signOut();
	}
}

export { Dashboard as DashboardRaw };
export default inject('authStore')(observer(Dashboard));
