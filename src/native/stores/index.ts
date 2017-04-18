/**
 * Copyright (c) 2017 Panjie Setiawan Wicaksono <panjie@panjiesw.com>
 *
 * This software is released under the MIT License.
 * https://panjiesw.mit-license.org
 */

import AuthStore, { IAuthStore } from 'common/stores/auth';
import firebase from 'native/utils/firebase';

const authStore: IAuthStore = new AuthStore(firebase);

export default {
	authStore,
};
