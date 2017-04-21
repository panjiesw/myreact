/**
 * Copyright (c) 2017 Panjie Setiawan Wicaksono <panjie@panjiesw.com>
 *
 * This software is released under the MIT License.
 * https://panjiesw.mit-license.org
 */

import AuthStore, { IAuthStore } from 'common/stores/auth';
import firebase from 'native/utils/firebase';
import GlobalUIStore, {IGlobalUIStore} from './ui';
import OAuthStore, {IOAuthStore} from './oauth';

const authStore: IAuthStore = new AuthStore(firebase);
const oauthStore: IOAuthStore = new OAuthStore(authStore);
const globalUIStore: IGlobalUIStore = new GlobalUIStore();

export default {
	authStore,
	oauthStore,
	globalUIStore,
};
