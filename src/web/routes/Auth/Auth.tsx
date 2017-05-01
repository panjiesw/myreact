/**
 * Copyright (c) 2017 Panjie Setiawan Wicaksono <panjie@panjiesw.com>
 *
 * This software is released under the MIT License.
 * https://panjiesw.mit-license.org
 */

import React, { Component } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import { Row, Col } from 'antd';
import { IAuthStore } from 'common/stores/auth';
import { IAuthUIStore } from 'web/stores/authUI';

export interface IAuthProps extends RouteComponentProps<any> {
	authStore: IAuthStore;
	authUIStore: IAuthUIStore;
}

class Auth extends Component<IAuthProps, void> {
	private authWatcher: () => any;

	public componentDidMount() {
		this.startFirebaseUI();
		const { authStore, history, location } = this.props;
		this.authWatcher = authStore.registerAuthStateListener((user) => {
			if (user !== null) {
				history.replace(
					location.state && location.state.from ?
						location.state.from : '/app');
			}
		});
	}

	public componentWillUnmount() {
		if (this.authWatcher) {
			this.authWatcher();
		}
	}

	public render(): JSX.Element | null {
		return (
			<Row className="my-auth" type="flex" justify="center" align="middle">
				<Col span={8}>
					<div id="fuiContainer" />
				</Col>
			</Row>
		);
	}

	private startFirebaseUI() {
		const {authUIStore} = this.props;
		authUIStore.startFirebaseUI('#fuiContainer');
	}
}

export { Auth as AuthRaw };

export default inject<IAuthProps>(
	'authStore',
	'authUIStore',
)(withRouter(observer(Auth)));
