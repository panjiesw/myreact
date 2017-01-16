// Copyright (c) 2017 Panjie Setiawan Wicaksono
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import * as React from 'react';
import classnames from 'classnames';
import style from 'flexboxgrid/src/css/flexboxgrid.css';

export interface ColProps extends React.HTMLAttributes<any> {
	xs?: number | boolean;
	sm?: number | boolean;
	md?: number | boolean;
	lg?: number | boolean;
	xsOffset?: number;
	smOffset?: number;
	mdOffset?: number;
	lgOffset?: number;
	reverse?: boolean;
	tagName?: string;
	[idx: string]: any;
}

const classMap: {[idx: string]: string} = {
	xs: 'col-xs',
	sm: 'col-sm',
	md: 'col-md',
	lg: 'col-lg',
	xsOffset: 'col-xs-offset',
	smOffset: 'col-sm-offset',
	mdOffset: 'col-md-offset',
	lgOffset: 'col-lg-offset'
};

function getClassNames(props: ColProps): string {
	const extraClasses: Array<string> = [];

	if (props.className) {
		extraClasses.push(props.className);
	}

	if (props.reverse) {
		extraClasses.push(style.reverse);
	}

	return Object.keys(props)
		.filter(key => classMap[key])
		.map(key => style[parseInt(props[key], 10) > 0 ? (classMap[key] + '-' + props[key]) : classMap[key]])
		.concat(extraClasses)
		.join(' ');
}

const Col: React.SFC<ColProps> = (props) => {
	const className = classnames(props.className, getClassNames(props));
	// tslint:disable-next-line:no-unused-variable
	const {xs, sm, md, lg, xsOffset, smOffset, mdOffset, lgOffset, reverse, tagName, ...others} = props;

	return React.createElement(tagName || 'div', { ...others, className })
}

export { Col };
