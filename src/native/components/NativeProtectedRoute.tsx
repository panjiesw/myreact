/**
 * Copyright (c) 2017 Panjie Setiawan Wicaksono <panjie@panjiesw.com>
 *
 * This software is released under the MIT License.
 * https://panjiesw.mit-license.org
 */

import { inject, observer } from 'mobx-react/native';
import { IPProtectedRouteProps, IProtectedRouteProps, ProtectedRouteRaw } from 'common/components/ProtectedRoute';
// import { mInjectedObserver } from 'common/utils/mobx';

const protectedRoute = inject<IPProtectedRouteProps>('authStore', 'fb')(
	observer<IPProtectedRouteProps>(ProtectedRouteRaw));
protectedRoute.displayName = 'ProtectedNativeRoute';

export { IProtectedRouteProps, IPProtectedRouteProps };
export default protectedRoute;
