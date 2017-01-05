// Copyright (c) 2016 Panjie Setiawan Wicaksono
//
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php

import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import Flexbox from 'flexbox-react';
import { FullPageSpinner } from '../Spinner';
import { IRootController } from './controller';

export interface RootProps extends RouteComponentProps<{}, {}> {
}

export interface RootState {
	spinnerActive: boolean;
}

const factory = (controller: IRootController): React.ComponentClass<RootProps> =>
	class Root extends React.PureComponent<RootProps, RootState> {
		state: RootState = {
			spinnerActive: false
		}

		activateSpinner = () => {
			this.setState({ spinnerActive: true });
		}

		deactivateSpinner = () => {
			this.setState({ spinnerActive: false });
		}

		constructor(props?: RootProps, context?: any) {
			super(props, context)
			// this.setState({ spinnerActive: false })
		}

		componentWillMount() {
			controller.rootHook = this.activateSpinner;
			controller.mountedHook = this.deactivateSpinner;
		}

		render(): JSX.Element | null {
			return (
				<Flexbox flexWrap='nowrap' alignItems='stretch'>
					<FullPageSpinner active={this.state.spinnerActive} />
					{this.props.children}
				</Flexbox>
			)
		}
	}

export {factory as rootFactory};
