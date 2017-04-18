/**
 * Copyright (c) 2017 Panjie Setiawan Wicaksono <panjie@panjiesw.com>
 *
 * This software is released under the MIT License.
 * https://panjiesw.mit-license.org
 */

import { action, observable } from 'mobx';

export interface IGlobalUIStore {
	title: string;
	drawerOpen: boolean;
	openDrawer(): void;
	closeDrawer(): void;
	toggleDrawer(): void;
}

class GlobalUIStore implements IGlobalUIStore {
	@observable public title: string = 'My React';
	@observable public drawerOpen: boolean = false;

	@action.bound public openDrawer() {
		this.drawerOpen = true;
	}

	@action.bound public closeDrawer() {
		this.drawerOpen = false;
	}

	@action.bound public toggleDrawer() {
		this.drawerOpen = !this.drawerOpen;
	}
}

export default GlobalUIStore;
