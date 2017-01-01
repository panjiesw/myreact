// Copyright (c) 2017 Panjie Setiawan Wicaksono
//
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php

import { rootFactory, RootProps } from './Root';
import { RootController, IRootController } from './controller';

const rootController = new RootController();

const Root = rootFactory(rootController);
Root.displayName = 'Root';

export { Root, RootProps, IRootController, rootController };
