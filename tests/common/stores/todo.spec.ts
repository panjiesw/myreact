/**
 * Copyright (c) 2017 Panjie Setiawan Wicaksono <panjie@panjiesw.com>
 *
 * This software is released under the MIT License.
 * https://panjiesw.mit-license.org
 */

import test from 'ava';
import fbdb from 'common/fbdbmock';
import * as f from './fixture';

test('initialize', async t => {
	const { todoStore } = f.todoStore();
	await todoStore.initialize();

	t.false(todoStore.loading, 'Loading is now false');
	t.true(todoStore.initialized, 'Store is now initialized');
	t.deepEqual(
		todoStore.publicTodosJS(),
		fbdb['public-todos'],
		'Public store properly initialized',
	);
	t.deepEqual(
		todoStore.userTodosJS(),
		fbdb['user-todos'].testuser,
	);
});
