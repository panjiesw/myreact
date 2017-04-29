/**
 * Copyright (c) 2017 Panjie Setiawan Wicaksono <panjie@panjiesw.com>
 *
 * This software is released under the MIT License.
 * https://panjiesw.mit-license.org
 */

declare interface NodeModule {
	hot?: {
		accept(ac?: string | string[], cb?: Function): void;
	}
}

declare var module: NodeModule;
