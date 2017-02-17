// Copyright (c) 2017 Panjie Setiawan Wicaksono
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { EnterHook } from 'react-router';

export interface IRootStore {
	adjustRootLayout: Function | undefined;
	rootHook: Function | undefined;
	mountedHook: Function | undefined;
	entered(name: string): void;
	onRouteEnter(next?: Function): EnterHook;
}

export type RootHook = (spinnerTheme?: any) => void | undefined;

export default class RootStore implements IRootStore {
	public rootHook: RootHook;
	public mountedHook: Function | undefined;
	public adjustRootLayout: Function | undefined;

	constructor(private enteredSection = new Map<string, any>()) { }

	public entered = (name: string) => {
		if (this.mountedHook) {
			this.mountedHook();
		}
		this.enteredSection.set(name, name);
	}

	public onRouteEnter = (next?: EnterHook): EnterHook => (nextState, replace, cb) => {
		if (this.rootHook &&
			nextState &&
			nextState.location.state &&
			(nextState.location.state as any).inpage &&
			!this.enteredSection.has((nextState.location.state as any).inpage)) {
			this.rootHook((nextState.location.state as any).spinnerTheme);
		}
		if (next) {
			next(nextState, replace, cb);
		} else {
			if (cb) {
				cb();
			}
		}
	}
}
