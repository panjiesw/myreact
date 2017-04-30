/**
 * Copyright (c) 2017 Panjie Setiawan Wicaksono <panjie@panjiesw.com>
 *
 * This software is released under the MIT License.
 * https://panjiesw.mit-license.org
 */

import React, { SFC } from 'react';
import { LoadingComponentProps } from 'react-loadable';

const LoadingComponent: SFC<LoadingComponentProps> = () => (
	<div className="my-spinner-start-container">
		<div className="my-spinner-start">
			<div className="my-spinner-start-rect1" />
			<div className="my-spinner-start-rect2" />
			<div className="my-spinner-start-rect3" />
			<div className="my-spinner-start-rect4" />
			<div className="my-spinner-start-rect5" />
		</div>
	</div>
);

export default LoadingComponent;
