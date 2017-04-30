/**
 * Copyright (c) 2017 Panjie Setiawan Wicaksono <panjie@panjiesw.com>
 *
 * This software is released under the MIT License.
 * https://panjiesw.mit-license.org
 */

import { action, observable } from 'mobx';

export interface IGlobalUIStore {
	readonly loading: boolean;
	setLoading(loading?: boolean): void;
}

class GlobalUIStore implements IGlobalUIStore {
	@observable public loading: boolean = false;

	@action('GlobalUIStore.setLoading')
	public setLoading(loading = true) {
		this.loading = loading;
	}
}

export default GlobalUIStore;
