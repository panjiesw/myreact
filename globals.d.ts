// Copyright (c) 2016 Panjie Setiawan Wicaksono
//
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php

declare interface NodeRequire {
	<T>(path: string): T;
	(paths: string[], callback: (...modules: any[]) => void): void;
	ensure: (paths: string[], callback: (require: <T>(path: string) => T) => void, chunkName?: string) => void;
}

declare interface TDReq<T> {
	default: T
}

declare interface Window {
	Promise?: PromiseConstructor;
	Symbol?: Symbol;
}
