// Copyright (c) 2017 Panjie Setiawan Wicaksono
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { inject, observer } from 'mobx-react';
import { IProtectedRouteProps, IPProtectedRouteProps, ProtectedRouteRaw } from 'common/components/ProtectedRoute';
import { mInjectedObserver } from 'common/utils/mobx';

const protectedRoute = mInjectedObserver<IPProtectedRouteProps>(inject, observer, ProtectedRouteRaw, 'authStore');
protectedRoute.displayName = 'ProtectedWebRoute';

export { IProtectedRouteProps, IPProtectedRouteProps };
export default protectedRoute;
