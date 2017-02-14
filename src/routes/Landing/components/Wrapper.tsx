// Copyright (c) 2017 Panjie Setiawan Wicaksono
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import * as React from 'react';
import { InjectedRouter, withRouter } from 'react-router';
import { rootStore } from 'components/Root';
import Landing from './Landing';

const LandingWrapper: React.StatelessComponent<{
	router: InjectedRouter;
}> = ({router}) => (
	<Landing rootStore={rootStore} router={router} />
);
LandingWrapper.displayName = 'LandingWrapper';

export default withRouter(LandingWrapper);
