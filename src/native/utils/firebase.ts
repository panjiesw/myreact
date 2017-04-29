/**
 * Copyright (c) 2017 Panjie Setiawan Wicaksono <panjie@panjiesw.com>
 *
 * This software is released under the MIT License.
 * https://panjiesw.mit-license.org
 */

import RNFirebase from 'react-native-firebase';
import { IFirebaseWrapper } from 'common/utils/firebase';

const app = RNFirebase.initializeApp({
	debug: __DEV__,
	persistence: true,
});

const wrapper: IFirebaseWrapper = {
	app,
	facebook: {
		provider: app.auth.FacebookAuthProvider,
		id: app.auth.FacebookAuthProvider.PROVIDER_ID,
		credential: app.auth.FacebookAuthProvider.credential,
	},
	google: {
		provider: app.auth.GoogleAuthProvider,
		id: app.auth.GoogleAuthProvider.PROVIDER_ID,
		credential: app.auth.GoogleAuthProvider.credential,
	},
	github: {
		provider: app.auth.GithubAuthProvider,
		id: app.auth.GithubAuthProvider.PROVIDER_ID,
		credential: app.auth.GithubAuthProvider.credential,
	},
	email: {
		provider: app.auth.EmailAuthProvider,
		id: app.auth.EmailAuthProvider.PROVIDER_ID,
		credential: app.auth.EmailAuthProvider.credential,
	},
};

export default wrapper;
