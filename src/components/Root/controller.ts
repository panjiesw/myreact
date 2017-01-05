// Copyright (c) 2017 Panjie Setiawan Wicaksono
//
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php

import { EnterHook } from 'react-router';

export interface IRootController {
	rootHook: Function | undefined;
	mountedHook: Function | undefined;
	entered(name: string): void;
	onRouteEnter(next?: Function): EnterHook;
}

export class RootController implements IRootController {
	rootHook: Function | undefined;
	mountedHook: Function | undefined;

	constructor(private enteredSection = new Map<string, any>()) { }

	entered = (name: string) => {
		if (this.mountedHook) {
			this.mountedHook();
		}
		this.enteredSection.set(name, name);
	}

	onRouteEnter = (next?: EnterHook): EnterHook => (nextState, replace, cb) => {
		if (this.rootHook &&
			nextState &&
			nextState.location.state &&
			(nextState.location.state as any).inpage &&
			!this.enteredSection.has((nextState.location.state as any).inpage)) {
			this.rootHook();
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
