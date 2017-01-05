// Copyright (c) 2017 Panjie Setiawan Wicaksono
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import * as React from 'react';
import { Provider } from 'mobx-react';
import { rootController } from '../../../components/Root';
import { firebaseController } from '../../../controllers/firebase';
import Auth from './Auth';

const AuthWrapper: React.StatelessComponent<{}> = () => (
	<Provider firebaseController={firebaseController} rootController={rootController}>
		<Auth />
	</Provider>
)
AuthWrapper.displayName = 'AuthWrapper';

export default AuthWrapper;
