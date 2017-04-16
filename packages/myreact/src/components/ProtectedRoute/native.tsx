// Copyright (c) 2017 Panjie Setiawan Wicaksono
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { inject, observer } from 'mobx-react/native';
import { IProtectedRouteProps, IPProtectedRouteProps, ProtectedRouteRaw } from './index';
import { mInjectedObserver } from '../../utils/mobx';

const protectedRoute = mInjectedObserver<IPProtectedRouteProps>(inject, observer, ProtectedRouteRaw, 'authStore');
protectedRoute.displayName = 'ProtectedNativeRoute';

export { IProtectedRouteProps, IPProtectedRouteProps };
export default protectedRoute;
