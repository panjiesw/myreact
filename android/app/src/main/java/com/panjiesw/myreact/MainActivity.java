/*
 * Copyright (c) 2017 Panjie Setiawan Wicaksono (panjie@panjiesw.com)
 *
 * This software is released under the MIT License.
 * https://panjiesw.mit-license.org
 */

package com.panjiesw.myreact;

import android.content.Intent;
import com.facebook.react.ReactActivity;

public class MainActivity extends ReactActivity {

	@Override
	public void onActivityResult(int requestCode, int resultCode, Intent data) {
		super.onActivityResult(requestCode, resultCode, data);
		MainApplication.getCallbackManager().onActivityResult(requestCode, resultCode, data);
	}

	/**
	 * Returns the name of the main component registered from JavaScript.
	 * This is used to schedule rendering of the component.
	 */
	@Override
	protected String getMainComponentName() {
		return "MyReact";
	}
}
