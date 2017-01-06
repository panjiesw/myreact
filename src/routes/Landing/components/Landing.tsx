// Copyright (c) 2016 Panjie Setiawan Wicaksono
//
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php

import * as React from 'react';
import { Link, withRouter } from 'react-router';
import { AppBar } from 'react-toolbox/lib/app_bar/AppBar';
import Flexbox from 'flexbox-react';
import { IRootStore } from '../../../components/Root';
import * as theme from './theme.css';

export interface LandingProps {
	rootStore?: IRootStore;
}

const factory: () => React.ComponentClass<LandingProps> = () =>
	class Landing extends React.PureComponent<LandingProps, {}> {
		constructor(props?: LandingProps, context?: any) {
			super(props, context);
		}

		componentDidMount() {
			const {rootStore} = this.props;
			if (rootStore) {
				rootStore.entered('landing');
			}
		}

		render(): JSX.Element | null {
			return (
				<Flexbox flexWrap='nowrap' flexDirection='column'
					alignItems='stretch' element='article' >
					<AppBar fixed flat
						theme={theme}
						title='My React Playground'>
					</AppBar>
					<Link to={{pathname: 'auth', state: {inpage: 'auth'}}}>Auth</Link>
					<Link to={{pathname: 'auth', state: {inpage: 'auth'}}}>Auth</Link>
					<Link to={{pathname: 'auth', state: {inpage: 'auth'}}}>Auth</Link>
					<Link to={{pathname: 'auth', state: {inpage: 'auth'}}}>Auth</Link>
					<Link to={{pathname: 'auth', state: {inpage: 'auth'}}}>Auth</Link>
					<Link to={{pathname: 'auth', state: {inpage: 'auth'}}}>Auth</Link>
					<Link to={{pathname: 'auth', state: {inpage: 'auth'}}}>Auth</Link>
					<Link to={{pathname: 'auth', state: {inpage: 'auth'}}}>Auth</Link>
					<Link to={{pathname: 'auth', state: {inpage: 'auth'}}}>Auth</Link>
					<Link to={{pathname: 'auth', state: {inpage: 'auth'}}}>Auth</Link>
					<Link to={{pathname: 'auth', state: {inpage: 'auth'}}}>Auth</Link>
					<Link to={{pathname: 'auth', state: {inpage: 'auth'}}}>Auth</Link>
					<Link to={{pathname: 'auth', state: {inpage: 'auth'}}}>Auth</Link>
					<Link to={{pathname: 'auth', state: {inpage: 'auth'}}}>Auth</Link>
				</Flexbox>
			)
		}
	}

const Landing = withRouter(factory());
Landing.displayName = 'Landing';

export { Landing, factory as landingFactory };
export default Landing;
