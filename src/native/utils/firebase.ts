/**
 * Copyright (c) 2017 Panjie Setiawan Wicaksono <panjie@panjiesw.com>
 *
 * This software is released under the MIT License.
 * https://panjiesw.mit-license.org
 */

import RNFirebase from 'react-native-firebase';

const fb = RNFirebase.initializeApp({
	debug: __DEV__,
	persistence: true,
});

export default fb;
