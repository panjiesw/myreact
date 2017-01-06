declare module 'react-toolbox/lib/app_bar/AppBar' {
	import { AppBar } from 'react-toolbox/lib/app_bar';
	export default AppBar;
	export { AppBar };
}

declare module 'react-toolbox/lib/drawer' {
	import * as React from "react";
	import ReactToolbox from 'react-toolbox/lib/index';

	export interface DrawerTheme {
		active?: string;
		content?: string;
		drawer?: string;
		left?: string;
		right?: string;
		wrapper?: string;
	}

	export interface DrawerProps extends ReactToolbox.Props {
		active?: boolean;
		children?: React.ReactNode;
		insideTree?: boolean;
		onOverlayClick?: Function;
		theme?: DrawerTheme;
		type?: "left" | "right";
		withOverlay?: boolean;
	}

	export class Drawer extends React.Component<DrawerProps, {}> { }

	export default Drawer;
}

declare module 'react-toolbox/lib/hoc/ActivableRenderer' {
	import * as React from 'react';
	import ReactToolbox from 'react-toolbox/lib/index';

	export interface FactoryOptions {
		delay?: number;
	}

	export default function Factory<P>(options?: FactoryOptions):
		(<TFunction extends React.ComponentClass<P>>(target: TFunction) => TFunction) &
		((clazz: React.StatelessComponent<P>) => React.StatelessComponent<P>);
}

declare module 'react-toolbox/lib/hoc/Portal' {
	import * as React from 'react';
	import ReactToolbox from 'react-toolbox/lib/index';

	export interface PortalProps extends ReactToolbox.Props {
		container?: any;
		lockBody?: boolean;
	}

	export default class Portal extends React.Component<PortalProps, {}> { }
}

declare module 'react-toolbox/lib/layout' {
	import * as React from "react";
	import ReactToolbox from "react-toolbox/lib/index";
	import { DrawerProps } from 'react-toolbox/lib/drawer';

	export interface LayoutTheme {
		appbarFixed?: string;
		layout?: string;
		navDrawerPinned?: string;
		navDrawerClipped?: string;
		sidebarPinned?: string;
		sidebarClipped?: string;
		sidebarWidth1?: string;
		sidebarWidth2?: string;
		sidebarWidth3?: string;
		sidebarWidth4?: string;
		sidebarWidth5?: string;
		sidebarWidth6?: string;
		sidebarWidth7?: string;
		sidebarWidth8?: string;
		sidebarWidth9?: string;
		sidebarWidth10?: string;
		sidebarWidth11?: string;
		sidebarWidth12?: string;
		sidebarWidth25?: string;
		sidebarWidth33?: string;
		sidebarWidth50?: string;
		sidebarWidth66?: string;
		sidebarWidth75?: string;
		sidebarWidth100?: string;
	}

	export interface LayoutProps extends ReactToolbox.Props {
		children?: [NavDrawer | Panel | Sidebar];
		theme?: LayoutTheme;
	}

	export class Layout extends React.Component<LayoutProps, {}> { }

	export interface NavDrawerTheme {
		pinned?: string;
		clipped?: string;
	}

	export interface NavDrawerProps extends DrawerProps {
		active?: boolean;
		clipped?: boolean;
		onOverlayClick?: Function;
		permanentAt?: "sm" | "smTablet" | "md" | "lg" | "lgTablet" | "xl" | "xxl" | "xxxl";
		pinned?: boolean;
		theme?: NavDrawerTheme;
	}

	export class NavDrawer extends React.Component<NavDrawerProps, {}> { }

	export interface PanelTheme {
		bodyScroll?: string;
		panel?: string;
	}

	export interface PanelProps extends ReactToolbox.Props {
		bodyScroll?: boolean;
		theme?: PanelTheme;
	}

	export class Panel extends React.Component<PanelProps, {}> { }

	export interface SidebarTheme {
  clipped?: string;
  pinned?: string;
}

export interface SidebarProps extends DrawerProps {
  clipped?: boolean;
  permanentAt?: "sm" | "smTablet" | "md" | "lg" | "lgTablet" | "xl" | "xxl" | "xxxl";
  pinned?: boolean;
  theme?: SidebarTheme;
  width?: number; // 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 25 | 33 | 50 | 66 | 75 | 100;
}

export class Sidebar extends React.Component<SidebarProps, {}> { }
}

declare module 'react-toolbox/lib/overlay/Overlay' {
	import * as React from 'react';
	import ReactToolbox from 'react-toolbox/lib/index';

	export interface OverlayTheme {
		active?: string;
		backdrop?: string;
		overlay?: string;
	}

	export interface OverlayProps extends ReactToolbox.Props {
		active?: boolean;
		lockScroll?: boolean;
		onEscKeyDown?: Function;
		theme?: OverlayTheme;
	}

	export default class Overlay extends React.Component<OverlayProps, {}> { }
	export { Overlay }
}
