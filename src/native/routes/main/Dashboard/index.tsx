// Copyright (c) 2017 Panjie Setiawan Wicaksono
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import React, { Component, PropTypes } from 'react';
import { RouteComponentProps } from 'react-router-native';
import { inject, observer } from 'mobx-react/native';
import { Button, Content, Text } from 'native-base';
import { IAuthStore } from 'common/stores/auth';
import Base from 'native/containers/Base';

export interface IDashboardProps extends RouteComponentProps<any> {
	authStore: IAuthStore;
}

class Dashboard extends Component<IDashboardProps, void> {
	public static displayName = 'DashboardRaw';
	public static propTypes = {
		authStore: PropTypes.object.isRequired,
	};

	private authWatcher: () => any;

	public componentDidMount() {
		const { authStore, history, location } = this.props;
		this.authWatcher = authStore.registerAuthStateListener((user: firebase.User | null) => {
			if (user === null) {
				history.replace('/login', { from: location });
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
			<Base title="Dashboard">
				<Content padder>
					<Text>Dashboard</Text>
					<Button onPress={this.onPress}>
						<Text>Logout</Text>
					</Button>
				</Content>
			</Base>
		);
	}

	private onPress = () => {
		const { authStore } = this.props;
		authStore.logout();
	}
}

const dashboard = inject<IDashboardProps>('authStore')(observer<IDashboardProps>(Dashboard));
dashboard.displayName = 'Dashboard';

export { Dashboard as DashboardRaw };
export default dashboard;
