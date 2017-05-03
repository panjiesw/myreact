/**
 * Copyright (c) 2017 Panjie Setiawan Wicaksono <panjie@panjiesw.com>
 *
 * This software is released under the MIT License.
 * https://panjiesw.mit-license.org
 */

import { LoadedComponent, LoadableComponent } from 'react-loadable';
import Loadable from 'web/components/Loadable';
import AppModule, { IAppProps } from './components/App';

const App: LoadedComponent<IAppProps> & LoadableComponent = Loadable<IAppProps, typeof AppModule>({
	loader: () => System.import<typeof AppModule>(/* webpackChunkName: "module.app" */ './components/App'),
});

export default App;
