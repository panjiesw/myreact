// Copyright (c) 2017 Panjie Setiawan Wicaksono
//
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php

import { rootFactory, RootProps } from './Root';
import { RootStore, IRootStore } from './store';

const rootStore = new RootStore();

const Root = rootFactory(rootStore);
Root.displayName = 'Root';

export { Root, RootProps, IRootStore, rootStore };
