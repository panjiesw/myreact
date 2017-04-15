// Copyright (c) 2017 Panjie Setiawan Wicaksono
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import React, { PureComponent, ComponentClass, PropTypes, ReactNode, SFC } from 'react';
import { Redirect, Route, RouteProps } from 'react-router';
import { inject, observer } from 'mobx-react';
import { IAuthStore } from '../stores/auth';

export interface IProtectedRouteProps extends RouteProps {
	authStore: IAuthStore;
	component: ComponentClass<any> | SFC<any>;
}

export interface IPProtectedRouteProps extends RouteProps {
	authStore?: IAuthStore;
}

class ProtectedRoute extends PureComponent<IProtectedRouteProps, void> {
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
		const { authStore, component: Component } = this.props; // tslint:disable-line:variable-name
		if (authStore.isLoggedIn) {
			return (
				<Component {...props} />
			);
		}
		return (
			<Redirect to={{ pathname: '/login', state: { from: props.location } }} />
		);
	}
}

export { ProtectedRoute as ProtectedRouteRaw };
export default inject<IPProtectedRouteProps>('authStore')(
	observer<IPProtectedRouteProps>(ProtectedRoute));
