// Copyright (c) 2017 Panjie Setiawan Wicaksono
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { rootFactory, IRootProps } from './Root';
import RootStore, { IRootStore } from './store';

const rootStore = new RootStore();

const Root = rootFactory(rootStore);
Root.displayName = 'Root';

export { Root, IRootProps, IRootStore, rootStore };
