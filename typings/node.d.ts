/**
 * Copyright (c) 2017 Panjie Setiawan Wicaksono <panjie@panjiesw.com>
 *
 * This software is released under the MIT License.
 * https://panjiesw.mit-license.org
 */

declare var __DEV__: boolean;

declare interface NodeModule {
	hot?: {
		accept(ac?: string | string[], cb?: Function): void;
	}
}

declare interface NodeRequire {
	resolveWeak(id: string): any;
}

declare var module: NodeModule;
