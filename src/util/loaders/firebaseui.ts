// Copyright (c) 2017 Panjie Setiawan Wicaksono
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import * as $script from 'scriptjs';

$script(`https://cdn.firebase.com/libs/firebaseui/${process.env.FIREBASEUI_VERSION}/firebaseui.js`, 'firebaseui');

const loadFirebaseUI = () => new Promise<void>((resolve) => {
	$script.ready('firebase', () => {
		$script.ready('firebaseui', resolve);
	});
});

export default loadFirebaseUI;
