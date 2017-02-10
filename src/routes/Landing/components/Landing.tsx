// Copyright (c) 2017 Panjie Setiawan Wicaksono
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import * as React from 'react';
import Flexbox from 'flexbox-react';
import { IRootStore } from 'components/Root/store';

export type LandingProps = {
	rootStore: IRootStore;
};

export default class Landing extends React.PureComponent<LandingProps, React.ComponentState> {
	public componentDidMount() {
		// const {rootStore} = this.props;
		// rootStore.entered('landing');
	}

	public render(): JSX.Element {
		return (
			<Flexbox flexWrap='nowrap' flexDirection='column' alignItems='stretch' element='article'>
				<h1>Hello</h1>
			</Flexbox>
		);
	}
};
