/**
 * Copyright (c) 2017 Panjie Setiawan Wicaksono <panjie@panjiesw.com>
 *
 * This software is released under the MIT License.
 * https://panjiesw.mit-license.org
 */

import firebaseWrapper from 'web/utils/firebase';
import AuthStore, { IAuthStore } from 'common/stores/auth';
import AuthUIStore, { IAuthUIStore } from './authUI';

const authStore: IAuthStore = new AuthStore(firebaseWrapper);
const authUIStore: IAuthUIStore = new AuthUIStore(firebaseWrapper);

export default {
	authStore,
	authUIStore,
};
