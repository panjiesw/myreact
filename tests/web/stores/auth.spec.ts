/**
 * Copyright (c) 2017 Panjie Setiawan Wicaksono <panjie@panjiesw.com>
 *
 * This software is released under the MIT License.
 * https://panjiesw.mit-license.org
 */

import test from 'ava';
import AuthStore from 'common/stores/auth';
import firebaseWrapper from 'web/utils/firebase';

test('Auth', (t) => {
	const store = new AuthStore(firebaseWrapper);
	t.not(store, undefined);
});
