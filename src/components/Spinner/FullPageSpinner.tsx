// Copyright (c) 2017 Panjie Setiawan Wicaksono
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import React, { PureComponent } from 'react';
import cn from 'classnames';
import Portal from 'react-md/lib/Helpers/Portal';
import TICK from 'react-md/lib/constants/CSSTransitionGroupTick';

export type FullPageSpinnerTheme = {
	mdOverlay: string;
	mdOverlayActive: string;
	mySpinnerContainer: string;
	mySpinner: string;
	mySpinnerRect1: string;
	mySpinnerRect2: string;
	mySpinnerRect3: string;
	mySpinnerRect4: string;
	mySpinnerRect5: string;
};

export type FullPageSpinnerProps = {
	theme: FullPageSpinnerTheme;
	active: boolean;
	className?: string;
};

export type FullPageSpinnerState = {
	overlay: boolean;
	overlayActive: boolean;
};

class FullPageSpinner extends PureComponent<FullPageSpinnerProps, FullPageSpinnerState> {
	public state: FullPageSpinnerState = {
		overlay: false,
		overlayActive: false,
	};

	private timeout: number | null = null;

	public componentWillUnmount() {
		if (this.timeout) {
			clearTimeout(this.timeout);
		}
	}

	public componentWillReceiveProps(props: FullPageSpinnerProps) {
		const {active} = props;
		if (active === true) {
			this.showOverlay();
		} else if (active === false) {
			this.hideOverlay();
		}
	}

	public render(): JSX.Element {
		const {overlay, overlayActive} = this.state;
		const {className, theme} = this.props;
		const cssOverlay = cn(theme.mdOverlay, {
			[theme.mdOverlayActive]: overlayActive,
		});
		const cssContainer = cn(className, theme.mySpinnerContainer);
		return (
			<Portal visible={overlay}>
				<div className={cssOverlay}>
					<div className={cssContainer}>
						<div className={theme.mySpinner}>
							<div className={theme.mySpinnerRect1}></div>
							<div className={theme.mySpinnerRect2}></div>
							<div className={theme.mySpinnerRect3}></div>
							<div className={theme.mySpinnerRect4}></div>
							<div className={theme.mySpinnerRect5}></div>
						</div>
					</div>
				</div>
			</Portal>
		);
	}

	private showOverlay = () => {
		if (this.timeout) {
			clearTimeout(this.timeout);
		}
		this.timeout = window.setTimeout(() => {
			this.timeout = null;
			this.setState({ overlayActive: true });
		}, TICK);
		this.setState({ overlay: true });
	}

	private hideOverlay = () => {
		if (this.timeout) {
			clearTimeout(this.timeout);
		}
		this.timeout = window.setTimeout(() => {
			this.timeout = null;
			this.setState({ overlay: false });
		}, 150);
		this.setState({ overlayActive: false });
	}
}

export default FullPageSpinner;
