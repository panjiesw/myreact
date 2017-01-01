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

		onDidMount = (name: string) => {
			this.setState({ spinnerActive: false });
			controller.entered(name);
		}

		constructor(props?: RootProps, context?: any) {
			super(props, context)
			// this.setState({ spinnerActive: false })
		}

		componentWillMount() {
			controller.rootHook = this.activateSpinner;
		}

		render(): JSX.Element | null {
			return (
				<Flexbox flexWrap='nowrap' alignItems='center'
					justifyContent='center'>
					{<FullPageSpinner active={this.state.spinnerActive} />}
					{
						this.props.children && React.cloneElement((this.props.children as React.ReactElement<any>), {
							onDidMount: this.onDidMount
						})
					}
				</Flexbox>
			)
		}
	}

export {factory as rootFactory};
