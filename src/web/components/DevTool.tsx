/**
 * Copyright (c) 2017 Panjie Setiawan Wicaksono <panjie@panjiesw.com>
 *
 * This software is released under the MIT License.
 * https://panjiesw.mit-license.org
 */

import MobxDevTool, {IDevToolProps} from 'mobx-react-devtools';
import Loadable from 'react-loadable';

const DevTool = Loadable<IDevToolProps, any>({
	loader: () => {
		if (process.env.NODE_ENV === 'development') {
			return System.import<typeof MobxDevTool>('mobx-react-devtools');
		}
		return Promise.resolve<any>(() => null);
	},
	LoadingComponent: () => null,
});

export default DevTool;
