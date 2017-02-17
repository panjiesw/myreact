// Copyright (c) 2017 Panjie Setiawan Wicaksono
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import React, { StatelessComponent, HTMLProps } from 'react';
import Flexbox from 'flexbox-react';
import { observer } from 'mobx-react';

const Content: StatelessComponent<HTMLProps<any>> =
	({children, ...props}) => {
		let {height, width, ...others} = props;
		return (
			<Flexbox
				alignItems='stretch'
				flexDirection='row'
				flexWrap='wrap'
				element='main'
				{...others}>
				{children}
			</Flexbox>
		);
	};

export default observer(Content);
