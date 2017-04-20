/**
 * Copyright (c) 2017 Panjie Setiawan Wicaksono <panjie@panjiesw.com>
 *
 * This software is released under the MIT License.
 * https://panjiesw.mit-license.org
 */

declare module 'react-native-fbsdk' {
	import * as React from 'react';
	import * as RNative from 'react-native';

	/**
	 * Indicates which default audience to use for sessions that post data to Facebook.
	 */
	export type DefaultAudience =
		// Indicates that the user's friends are able to see posts made by the application.
		'friends' |
		// Indicates that all Facebook users are able to see posts made by the application.
		'everyone' |
		// Indicates that only the user is able to see posts made by the application.
		'only_me';
	export type LoginBehavior = LoginBehaviorIOS | LoginBehaviorAndroid;
	/**
	 * Indicate how Facebook Login should be attempted on Android.
	 */
	export type LoginBehaviorAndroid =
		// Attempt login in using the Facebook App, and if that does not work fall back to web dialog auth.
		'native_with_fallback' |
		// Only attempt to login using the Facebook App.
		'native_only' |
		// Only the web dialog auth should be used.
		'web_only';
	/**
	 * Indicate how Facebook Login should be attempted on iOS.
	 */
	export type LoginBehaviorIOS =
		// Attempts log in through the native Facebook app.
		// The SDK may still use Safari instead.
		// See details in https://developers.facebook.com/blog/post/2015/10/29/Facebook-Login-iOS9/
		'native' |
		// Attempts log in through the Safari browser.
		'browser' |
		// Attempts log in through the Facebook account currently signed in through Settings.
		'system_account' |
		// Attempts log in through a modal UIWebView pop-up.
		'web';
	/**
	 * Shows the results of a login operation.
	 */
	export type LoginResult = {
		isCancelled: boolean;
		error?: any;
		grantedPermissions?: Array<string>;
		declinedPermissions?: Array<string>;
	};

	export type TooltipBehaviorIOS = 'auto' | 'force_display' | 'disable';

	export interface ILoginButtonProps extends RNative.ViewProperties {
		/**
		 * Represents the read permissions to request when the login button
		 * is pressed.
		 */
		readPermissions?: Array<string>;

		/**
		 * Represents the publish permissions to request when the login
		 * button is pressed.
		 */
		publishPermissions?: Array<string>;

		/**
		 * The callback invoked upon error/completion of a login request.
		 */
		onLoginFinished?: (error: Object, result: LoginResult) => void;

		/**
		 * The callback invoked upon completion of a logout request.
		 */
		onLogoutFinished?: () => void;

		/**
		 * The behavior to use when attempting a login.
		 * @platform android
		 */
		loginBehaviorAndroid?: LoginBehaviorAndroid;

		/**
		 * The behavior to use when attempting a login.
		 * @platform ios
		 */
		loginBehaviorIOS?: LoginBehaviorIOS;

		/**
		 * The default audience to target when attempting a login.
		 */
		defaultAudience?: DefaultAudience;

		/**
		 * For iOS only, the desired tooltip behavior.
		 * @platform ios
		 */
		tooltipBehaviorIOS?: TooltipBehaviorIOS;
	}

	/**
	 * A button that initiates a log in or log out flow upon tapping.
	 */
	export class LoginButton extends React.Component<ILoginButtonProps, void> { }

	export type AccessTokenMap = {
		accessToken: string;
		applicationID: string;
		userID: string;
		permissions: Array<string>;
		declinedPermissions: Array<string>;
		accessTokenSource?: string;
		expirationTime: number;
		lastRefreshTime: number;
	};

	/**
	 * Represents an immutable access token for using Facebook services.
	 */
	export class AccessToken {
		/**
		 * The access token string.
		 */
		accessToken: string;

		/**
		 * The app ID.
		 */
		applicationID: string;

		/**
		 * The user ID.
		 */
		userID: string;

		/**
		 * The known granted permissions.
		 */
		permissions: Array<string>;

		/**
		 * The known declined permissions.
		 */
		declinedPermissions: Array<string>;

		/**
		 * The source of access token.
		 * @platform android
		 */
		accessTokenSource?: string;

		/**
		 * The expiration time of the access token.
		 * The value is the number of milliseconds since Jan. 1, 1970, midnight GMT.
		 */
		expirationTime: number;

		/**
		 * The last refresh time of the access token.
		 * The value is the number of milliseconds since Jan. 1, 1970, midnight GMT.
		 */
		lastRefreshTime: number;

		/**
   * Gets the date at which the access token expires. The value is the number of
   * milliseconds since Jan. 1, 1970, midnight GMT.
   */
		getExpires(): number;

		/**
		 * Get the list of permissions associated with this access token. Note that the most up-to-date
		 * list of permissions is maintained by Facebook, so this list may be outdated if permissions
		 * have been added or removed since the time the AccessToken object was created. See
		 * https://developers.facebook.com/docs/reference/login/#permissions for details.
		 */
		getPermissions(): Array<string>;

		/**
		 * Gets the list of permissions declined by the user with this access token. It represents the
		 * entire set of permissions that have been requested and declined. Note that the most
		 * up-to-date list of permissions is maintained by Facebook, so this list may be outdated if
		 * permissions have been granted or declined since the last time an AccessToken object was
		 * created. See https://developers.facebook.com/docs/reference/login/#permissions for details.
		 */
		getDeclinedPermissions(): Array<string>;

		/**
		 * Gets the date at which the token was last refreshed. Since tokens expire, the Facebook SDK
		 * will attempt to renew them periodically. The value is the number of milliseconds since
		 * Jan. 1, 1970, midnight GMT.
		 */
		getLastRefresh(): number;

		/**
		 * Gets the ID of the Facebook Application associated with this access token.
		 */
		getApplicationId(): string;


		/**
		 * Gets user ID associated with this access token.
		 */
		getUserId(): string;

		/**
		 * Getter for the access token that is current for the application.
		 */
		static getCurrentAccessToken(): Promise<AccessToken | null>;

		/**
		 * Setter for the access token that is current for the application.
		 */
		static setCurrentAccessToken(accessToken: AccessTokenMap): void;

		/**
		 * Updates the current access token with up to date permissions,
		 * and extends the expiration date, if extension is possible.
		 */
		static refreshCurrentAccessTokenAsync(): Promise<any>;
	}

	export interface ILoginManager {
		/**
		 * Logs the user in with the requested read permissions.
		 */
		logInWithReadPermissions(permissions: Array<string>): Promise<LoginResult>;

		/**
		 * Logs the user in with the requested publish permissions.
		 */
		logInWithPublishPermissions(permissions: Array<string>): Promise<LoginResult>;

		/**
		 * Getter for the login behavior.
		 */
		getLoginBehavior(): Promise<LoginBehavior>;

		/**
		 * Setter for the login behavior.
		 */
		setLoginBehavior(loginBehavior: LoginBehavior): void;

		/**
		 * Getter for the default audience.
		 */
		getDefaultAudience(): Promise<DefaultAudience>;

		/**
		 * Setter for the default audience.
		 */
		setDefaultAudience(defaultAudience: DefaultAudience): void;

		/**
		 * Logs out the user.
		 */
		logOut(): void;
	}

	export const LoginManager: ILoginManager;
}
