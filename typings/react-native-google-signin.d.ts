/**
 * Copyright (c) 2017 Panjie Setiawan Wicaksono <panjie@panjiesw.com>
 *
 * This software is released under the MIT License.
 * https://panjiesw.mit-license.org
 */

declare module 'react-native-google-signin' {
	import * as React from 'react';
	import * as RNative from 'react-native';

	export interface GoogleSigninError extends Error {
		code: string;
	}

	export interface IGoogleSigninConfigOptions {
		scopes?: string[] | null;
		iosClientId?: string | null;
		webClientId?: string | null;
		offlineAccess?: boolean;
		hostedDomain?: string;
		forceConsentPrompt?: boolean;
		accountName?: string;
	}

	export interface IGoogleUser {
    id: string;
    name: string;
    email: string;
    photo: string;
    idToken: string;
    serverAuthCode: string;
    scopes: string[]
    accessToken: string;
  }

	export interface IGoogleSignin {
		hasPlayServices(options?: { autoResolve: boolean }): Promise<void>;
		configure(options: IGoogleSigninConfigOptions): Promise<void>;
		signIn(): Promise<IGoogleUser>;
		signOut(): Promise<void>;
	}

	export interface IGoogleSigninButtonProps extends RNative.ViewProperties {
		size: number;
		color: number;
		onPress: () => any;
		accessibilityLabel?: string;
		disabled?: boolean;
	}

	export class GoogleSigninButton extends React.Component<IGoogleSigninButtonProps, void> {
		static Size: {
			Icon: number;
			Standard: number;
			Wide: number;
		};

		static Color: {
			Auto: number;
			Light: number;
			Dark: number;
		}
	}

	export const GoogleSignin: IGoogleSignin;
}
