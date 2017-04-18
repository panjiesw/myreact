/**
 * Copyright (c) 2017 Panjie Setiawan Wicaksono <panjie@panjiesw.com>
 *
 * This software is released under the MIT License.
 * https://panjiesw.mit-license.org
 */

import { ComponentClass, SFC } from 'react';
import { inject, observer } from 'mobx-react';

export function mInjectedObserver<T>(
	_inject: typeof inject,
	_observer: typeof observer,
	component: ComponentClass<T> | SFC<T>,
	...stores: string[]) {
	return _inject<T>(...stores)(_observer(component));
}
