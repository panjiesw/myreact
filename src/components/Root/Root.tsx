// Copyright (c) 2017 Panjie Setiawan Wicaksono
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import Flexbox from 'flexbox-react';
import FullPageSpinner, {FullPageSpinnerTheme} from 'components/Spinner/FullPageSpinner';
import { IRootStore } from './store';
import * as defaultSpinnerTheme from 'components/Spinner/full-page-spinner-default.scss';

export interface IRootProps extends RouteComponentProps<{}, {}> {
}

export type RootState = {
	spinnerActive: boolean;
	spinnerTheme: FullPageSpinnerTheme;
};

const factory = (store: IRootStore): React.ComponentClass<IRootProps> =>
	class Root extends React.PureComponent<IRootProps, RootState> {
		public state: RootState = {
			spinnerActive: false,
			spinnerTheme: defaultSpinnerTheme,
		};

		public activateSpinner = (spinnerTheme: FullPageSpinnerTheme = defaultSpinnerTheme) => {
			this.setState({ spinnerActive: true, spinnerTheme });
		}

		public deactivateSpinner = () => {
			this.setState({ spinnerActive: false });
		}

		public componentWillMount() {
			store.rootHook = this.activateSpinner;
			store.mountedHook = this.deactivateSpinner;
		}

		public render(): JSX.Element {
			const {spinnerActive, spinnerTheme} = this.state;
			return (
				<Flexbox flexWrap='nowrap' alignItems='stretch'>
					<FullPageSpinner active={spinnerActive} theme={spinnerTheme} />
					{this.props.children}
				</Flexbox>
			);
		}
	};

export { factory as rootFactory };
