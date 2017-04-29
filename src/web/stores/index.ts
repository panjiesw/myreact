/**
 * Copyright (c) 2017 Panjie Setiawan Wicaksono <panjie@panjiesw.com>
 *
 * This software is released under the MIT License.
 * https://panjiesw.mit-license.org
 */

import firebaseWrapper from 'web/utils/firebase';
import AuthStore, { IAuthStore } from 'common/stores/auth';

const authStore: IAuthStore = new AuthStore(firebaseWrapper);

export default {
	authStore,
};
