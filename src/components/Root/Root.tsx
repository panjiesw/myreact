// Copyright (c) 2016 Panjie Setiawan Wicaksono
//
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php

import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Row, Col } from 'components/Flex';
import { FullPageSpinner } from 'components/Spinner';
import { IRootStore } from './store';

export interface RootProps extends RouteComponentProps<{}, {}> {
}

export interface RootState {
	spinnerActive: boolean;
}

const factory = (store: IRootStore): React.ComponentClass<RootProps> =>
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
			store.rootHook = this.activateSpinner;
			store.mountedHook = this.deactivateSpinner;
		}

		render(): JSX.Element | null {
			return (
				<Row style={{margin: '0'}}>
					<FullPageSpinner active={this.state.spinnerActive} />
					<Col xs={12}>
						{this.props.children}
					</Col>
				</Row>
			)
		}
	}

export { factory as rootFactory };
