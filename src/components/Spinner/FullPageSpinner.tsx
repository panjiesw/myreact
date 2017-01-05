// Copyright (c) 2016 Panjie Setiawan Wicaksono
//
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php

import * as React from 'react';
import Portal from 'react-toolbox/lib/hoc/Portal';
import ActivableRenderer from 'react-toolbox/lib/hoc/ActivableRenderer';
import { Overlay as InjectedOverlay, OverlayProps } from 'react-toolbox/lib/overlay/Overlay';
import * as theme from './theme.css';

export interface FullPageSpinnerProps {
	active?: boolean;
	className?: string;
}

const factory = (Overlay: React.ComponentClass<OverlayProps>): React.StatelessComponent<FullPageSpinnerProps> => {
	const Spinner = (props: FullPageSpinnerProps) => {
		return (
			<Portal className={theme.wrapper}>
				<Overlay active={props.active} theme={theme}>
					<div className={theme.spinnerContainer}>
						<div className={theme.spinner}>
							<div className='rect1'></div>
							<div className={theme.rect2}></div>
							<div className={theme.rect3}></div>
							<div className={theme.rect4}></div>
							<div className={theme.rect5}></div>
						</div>
					</div>
				</Overlay>
			</Portal>
		)
	}

	return ActivableRenderer()(Spinner);
}

const FullPageSpinner = factory(InjectedOverlay);
FullPageSpinner.displayName = 'FullPageSpinner';

export default FullPageSpinner;
