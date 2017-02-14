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

declare module 'react-md/lib/Buttons/Button' {
	import * as React from 'react';
	import { InjectedTooltipProps, TooltippedComponent } from 'react-md/lib/Tooltips';
	import { InjectedInkProps } from 'react-md/lib/Inks';

	export type ButtonTypes = 'button' | 'submit' | 'reset';
	type FixedPositions = 'tr' | 'tl' | 'br' | 'bl';

	export interface ButtonProps extends InjectedTooltipProps, InjectedInkProps {
		label?: string;
		iconBefore?: boolean;
		iconClassName?: string;
		type?: ButtonTypes;
		primary?: boolean;
		secondary?: boolean;
		disabled?: boolean;
		href?: string;
		component?: Function | string;
		fixed?: boolean;
		fixedPosition?: FixedPositions;
		mini?: boolean;
		flat?: boolean;
		raised?: boolean;
		icon?: boolean;
		floating?: boolean;
		forceSize?: boolean | number;
	}

	export default class Button extends React.Component<ButtonProps, {}> {
		createInk(pageX?: number, pageY?: number): void;
		focus(): void;
		getComposedComponent(): TooltippedComponent;
	}
}

declare module 'react-md/lib/Inks' {
	import * as React from 'react';

	type InteractionTypes = 'keyboard' | 'mouse' | 'touch';

	export interface InjectedInkProps extends React.HTMLAttributes<any> {
		inkStyle?: React.CSSProperties;
		inkClassName?: string;
		inkContainerStyle?: React.CSSProperties;
		inkContainerClassName?: string;
		disabled?: boolean;
		inkDisabled?: boolean;
		inkTransitionOverlay?: number;
		inkTransitionEnterTimeout?: number;
		inkTransitionLeaveTimeout?: number;
		waitForInkTransition?: boolean;
		disabledInteractions?: Array<InteractionTypes>;
	}

	export interface InkedComponent extends React.Component<{}, {}> {
		createInk(pageX?: number, pageY?: number): void;
		focus(): void;
		getComposedComponent(): React.Component<{}, {}>;
	}

	type injectInk = (ComposedComponent: React.Component<InjectedInkProps, {}>) => InkedComponent;

	export default injectInk;
}

declare module 'react-md/lib/Tooltips' {
	import * as React from 'react';

	export type Positions = 'top' | 'right' | 'bottom' | 'left';

	export interface InjectedTooltipProps {
		tooltipLabel?: string;
		tooltipDelay?: number;
		tooltipPosition?: Positions;
		tooltipContainerStyle?: React.CSSProperties;
		tooltipContainerClassName?: string;
		tooltipStyle?: React.CSSProperties;
		tooltipClassName?: string;
		tooltipTransitionEnterTimeout?: number;
		tooltipTransitionLeaveTimeout?: number;
	}

	export interface TooltippedComponent extends React.Component<InjectedTooltipProps, {}> {
		getComposedComponent(): React.Component<{}, {}>;
	}

	type injectTooltip = (ComposedComponent: React.Component<InjectedTooltipProps, {}>) => React.Component<{}, {}>;

	export default injectTooltip;
}
