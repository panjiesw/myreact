/**
 * Copyright (c) 2017 Panjie Setiawan Wicaksono <panjie@panjiesw.com>
 *
 * This software is released under the MIT License.
 * https://panjiesw.mit-license.org
 */

import { ObservableMap } from 'mobx';

declare class MR {}

declare namespace MR {
	type FirebaseUser = firebase.User | null;

	interface IDict<V> {
		[key: string]: V;
	}

	interface ITodo {
		title: string;
		items: ObservableMap<ITodoItem>;
	}

	interface ITodoItem {
		title: string;
		done: boolean;
	}
}

export = MR;
export as namespace MR;
