/**
 * Copyright (c) 2017 Panjie Setiawan Wicaksono <panjie@panjiesw.com>
 *
 * This software is released under the MIT License.
 * https://panjiesw.mit-license.org
 */

import OriginalLoadable, {LoadedComponent, LoadableComponent} from 'react-loadable';
import { observer } from 'mobx-react';
import LoadingComponent from './LoadingComponent';

export type Options<Props, T extends object> = IOptionsWithoutResolve<Props> | IOptionsWithResolve<Props, T>;

export interface ICommonOptions {
	/**
	 * In order for Loadable to require() a component synchronously (when possible) instead of waiting for
	 * the promise returned by import() to resolve. If you are using Webpack you should use this option.
	 *
	 * ```ts
	 * Loadable({
	 *     // ...
	 *     webpackRequireWeakId: () => require.resolveWeak('./MyComponent')
	 * });
	 * ```
	 *
	 * If you are using Babel, you might want to use the Babel plugin to add this option automatically.
	 */
	webpackRequireWeakId?(): number | string;
}

export interface IOptionsWithoutResolve<Props> extends ICommonOptions {
	/**
	 * Function returning promise returning a React component displayed on success.
	 *
	 * Resulting React component receives all the props passed to the generated component.
	 */
	loader(): Promise<LoadedComponent<Props> | { default: LoadedComponent<Props> }>;
}

export interface IOptionsWithResolve<Props, T extends object> extends ICommonOptions {
	/**
	 * Function returning promise returning a React component displayed on success.
	 *
	 * Resulting React component receives all the props passed to the generated component.
	 */
	loader(): Promise<T>;
	/**
	 * If the component that you want to load is not the default exported from a module you can use this
	 * function to resolve it.
	 *
	 * ```ts
	 * Loadable({
	 *     // ...
	 *     resolveModule: module => module.MyComponent
	 * });
	 * ```
	 */
	resolveModule(obj: T): LoadedComponent<Props>;
}

function Loadable<P, T extends object>(options: Options<P, T>): LoadedComponent<P> & LoadableComponent {
	return observer<P, any>(
		OriginalLoadable<P, T>({
			LoadingComponent,
			delay: 200,
			...options,
		}),
	);
}

export default Loadable;
