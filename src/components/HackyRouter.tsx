// Copyright (c) 2017 Panjie Setiawan Wicaksono
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import React, { PureComponent } from 'react';
import { Router, useRouterHistory } from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory';

const browserHistory = useRouterHistory(createBrowserHistory)({ basename: '/' });

export default class HackyRouter extends PureComponent<any, any> {
	private router: any;

	public componentDidMount() {
		// componentWillReceiveProps just whines about changing the routes prop so this shuts that up
		// this.router.componentWillReceiveProps = function () { }
	}

	public componentDidUpdate(prevProps: any) {
		if (prevProps.routes !== this.props.routes) {
			// tear down and set up router internals again
			this.router.componentWillUnmount();
			this.router.componentWillMount();
		}
	}

	public render() {
		return <Router ref={(ref: any) => this.router = ref} history={browserHistory} routes={this.props.routes} />;
	}
}
