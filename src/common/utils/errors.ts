/**
 * Copyright (c) 2017 Panjie Setiawan Wicaksono <panjie@panjiesw.com>
 *
 * This software is released under the MIT License.
 * https://panjiesw.mit-license.org
 */

export function parseError(err: any): string {
	return err.message ?
		err.message : typeof err === 'string' ?
			err : `Unknown Error ${err}`;
}
