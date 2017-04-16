// Copyright (c) 2017 Panjie Setiawan Wicaksono
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

declare module 'native-base' {
	import * as React from 'react';
	import * as ReactNative from 'react-native';

	namespace NativeBase {
		/**
         * see Widget Content.js
         */
		interface Content {
			/**
			 * The theme prop can be applied to any component of NativeBase.
			 */
			theme?: Object;
			padder?: boolean;
			style?: ReactNative.ViewStyle;
			contentContainerStyle?: ReactNative.ViewStyle;
		}

		interface Form { }

		interface Label { }
	}

	export class Form extends React.Component<NativeBase.Form, void> { }
	export class Label extends React.Component<NativeBase.Label, void> { }

}
