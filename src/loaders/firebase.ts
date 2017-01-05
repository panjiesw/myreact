// Copyright (c) 2017 Panjie Setiawan Wicaksono
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

// import * as firebase from 'firebase';
import * as $script from 'scriptjs';

$script(`https://www.gstatic.com/firebasejs/3.6.4/firebase.js`, 'firebase');

const loadFirebase = () => new Promise<void>(resolve => {
	$script.ready('firebase', resolve)
});

export { loadFirebase };
export default loadFirebase;
