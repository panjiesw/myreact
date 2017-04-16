// Copyright (c) 2017 Panjie Setiawan Wicaksono
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import React, { Component, ComponentClass, PropTypes, ReactNode, SFC } from 'react';
import { Redirect, Route, RouteProps } from 'react-router';
import { IAuthStore } from 'common/stores/auth';

export interface IProtectedRouteProps extends RouteProps {
	authStore: IAuthStore;
	component: ComponentClass<any> | SFC<any>;
}

export interface IPProtectedRouteProps extends RouteProps {
	authStore?: IAuthStore;
}

class ProtectedRoute extends Component<IProtectedRouteProps, void> {
	public static propTypes = {
		authStore: PropTypes.any.isRequired,
	};

	public render(): JSX.Element | null {
		const { authStore, component, render, ...rest } = this.props;
		return (
			<Route {...rest} render={this.routeRender} />
		);
	}

	private routeRender = (props: any): ReactNode => {
		console.log('props', props.location);
		const { authStore, component: Comp } = this.props; // tslint:disable-line:variable-name
		if (authStore.isLoggedIn) {
			return (
				<Comp {...props} />
			);
		}
		return (
			<Redirect to={{ pathname: '/login', state: { from: props.location } }} />
		);
	}
}

export { ProtectedRoute as ProtectedRouteRaw };
