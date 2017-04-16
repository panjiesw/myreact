// Copyright (c) 2017 Panjie Setiawan Wicaksono
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

declare module 'react-native-firebase' {
	import firebase from 'firebase';

	export interface IRNFirebaseOptions {
		debug?: boolean;
		persistence?: boolean;
	}

	export interface IRNFirebase {
		initializeApp: (options: IRNFirebaseOptions) => typeof firebase
	}

	const cs: IRNFirebase;
	export default cs;
}
