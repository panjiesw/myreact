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
import { IOAuthStore } from 'native/stores/oauth';
import Base from 'native/containers/Base';

export interface IEmptyProps extends RouteComponentProps<any> {
	authStore: IAuthStore;
	oauthStore: IOAuthStore;
}

class Empty extends Component<IEmptyProps, void> {
	public static displayName = 'EmptyRaw';
	public static propTypes = {
		authStore: PropTypes.object.isRequired,
		oauthStore: PropTypes.object.isRequired,
	};

	private authWatcher: () => any;

	public componentDidMount() {
		const { authStore } = this.props;
		this.authWatcher = authStore.registerAuthStateListener(this.onInitialized);
	}

	public componentWillUnmount() {
		if (this.authWatcher) {
			this.authWatcher();
		}
	}

	public render(): JSX.Element | null {
		const { location } = this.props;
		return (
			<Base noDrawer location={location}>
				<Content padder />
			</Base>
		);
	}

	private onInitialized = async (user: firebase.User | null) => {
		const { oauthStore, history } = this.props;
		if (!oauthStore.isInitialized) {
			await oauthStore.initialize();
		}
		if (user === null) {
			history.replace('/auth/signin', { from: '/main' });
		} else {
			history.replace('/main');
		}
	}
}

const empty = inject<IEmptyProps>('authStore', 'oauthStore')(observer<IEmptyProps>(Empty));
empty.displayName = 'Empty';

export { Empty as EmptyRaw };
export default empty;
