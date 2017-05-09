/**
 * Copyright (c) 2017 Panjie Setiawan Wicaksono <panjie@panjiesw.com>
 *
 * This software is released under the MIT License.
 * https://panjiesw.mit-license.org
 */

const db: MR.IDict<any> = {
	'public-todos': {
		'ptodos-1': {
			title: 'Public Todos 1',
			todo: {
				'ptodo-1-1': {
					done: false,
					title: 'Public Todos 1 - Item 1',
				},
				'ptodo-1-2': {
					done: false,
					title: 'Public Todos 1 - Item 2',
				},
			},
		},
	},
	'user-todos': {
		testuser: {
			'utodos-1': {
				title: 'Test User - Todos 1',
				todo: {
					'utodo-1-1': {
						done: true,
						title: 'Test User - Todos 1 - Item 1',
					},
					'utodo-1-2': {
						done: false,
						title: 'Test User - Todos 1 - Item 2',
					},
				},
			},
		},
	},
};

export default db;
