// Copyright (c) 2016 Panjie Setiawan Wicaksono
//
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php

import * as React from 'react';

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
			return <h1>{'Hello, World!'}</h1>
		}
	}

export { factory as landingFactory };
