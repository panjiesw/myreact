/**
 * Copyright (c) 2017 Panjie Setiawan Wicaksono <panjie@panjiesw.com>
 *
 * This software is released under the MIT License.
 * https://panjiesw.mit-license.org
 */

import React, { Component } from 'react';
import { observer } from 'mobx-react';

class Dashboard extends Component<void, void> {
	public render(): JSX.Element | null {
		return (
			<h1>Hello</h1>
		);
	}
}

export { Dashboard as DashboardRaw };
export default observer(Dashboard);
