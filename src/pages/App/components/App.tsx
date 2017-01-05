// Copyright (c) 2017 Panjie Setiawan Wicaksono
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import * as React from 'react';
import { InjectedRouter, RouteComponentProps, withRouter } from 'react-router';
import { observer } from 'mobx-react';
import Flexbox from 'flexbox-react';
import { IFirebaseController } from '../../../controllers/firebase';

export interface AppProps extends RouteComponentProps<{}, {}> {
	firebaseController?: IFirebaseController;
	router?: InjectedRouter;
	onDidMount(name: string): void;
}

const factory: () => React.ComponentClass<AppProps> = () =>
	class App extends React.PureComponent<AppProps, {}> {

		constructor(props?: AppProps, context?: any) {
			super(props, context);
		}

		componentDidMount() {
			const { onDidMount } = this.props;

			onDidMount('auth');
		}

		render(): JSX.Element | null {
			return (
				<Flexbox flexWrap='nowrap' flexDirection='column'
					alignItems='center' justifyContent='center' >
					<div id='fuiContainer'></div>
				</Flexbox>
			)
		}
	}

const AppRaw = withRouter(factory());
AppRaw.displayName = 'AppRaw';

const App = withRouter(observer(factory()));
App.displayName = 'App';

export { AppRaw as Auth, factory as appFactory };
export default App;
