// Copyright (c) 2017 Panjie Setiawan Wicaksono
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import * as React from 'react';
import { Provider } from 'mobx-react';
import { rootStore } from 'components/Root';
import { firebaseStore } from 'stores/firebase';
import App from './App';

const AppWrapper: React.StatelessComponent<{}> = () => (
	<Provider firebaseStore={firebaseStore} rootStore={rootStore}>
		<App />
	</Provider>
);
AppWrapper.displayName = 'AppWrapper';

export default AppWrapper;
