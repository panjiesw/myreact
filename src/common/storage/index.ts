// Copyright (c) 2017 Panjie Setiawan Wicaksono
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import localforage from 'localforage';
import * as states from './states';

export interface IAppStorageOptions {
	driver: string;
}

export interface IAppStorage {
	getUserState(): Promise<states.IUserState>;
	setUserState(state: states.IUserState): Promise<any>;
}

export const USER_STATE_KEY = 'us';

abstract class AppStorage implements IAppStorage {
	protected lf: LocalForage;

	constructor({ driver }: IAppStorageOptions) {
		this.lf = localforage.createInstance({
			driver,
			description: 'MyReact Storage Instance',
			name: 'myreact',
			storeName: 'myreactdb',
			version: 1,
		});
	}

	public getUserState = (): Promise<states.IUserState> => {
		return this.lf.getItem<states.IUserState>(USER_STATE_KEY);
	}

	public setUserState = (state: states.IUserState): Promise<any> => {
		return this.lf.setItem(USER_STATE_KEY, state);
	}
}

export { states };

export default AppStorage;
