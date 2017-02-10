// Copyright (c) 2017 Panjie Setiawan Wicaksono
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

declare module 'react-md/lib/constants/CSSTransitionGroupTick' {
	const TICK: number;
	export default TICK;
}

declare module 'react-md/lib/Helpers/Portal' {
	import * as React from 'react';

	export interface PortalProps extends React.HTMLProps<any> {
		visible: boolean;
		component?: string;
		onOpen?: Function;
		onClose?: Function;
		renderNode?: Object;
		lastChild?: boolean;
	}

	export default class Portal extends React.Component<PortalProps, {}> { }
}
