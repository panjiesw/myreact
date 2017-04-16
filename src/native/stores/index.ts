// Copyright (c) 2017 Panjie Setiawan Wicaksono
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import AuthStore, { IAuthStore } from 'myreact/lib/stores/auth';
import firebase from '../utils/firebase';

const authStore: IAuthStore = new AuthStore(firebase);

export default {
	authStore,
};
