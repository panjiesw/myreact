/**
 * Copyright (c) 2017 Panjie Setiawan Wicaksono <panjie@panjiesw.com>
 *
 * This software is released under the MIT License.
 * https://panjiesw.mit-license.org
 */

import React, { Component, ComponentClass, PropTypes } from 'react';
import { Dimensions, NativeModules, StatusBar } from 'react-native';
import { RouteComponentProps } from 'react-router-native';
import { Location } from 'history';
import { Body, Button, Container, Drawer, Header, Icon, Left, Right, Title } from 'native-base';
import { inject, observer } from 'mobx-react/native';
import { IGlobalUIStore } from 'native/stores/ui';

const { StatusBarManager } = NativeModules;
const deviceHeight = Dimensions.get('window').height;

export interface IBaseProps extends RouteComponentProps<any> {
	globalUIStore: IGlobalUIStore;
	noDrawer?: boolean;
}

export interface IPBaseProps {
	location: Location;
	globalUIStore?: IGlobalUIStore;
	noDrawer?: boolean;
}

class BaseContainer extends Component<IBaseProps, void> {
	public static displayName = 'BaseRaw';
	public static propTypes = {
		globalUIStore: PropTypes.object.isRequired,
		children: PropTypes.node.isRequired,
	};

	public render(): JSX.Element | null {
		const { children, noDrawer, globalUIStore } = this.props;
		return (
			<Drawer open={globalUIStore.drawerOpen} onClose={globalUIStore.closeDrawer}>
				<Container style={{ height: deviceHeight - StatusBarManager.HEIGHT, marginTop: StatusBarManager.HEIGHT }}>
					<StatusBar translucent backgroundColor="rgba(0, 0, 0, .2)" />
					<Header>
						{
							noDrawer ? null : (
								<Left>
									<Button transparent onPress={globalUIStore.openDrawer}>
										<Icon name="menu" />
									</Button>
								</Left>
							)
						}
						<Body>
							<Title>{globalUIStore.title}</Title>
						</Body>
						<Right />
					</Header>
					{children}
				</Container>
			</Drawer>
		);
	}
}

const base: ComponentClass<IPBaseProps> = inject('globalUIStore')(observer(BaseContainer));
base.displayName = 'Base';

export { BaseContainer as BaseRaw };
export default base;
