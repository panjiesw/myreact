// Copyright (c) 2017 Panjie Setiawan Wicaksono
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import * as React from 'react';
import classnames from 'classnames';
import style from 'flexboxgrid/src/css/flexboxgrid.css';

export interface GridProps extends React.HTMLAttributes<any> {
	fluid?: boolean;
	tagName?: string;
}

const Grid: React.SFC<GridProps> = ({fluid, tagName, className, ...others}) => {
	const containerClass = style[fluid ? 'container-fluid' : 'container'];
	const classes = classnames(className, containerClass);

	return React.createElement(tagName || 'div', { className: classes, ...others });
}

export { Grid };
