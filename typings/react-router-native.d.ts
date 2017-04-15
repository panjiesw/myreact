// Copyright (c) 2017 Panjie Setiawan Wicaksono
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

declare module 'react-router-native' {
	import {
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
		RouterChildContext
	} from 'react-router';
	import * as React from 'react';
	import * as H from 'history';

	class AndroidBackButton extends React.Component<void, void> { }
	class DeepLinking extends React.Component<void, void> { }

	interface LinkProps {
		to: H.LocationDescriptor;
		replace?: boolean;
		component?: React.ComponentClass<any> | React.SFC<any>;
	}
	class Link extends React.Component<LinkProps, void> { }

	interface NativeRouterProps {
		getUserConfirmation?(): void;
		keyLength?: number;
	}
	class NativeRouter extends React.Component<NativeRouterProps, void> { }

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
	}
}
