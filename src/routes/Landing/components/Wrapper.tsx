// Copyright (c) 2017 Panjie Setiawan Wicaksono
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import * as React from 'react';
import { rootStore } from '../../../components/Root';
import Landing from './Landing';

const LandingWrapper: React.StatelessComponent<{}> = () => (
	<Landing rootStore={rootStore} />
)
LandingWrapper.displayName = 'LandingWrapper';

export default LandingWrapper;
