// Copyright (c) 2017 Panjie Setiawan Wicaksono
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import RNFirebase from 'react-native-firebase';

const firebase = RNFirebase.initializeApp({
	debug: __DEV__,
	persistence: true,
});

export default firebase;
