/*
 * Copyright (c) 2017 Panjie Setiawan Wicaksono <panjie@panjiesw.com>
 *
 * This software is released under the MIT License.
 * https://panjiesw.mit-license.org
 */

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

		interface Form {
		}

		interface Label {
		}

		interface Input {
			getRef?(instance: {_root: ReactNative.TextInput}): void;
		}

		interface Icon {
			android?: string;
			ios?: string;
		}

		interface ToastConfig {
			text: string;
			buttonText: string;
			type: 'danger' | 'success' | 'warning';
			duration?: number;
			position?: 'top' | 'bottom' | 'center';
		}
	}

	export class Form extends React.Component<NativeBase.Form, void> {
	}

	export class Label extends React.Component<NativeBase.Label, void> {
	}

	export class Toast {
		static show(config: NativeBase.ToastConfig): void
	}

}
