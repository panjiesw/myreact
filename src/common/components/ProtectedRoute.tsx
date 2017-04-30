/**
 * Copyright (c) 2017 Panjie Setiawan Wicaksono <panjie@panjiesw.com>
 *
 * This software is released under the MIT License.
 * https://panjiesw.mit-license.org
 */

import React, { Component as ReactComponent, ComponentClass, ReactNode, SFC } from 'react';
import * as propTypes from 'prop-types';
import { Redirect, Route, RouteProps } from 'react-router';
import { IAuthStore } from 'common/stores/auth';

export interface IProtectedRouteProps extends RouteProps {
	authStore: IAuthStore;
	component: ComponentClass<any> | SFC<any>;
}

export interface IPProtectedRouteProps extends RouteProps {
	authStore?: IAuthStore;
}

class ProtectedRoute extends ReactComponent<IProtectedRouteProps, void> {
	public static propTypes = {
		authStore: propTypes.any.isRequired,
	};

	public render(): JSX.Element | null {
		// noinspection JSUnusedLocalSymbols
		const { authStore, component, render, ...rest } = this.props;
		return (
			<Route {...rest} render={this.routeRender} />
		);
	}

	private routeRender = (props: any): ReactNode => {
		const { authStore, component: Component } = this.props;
		if (authStore.isLoggedIn) {
			return (
				<Component {...props} />
			);
		}
		return (
			<Redirect to={{ pathname: '/auth/signin', state: { from: props.location } }} />
		);
	}
}

export { ProtectedRoute as ProtectedRouteRaw };
