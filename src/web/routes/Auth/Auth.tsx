/**
 * Copyright (c) 2017 Panjie Setiawan Wicaksono <panjie@panjiesw.com>
 *
 * This software is released under the MIT License.
 * https://panjiesw.mit-license.org
 */

import React, { Component } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import { Row, Col } from 'antd';
import { IAuthStore } from 'common/stores/auth';

export interface IAuthProps extends RouteComponentProps<any> {
	authStore: IAuthStore;
}

class Auth extends Component<IAuthProps, void> {
	public render(): JSX.Element | null {
		return (
			<Row className="my-auth" type="flex" justify="center" align="middle">
				<Col span={8}>
					<h1>Auth</h1>
				</Col>
			</Row>
		);
	}
}

export { Auth as AuthRaw };

export default inject<IAuthProps>('authStore')(observer(Auth));
