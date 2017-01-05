// Copyright (c) 2017 Panjie Setiawan Wicaksono
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import * as React from 'react';
import { rootController } from '../../../components/Root';
import Landing from './Landing';

const LandingWrapper: React.StatelessComponent<{}> = () => (
	<Landing rootController={rootController} />
)
LandingWrapper.displayName = 'LandingWrapper';

export default LandingWrapper;
