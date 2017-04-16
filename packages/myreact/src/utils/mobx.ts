// Copyright (c) 2017 Panjie Setiawan Wicaksono
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { ComponentClass, SFC } from 'react';
import { inject, observer } from 'mobx-react';

export function mInjectedObserver<T>(
	_inject: typeof inject,
	_observer: typeof observer,
	component: ComponentClass<T> | SFC<T>,
	...stores: string[]) {
	return _inject<T>(...stores)(_observer(component));
}
