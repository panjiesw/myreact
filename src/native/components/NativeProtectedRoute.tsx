// Copyright (c) 2017 Panjie Setiawan Wicaksono
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { inject, observer } from 'mobx-react/native';
import { IProtectedRouteProps, IPProtectedRouteProps, ProtectedRouteRaw } from 'common/components/ProtectedRoute';
// import { mInjectedObserver } from 'common/utils/mobx';

const protectedRoute = inject<IPProtectedRouteProps>('authStore', 'fb')(
	observer<IPProtectedRouteProps>(ProtectedRouteRaw));
protectedRoute.displayName = 'ProtectedNativeRoute';

export { IProtectedRouteProps, IPProtectedRouteProps };
export default protectedRoute;
