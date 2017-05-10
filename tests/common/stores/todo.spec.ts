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
	const { firebaseServer, todoStore } = f.todoStore();
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
	f.closeFirebaseServer(firebaseServer);
});

test('publishUserTodo', async t => {
	const { firebaseServer, todoStore } = f.todoStore();
	await todoStore.initialize();

	const key = await todoStore.publishUserTodo('new todo');
	const data = await firebaseServer.getValue();

	t.not(key, null, 'Publish generate key');
	t.is(
		data['user-todos'].testuser[key as string].title,
		'new todo',
		'New user\'s todo is correctly published',
	);
});

test('publishUserTodoItem', async t => {
	const { firebaseServer, todoStore } = f.todoStore();
	await todoStore.initialize();

	const key = await todoStore.publishUserTodo('new todo');
	const itemKey = await todoStore
		.publishUserTodoItem(key as string, 'new todo item');
	const data = await firebaseServer.getValue();

	t.not(itemKey, null, 'Publish generate key');
	t.deepEqual(
		data['user-todos'].testuser[key as string].todo[itemKey as string],
		{
			title: 'new todo item',
			done: false,
		},
	);
});
