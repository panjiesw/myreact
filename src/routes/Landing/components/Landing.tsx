// Copyright (c) 2017 Panjie Setiawan Wicaksono
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import React, { PureComponent, ComponentState } from 'react';
import { InjectedRouter } from 'react-router';
import Flexbox from 'flexbox-react';
import { IRootStore } from 'components/Root/store';
import Button from 'react-md/lib/Buttons/Button';

export type LandingProps = {
	rootStore: IRootStore;
	router: InjectedRouter;
};

export default class Landing extends PureComponent<LandingProps, ComponentState> {

	public componentDidMount() {
		const {rootStore} = this.props;
		rootStore.entered('landing');
	}

	public render(): JSX.Element {
		return (
			<Flexbox width='100%'
				flexWrap='nowrap' flexDirection='column'
				alignItems='center' justifyContent='center' element='article'>
				<Button raised primary label='Go To App' onClick={this.goToApp}></Button>
			</Flexbox>
		);
	}

	private goToApp = () => {
		this.props.router.push('/app');
	}
};
