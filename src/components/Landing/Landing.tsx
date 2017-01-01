// Copyright (c) 2016 Panjie Setiawan Wicaksono
//
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php

import * as React from 'react';
import { AppBar } from 'react-toolbox/lib/app_bar/AppBar';
import Flexbox from 'flexbox-react';
import * as theme from './theme.css';

export interface LandingProps {
	onDidMount(name: string): void;
}

const factory: () => React.ComponentClass<LandingProps> = () =>
	class Landing extends React.PureComponent<LandingProps, {}> {
		constructor(props?: LandingProps, context?: any) {
			super(props, context);
		}

		componentDidMount() {
			this.props.onDidMount('landing');
		}

		render(): JSX.Element | null {
			return (
				<Flexbox flexWrap='nowrap' flexDirection='column'
					alignItems='center' justifyContent='center' >
					<AppBar fixed flat
						theme={theme}
						title='My React Playground'>
					</AppBar>
				</Flexbox>
			)
		}
	}

export { factory as landingFactory };
