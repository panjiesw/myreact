// Copyright (c) 2017 Panjie Setiawan Wicaksono
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import React, { Component, ComponentClass, PropTypes } from 'react';
import {
	Dimensions,
	NativeModules,
	StatusBar,
} from 'react-native';
import { RouteComponentProps, withRouter } from 'react-router-native';
import {
	Container,
	Header,
	Left,
	Right,
	Body,
	Title,
	Button,
	Icon,
	Drawer,
} from 'native-base';
import { observer } from 'mobx-react/native';

const { StatusBarManager } = NativeModules;
const deviceHeight = Dimensions.get('window').height;

export interface IBaseProps extends RouteComponentProps<any> {
	title: string;
	noDrawer?: boolean;
}

export interface IPBaseProps {
	title: string;
	noDrawer?: boolean;
}

export interface IBaseState {
	drawer: boolean;
}

class BaseContainer extends Component<IBaseProps, IBaseState> {
	public static displayName = 'BaseRaw';
	public static propTypes = {
		children: PropTypes.node.isRequired,
	};

	public state: IBaseState = {
		drawer: false,
	};

	public render(): JSX.Element | null {
		const { children, noDrawer, title } = this.props;
		const { drawer } = this.state;
		return (
			<Drawer open={drawer} onClose={this.handleDrawer(false)}>
				<Container style={{ height: deviceHeight - StatusBarManager.HEIGHT, marginTop: StatusBarManager.HEIGHT }}>
					<StatusBar translucent backgroundColor="rgba(0, 0, 0, .2)" />
					<Header>
						{
							noDrawer ? null : (
								<Left>
									<Button transparent onPress={this.handleDrawer()}>
										<Icon name="menu" />
									</Button>
								</Left>
							)
						}
						<Body>
							<Title>{title}</Title>
						</Body>
						<Right />
					</Header>
					{children}
				</Container>
			</Drawer>
		);
	}

	private handleDrawer = (open = true) => () => {
		this.setState({
			drawer: open,
		});
	}
}

const base: ComponentClass<IPBaseProps> = withRouter(observer(BaseContainer));
base.displayName = 'Base';

export { BaseContainer as BaseRaw };
export default base;
