/**
 * Copyright (c) 2017 Panjie Setiawan Wicaksono <panjie@panjiesw.com>
 *
 * This software is released under the MIT License.
 * https://panjiesw.mit-license.org
 */

import { LoadedComponent, LoadableComponent } from 'react-loadable';
import Loadable from 'web/components/Loadable';
import AuthModule, { IAuthProps } from './Auth';

const Auth: LoadedComponent<IAuthProps> & LoadableComponent = Loadable<IAuthProps, typeof AuthModule>({
	loader: () => System.import<typeof AuthModule>(/* webpackChunkName: "module.auth" */ './Auth'),
	webpackRequireWeakId: () => require.resolveWeak('./Auth'),
});

export default Auth;
