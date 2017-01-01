// Copyright (c) 2017 Panjie Setiawan Wicaksono
//
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php

import { EnterHook } from 'react-router';

export interface IRootController {
	rootHook: Function;
	entered(name: string): void;
	onRouteEnter(next?: Function): EnterHook;
}

export class RootController implements IRootController {
	rootHook: Function;

	constructor(private enteredSection = new Map<string, any>()) { }

	entered = (name: string) => {
		this.enteredSection.set(name, name);
	}

	onRouteEnter = (next?: Function): EnterHook => (nextState, replace, cb) => {
		if (nextState &&
			nextState.params['inpage'] &&
			!this.enteredSection.has(nextState.params['inpage'])) {
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
