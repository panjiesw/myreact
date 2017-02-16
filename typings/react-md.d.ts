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

	export interface InjectedInkProps extends React.HTMLProps<any> {
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

declare module 'react-md/lib/Drawers' {
	import * as React from 'react';

	export enum DrawerTypes {
		// Permanent drawers
		FULL_HEIGHT,
		CLIPPED,
		FLOATING,

		// Persistent drawers
		PERSISTENT,
		PERSISTENT_MINI,

		// Temporary
		TEMPORARY,
		TEMPORARY_MINI,
	}

	export type DrawerTypesType = 'full-height' | 'clipped' | 'floating' | 'persistent' | 'persistent-mini' | 'temporary' | 'temporary-mini';

	export type MediaTypes = 'mobile' | 'tablet' | 'desktop';
	export type DrawerPositions = 'left' | 'right';

	interface DrawerProps {
		navStyle?: React.CSSProperties;
		navClassName?: string;
		component?: Function | string;
		navItems?: Array<React.ReactElement<any> | { divider?: boolean, subheader?: boolean, primaryText?: string }>;
		autoclose?: boolean;
		header?: React.ReactNode;
		mobileType?: 'temporary' | 'temporary-mini';
		mobileMinWidth?: number;
		tabletType?: DrawerTypes | DrawerTypesType;
		tabletMinWidth?: number;
		desktopType?: DrawerTypes | DrawerTypesType;
		desktopMinWidth?: number;
		type?: DrawerTypes | DrawerTypesType;
		onMediaTypeChange?: (type: DrawerTypesType, media: { mobile: boolean, tablet: boolean, desktop: boolean }) => void;
		defaultMedia: MediaTypes;
		overlay?: boolean;
		renderNode?: Object;
		defaultVisible?: boolean;
		visible?: boolean;
		onVisibilityToggle?: (visible: boolean, event: Event) => void;
		position?: DrawerPositions;
		inline?: boolean;
		transitionDuration?: number;
		clickableDesktopOverlay?: boolean;
		closeOnNavItemClick?: boolean;
		children?: React.ReactNode;
	}

	export default class Drawer extends React.Component<DrawerProps, {}> {
		static DrawerTypes: DrawerTypes;
		static getCurrentMedia(props?: {
			mobileMinWidth: number,
			tabletMinWidth: number,
			desktopMinWidth: number,
			mobileType: 'temporary' | 'temporary-mini',
			tabletType: DrawerTypes | DrawerTypesType,
			desktopType: DrawerTypes | DrawerTypesType,
		}): { type: DrawerTypesType, mobile: boolean, tablet: boolean, desktop: boolean };

		static matchesMedia(min: number, max?: number): boolean;
	}
}

declare module 'react-md/lib/NavigationDrawers' {
	import * as React from 'react';
	import { DrawerTypes, DrawerTypesType, DrawerPositions, MediaTypes } from 'react-md/lib/Drawers';

	interface NavigationDrawerProps extends React.HTMLProps<any> {
		toolbarStyle?: React.CSSProperties;
		toolbarClassName?: string;
		toolbarTitleStyle?: React.CSSProperties;
		toolbarTitleClassName?: string;
		drawerStyle?: React.CSSProperties;
		drawerClassName?: string;
		contentStyle?: React.CSSProperties;
		contentClassName?: string;
		children?: React.ReactNode;
		includeDrawerHeader?: boolean;
		drawerHeader?: React.ReactNode;
		drawerTitle?: React.ReactNode;
		drawerChildren?: React.ReactNode;
		position?: DrawerPositions;
		navItems?: Array<React.ReactElement<any> | { divider?: boolean, subheader?: boolean, primaryText?: React.ReactNode }>;
		mobileDrawerType?: 'temporary' | 'temporary-mini';
		tabletDrawerType?: DrawerTypes | DrawerTypesType;
		desktopDrawerType?: DrawerTypes | DrawerTypesType;
		drawerType?: DrawerTypes | DrawerTypesType;
		defaultMedia?: MediaTypes;
		mobileMinWidth?: number;
		tabletMinWidth?: number;
		desktopMinWidth?: number;
		renderNode?: Object;
		onMediaTypeChange?: (type: DrawerTypesType, media: { mobile: boolean, tablet: boolean, desktop: boolean }) => void;
		defaultVisible?: boolean;
		visible?: boolean;
		onVisibilityToggle?: (visible: boolean, event: Event) => void;
		extractMini?: boolean;
		miniDrawerHeader?: React.ReactNode;
		miniDrawerChildren?: React.ReactNode;
		autoclose?: boolean;
		toolbarTitle?: React.ReactNode;
		toolbarTitleMenu?: React.ReactElement<any>;
		toolbarThemeType?: 'default' | 'colored' | 'themed';
		toolbarSingleColor?: boolean;
		toolbarProminent?: boolean;
		toolbarProminentTitle?: boolean;
		toolbarActons?: React.ReactElement<any> | Array<React.ReactElement<any>>;
		toolbarChildren?: React.ReactNode;
		contentComponent?: Function | string;
		footer?: React.ReactNode;
		temporaryIconChildren?: React.ReactNode;
		temporaryIconClassName?: string;
		persistentIconChildren?: React.ReactNode;
		persistentIconClassName?: string;
		transitionName?: string;
		transitionEnterTimeout?: number;
		transitionLeaveTimeout?: number;
		drawerTransitionDuration?: number;
		contentProps?: Object;
		contentId?: number | string;
		jumpLabel?: string;
	}

	interface CloseButtonProps extends React.HTMLProps<any> {
	}

	interface JumpToContentLinkProps extends React.HTMLProps<any> {
	}

	export default class NavigationDrawer extends React.Component<NavigationDrawerProps, {}> {
		static getCurrentMedia(props?: {
			mobileMinWidth: number,
			tabletMinWidth: number,
			desktopMinWidth: number,
			mobileDrawerType: 'temporary' | 'temporary-mini',
			tabletDrawerType: DrawerTypes | DrawerTypesType,
			desktopDrawerType: DrawerTypes | DrawerTypesType,
		}): { type: DrawerTypesType, mobile: boolean, tablet: boolean, desktop: boolean };
	}

	export { NavigationDrawer };
	export class CloseButton extends React.Component<CloseButtonProps, {}> { }
	export class JumpToContentLink extends React.Component<JumpToContentLinkProps, {}> { }
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
