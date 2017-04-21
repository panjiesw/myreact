/*
 * Copyright (c) 2017 Panjie Setiawan Wicaksono <panjie@panjiesw.com>
 *
 * This software is released under the MIT License.
 * https://panjiesw.mit-license.org
 */

declare module 'react-router-native' {
	import {
		match,
		matchPath,
		MemoryRouter,
		Prompt,
		Redirect,
		Route,
		RouteComponentProps,
		RouteProps,
		Router,
		RouterChildContext,
		StaticRouter,
		Switch,
		withRouter,
	} from 'react-router';
	import * as React from 'react';
	import * as H from 'history';

	class AndroidBackButton extends React.Component<any, void> {
	}
	class DeepLinking extends React.Component<void, void> {
	}

	interface LinkProps {
		to: H.LocationDescriptor;
		replace?: boolean;
		component?: React.ComponentClass<any> | React.SFC<any>;
	}
	class Link extends React.Component<LinkProps, void> {
	}

	interface NativeRouterProps {
		getUserConfirmation?(): void;
		keyLength?: number;
	}
	class NativeRouter extends React.Component<NativeRouterProps, void> {
	}

	export {
		Prompt,
		MemoryRouter,
		Redirect,
		RouteComponentProps,
		RouteProps,
		Route,
		Router,
		StaticRouter,
		Switch,
		match,
		matchPath,
		withRouter,
		RouterChildContext,
		AndroidBackButton,
		DeepLinking,
		LinkProps,
		Link,
		NativeRouterProps,
		NativeRouter
,	};
}
