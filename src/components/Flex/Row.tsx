// Copyright (c) 2017 Panjie Setiawan Wicaksono
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import * as React from 'react';
import classnames from 'classnames';
import style from 'flexboxgrid/src/css/flexboxgrid.css';

export type RowModificator = 'xs' | 'sm' | 'md' | 'lg';

export interface RowProps extends React.HTMLAttributes<any> {
	reverse?: boolean;
	st?: RowModificator;
	center?: RowModificator;
	end?: RowModificator;
	top?: RowModificator;
	middle?: RowModificator;
	bottom?: RowModificator;
	around?: RowModificator;
	between?: RowModificator;
	first?: RowModificator;
	last?: RowModificator;
	tagName?: string;
	[idx: string]: any;
}

const modificatorKeys = ['start', 'center', 'end', 'top', 'middle', 'bottom', 'around', 'between', 'first', 'last'];

function getClassNames(props: RowProps): string {
	const modificators = [style.row];

	for (let i = 0; i < modificatorKeys.length; ++i) {
		const key = modificatorKeys[i];
		const value = key === 'start' ? props.st : props[key];
		if (value) {
			modificators.push(style[`${key}-${value}`]);
		}
	}

	if (props.reverse) {
		modificators.push(style.reverse);
	}

	return classnames(props.className, modificators);
}

const Row: React.SFC<RowProps> = (props) => {
	const className = getClassNames(props);
	// tslint:disable-next-line:no-unused-variable
	const {reverse, st, center, end, top, middle, bottom, around, between, first, last, tagName, ...others} = props;
	return React.createElement(tagName || 'div', { ...others, className });
}

export { Row };
