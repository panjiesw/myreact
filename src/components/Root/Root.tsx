// Copyright (c) 2017 Panjie Setiawan Wicaksono
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import React, { PureComponent, ComponentClass } from 'react';
import { RouteComponentProps } from 'react-router';
import Flexbox, { FlexboxProps } from 'flexbox-react';
import FullPageSpinner, { FullPageSpinnerTheme } from 'components/Spinner/FullPageSpinner';
import { IRootStore } from './store';
import * as defaultSpinnerTheme from 'components/Spinner/full-page-spinner-default.scss';

export interface IRootProps extends RouteComponentProps<{}, {}> {
}

export type RootState = {
	spinnerActive: boolean;
	spinnerTheme: FullPageSpinnerTheme;
	rootLayout: FlexboxProps;
};

const factory = (store: IRootStore): ComponentClass<IRootProps> =>
	class Root extends PureComponent<IRootProps, RootState> {
		public state: RootState = {
			spinnerActive: false,
			spinnerTheme: defaultSpinnerTheme,
			rootLayout: {},
		};

		public activateSpinner = (spinnerTheme: FullPageSpinnerTheme = defaultSpinnerTheme) => {
			this.setState({ spinnerActive: true, spinnerTheme });
		}

		public deactivateSpinner = () => {
			this.setState({ spinnerActive: false });
		}

		public adjustLayout = (rootLayout: FlexboxProps = {}) => {
			this.setState({ rootLayout });
		}

		public componentWillMount() {
			store.rootHook = this.activateSpinner;
			store.mountedHook = this.deactivateSpinner;
			store.adjustRootLayout = this.adjustLayout;
		}

		public render(): JSX.Element {
			const {spinnerActive, spinnerTheme, rootLayout} = this.state;
			return (
				<Flexbox flexWrap='nowrap' alignItems='stretch' {...rootLayout}>
					<FullPageSpinner active={spinnerActive} theme={spinnerTheme} />
					{this.props.children}
				</Flexbox>
			);
		}
	};

export { factory as rootFactory };
