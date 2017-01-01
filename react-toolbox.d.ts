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
