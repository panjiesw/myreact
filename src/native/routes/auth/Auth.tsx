/**
 * Copyright (c) 2017 Panjie Setiawan Wicaksono <panjie@panjiesw.com>
 *
 * This software is released under the MIT License.
 * https://panjiesw.mit-license.org
 */

import React, { Component } from 'react';
import { View } from 'react-native';
import { Route, RouteComponentProps } from 'react-router-native';
import { Container, Content } from 'native-base';
import { observer } from 'mobx-react/native';
import AdaptiveStatusBar from 'native/components/AdaptiveStatusBar';
import Login from './Login';
import styles from './styles';

class Auth extends Component<RouteComponentProps<any>, void> {
	public static displayName = 'AuthRaw';

	public render(): JSX.Element | null {
		const { match } = this.props;
		return (
			<Container style={{ flex: 1, flexDirection: 'column', justifyContent: 'center' }}>
				<AdaptiveStatusBar colorBehindStatusBar="rgb(255,255,255)" />
				<Content padder contentContainerStyle={{ flex: 1, flexDirection: 'column', justifyContent: 'center' }}>
					<View style={styles.spacer} />
					<Route exact strict path={`${match.url}/login`} component={Login} />
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
