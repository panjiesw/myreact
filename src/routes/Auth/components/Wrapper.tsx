// Copyright (c) 2017 Panjie Setiawan Wicaksono
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import * as React from 'react';
import { Provider } from 'mobx-react';
import { rootStore } from 'components/Root';
import { authUIStore } from './store';
import Auth from './Auth';

const AuthWrapper: React.StatelessComponent<void> = () => (
	<Provider authUIStore={authUIStore} rootStore={rootStore}>
		<Auth />
	</Provider>
);
AuthWrapper.displayName = 'AuthWrapper';

export default AuthWrapper;
