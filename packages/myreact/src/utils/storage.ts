// Copyright (c) 2017 Panjie Setiawan Wicaksono
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import localforage from 'localforage';

export interface IAppStorageOptions {
	driver: string;
}

abstract class AppStorage {
	protected lf: LocalForage;
	protected keys = {
		userState: 'us',
	};

	constructor({ driver }: IAppStorageOptions) {
		this.lf = localforage.createInstance({
			driver,
			description: 'MyReact Storage Instance',
			name: 'myreact',
			storeName: 'myreactdb',
			version: 1,
		});
	}

	public getUserState = (): Promise<any> => {
		return this.lf.getItem(this.keys.userState);
	}
}

export default AppStorage;
