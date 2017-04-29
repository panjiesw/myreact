/*
 * Copyright (c) 2017 Panjie Setiawan Wicaksono <panjie@panjiesw.com>
 *
 * This software is released under the MIT License.
 * https://panjiesw.mit-license.org
 */

declare module 'react-native-firebase' {
	import firebase from 'firebase';

	export interface IRNFirebaseOptions {
		debug?: boolean;
		persistence?: boolean;
	}

	export interface IRNFirebase {
		initializeApp: (options: IRNFirebaseOptions) => any;
	}

	const cs: IRNFirebase;
	export default cs;
}
