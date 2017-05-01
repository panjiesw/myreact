/**
 * Copyright (c) 2017 Panjie Setiawan Wicaksono <panjie@panjiesw.com>
 *
 * This software is released under the MIT License.
 * https://panjiesw.mit-license.org
 */

import React, { Component } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Button } from 'antd';

class Home extends Component<RouteComponentProps<any>, void> {
	public render(): JSX.Element | null {
		return (
			<Button type="primary" onClick={this.onClick}>App</Button>
		);
	}

	private onClick = () => {
		const { history } = this.props;
		history.push('/app');
	}
}

export default Home;
