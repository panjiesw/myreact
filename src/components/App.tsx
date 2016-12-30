// Copyright (c) 2016 Panjie Setiawan Wicaksono
//
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php

import * as React from 'react';
import Flexbox from 'flexbox-react';

export default class App extends React.PureComponent<{}, {}> {
	constructor(props?: {}, context?: any) {
		super(props, context)
	}

	render(): JSX.Element | null {
		return (
			<Flexbox flexWrap='nowrap' alignItems='center'
				justifyContent='center'>
				{this.props.children}
			</Flexbox>
		)
	}
}
