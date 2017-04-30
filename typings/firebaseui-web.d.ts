/**
 * Copyright (c) 2017 Panjie Setiawan Wicaksono <panjie@panjiesw.com>
 *
 * This software is released under the MIT License.
 * https://panjiesw.mit-license.org
 */

declare module 'firebaseui' {
	import * as firebase from 'firebase';

	namespace firebaseui.auth {
		interface ICallbacks {
			signInSuccess?: (user: firebase.User, credential?: firebase.auth.AuthCredential, redirectUrl?: string) => void;
			uiShown?: () => void;
		}

		class CredentialHelper {
			static ACCOUNT_CHOOSER_COM: string;
			static NONE: string;
		}

		interface ISignInOptions {
			provider: string;
			scopes: string[];
		}

		interface IConfig {
			callbacks?: ICallbacks;
			credentialHelper?: string;
			queryParameterForSignInSuccessUrl?: string;
			queryParameterForWidgetMode?: string;
			signInFlow?: 'popup' | 'redirect';
			signInSuccessUrl?: string;
			signInOptions: Array<ISignInOptions | string>;
			tosUrl: string;
		}

		class AuthUI {
			constructor(auth: firebase.auth.Auth);

			start(container: string, config: IConfig): void;
		}
	}

	export = firebaseui;
}
