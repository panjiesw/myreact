/**
 * Copyright (c) 2017 Panjie Setiawan Wicaksono <panjie@panjiesw.com>
 *
 * This software is released under the MIT License.
 * https://panjiesw.mit-license.org
 */
import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { Layout, Menu } from 'antd';
import { History } from 'history';

const { Header: AHeader } = Layout;

export interface IHeaderProps {
	history: History;
}

class Header extends Component<IHeaderProps, void> {
	public render(): JSX.Element | null {
		return (
			<AHeader>
				<div className="logo" />
				<Menu
					theme="dark"
					mode="horizontal"
					defaultSelectedKeys={['1']}
					style={{ lineHeight: '64px' }}
				>
					<Menu.Item key="1">App</Menu.Item>
				</Menu>
			</AHeader>
		);
	}
}

export { Header as HeaderRaw };
export default observer(Header);
