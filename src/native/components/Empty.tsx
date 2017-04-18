/**
 * Copyright (c) 2017 Panjie Setiawan Wicaksono <panjie@panjiesw.com>
 *
 * This software is released under the MIT License.
 * https://panjiesw.mit-license.org
 */

import React, { Component, PropTypes } from 'react';
import { RouteComponentProps } from 'react-router-native';
import { inject, observer } from 'mobx-react';
import { Content } from 'native-base';
import { IAuthStore } from 'common/stores/auth';
import Base from 'native/containers/Base';

export interface IEmptyProps extends RouteComponentProps<any> {
	authStore: IAuthStore;
}

class Empty extends Component<IEmptyProps, void> {
	public static displayName = 'EmptyRaw';
	public static propTypes = {
		authStore: PropTypes.object.isRequired,
	};

	private authWatcher: () => any;

	public componentDidMount() {
		const { authStore, history } = this.props;
		this.authWatcher = authStore.registerAuthStateListener((user: firebase.User | null) => {
			if (user === null) {
				history.replace('/login', { from: '/main' });
			} else {
				history.replace('/main');
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
			<Base noDrawer title="My React">
				<Content padder/>
			</Base>
		);
	}
}

const empty = inject<IEmptyProps>('authStore')(observer<IEmptyProps>(Empty));
empty.displayName = 'Empty';

export { Empty as EmptyRaw };
export default empty;
