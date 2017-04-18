/**
 * Copyright (c) 2017 Panjie Setiawan Wicaksono <panjie@panjiesw.com>
 *
 * This software is released under the MIT License.
 * https://panjiesw.mit-license.org
 */

import { inject, observer } from 'mobx-react';
import { IPProtectedRouteProps, IProtectedRouteProps, ProtectedRouteRaw } from 'common/components/ProtectedRoute';
import { mInjectedObserver } from 'common/utils/mobx';

const protectedRoute = mInjectedObserver<IPProtectedRouteProps>(inject, observer, ProtectedRouteRaw, 'authStore');
protectedRoute.displayName = 'ProtectedWebRoute';

export { IProtectedRouteProps, IPProtectedRouteProps };
export default protectedRoute;
