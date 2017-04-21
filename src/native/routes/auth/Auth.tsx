/**
 * Copyright (c) 2017 Panjie Setiawan Wicaksono <panjie@panjiesw.com>
 *
 * This software is released under the MIT License.
 * https://panjiesw.mit-license.org
 */

import React, { Component } from 'react';
import { Dimensions, NativeModules, View } from 'react-native';
import { Route, RouteComponentProps } from 'react-router-native';
import { Container, Content } from 'native-base';
import { observer } from 'mobx-react/native';
import AdaptiveStatusBar from 'native/components/AdaptiveStatusBar';
import Signin from './Signin';
import Signup from './Signup';
import styles from './styles';

const { StatusBarManager } = NativeModules;
const deviceHeight = Dimensions.get('window').height;

class Auth extends Component<RouteComponentProps<any>, void> {
	public static displayName = 'AuthRaw';

	public render(): JSX.Element | null {
		const { match } = this.props;
		return (
			<Container
				style={{
					flex: 1,
					flexDirection: 'column',
					justifyContent: 'center', height: deviceHeight - StatusBarManager.HEIGHT, marginTop: StatusBarManager.HEIGHT,
				}}>
				<AdaptiveStatusBar colorBehindStatusBar="#0D82E7" />
				<Content
					contentContainerStyle={{
						flex: 1,
						flexDirection: 'column',
						justifyContent: 'center',
						backgroundColor: 'rgb(98, 176, 246)',
					}}>
					<View style={styles.spacer} />
					<Route exact strict path={`${match.url}/signin`} component={Signin} />
					<Route exact strict path={`${match.url}/signup`} component={Signup} />
					<View style={styles.spacer} />
				</Content>
			</Container>
		);
	}
}

const auth = observer(Auth);
auth.displayName = 'Auth';

export { Auth as AuthRaw };
export default auth;
