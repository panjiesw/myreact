// Copyright (c) 2017 Panjie Setiawan Wicaksono
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

declare namespace firebaseui.auth {
	interface UICallbacks {
		signInSuccess?: (user: firebase.User, credential?: firebase.auth.AuthCredential, redirectUrl?: string) => void;
	}

	class CredentialHelper {
		static ACCOUNT_CHOOSER_COM: string;
		static NONE: string;
	}

	interface SignInOPtions {
		provider: string;
		scopes: string[];
	}

	interface UIConfig {
		callbacks?: UICallbacks;
		credentialHelper?: string;
		queryParameterForSignInSuccessUrl?: string;
		queryParameterForWidgetMode?: string;
		signInFlow?: 'popup' | 'redirect';
		signInSuccessUrl?: string;
		signInOptions: Array<SignInOPtions | string>;
		tosUrl: string;
	}

	class AuthUI {
		constructor(auth: firebase.auth.Auth);

		start(container: string, config: UIConfig): void;
	}
}

declare module 'firebaseui' {
	export = firebaseui;
}
