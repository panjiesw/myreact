/**
 * Copyright (c) 2017 Panjie Setiawan Wicaksono <panjie@panjiesw.com>
 *
 * This software is released under the MIT License.
 * https://panjiesw.mit-license.org
 */

import { action, observable, ObservableMap } from 'mobx';
import { IAuthStore } from './auth';

export interface ITodoStore {
	loading: boolean;
	isInitialized: boolean;
	userTodos: ObservableMap<MR.ITodo>;
	publicTodos: ObservableMap<MR.ITodo>;
	initialize(): Promise<void>;
	addPublicTodo(key: string, todo: MR.ITodo): boolean;
	addPublicTodoItem(todoKey: string, itemKey: string, item: MR.ITodoItem): boolean;
	addUserTodo(key: string, todo: MR.ITodo): boolean;
	addUserTodoItem(todoKey: string, itemKey: string, item: MR.ITodoItem): boolean;
}

class TodoStore implements ITodoStore {
	public userTodos: ObservableMap<MR.ITodo> = observable.map<MR.ITodo>();
	public publicTodos: ObservableMap<MR.ITodo> = observable.map<MR.ITodo>();
	@observable public loading: boolean = true;
	@observable public isInitialized: boolean = false;

	private userTodosRef: firebase.database.Reference;
	private publicTodosRef: firebase.database.Reference;

	constructor(private app: firebase.app.App, private auth: IAuthStore) {
	}

	public async initialize(): Promise<void> {
		const user = this.auth.user as firebase.User;
		this.publicTodosRef = this.app.database().ref('public-todos');
		this.userTodosRef = this.app.database().ref(`user-todos/${user.uid}`);
		if (!this.isInitialized) {
			await Promise.all([
				this.initializePublicTodos(),
				this.initializeUserTodos(),
			]);
			this.setInitialized();
			this.setLoading(false);
		}
	}

	@action.bound
	public addPublicTodo(key: string, todo: MR.ITodo): boolean {
		this.publicTodos.set(key, todo);
		return false;
	}

	@action.bound
	public addPublicTodoItem(todoKey: string, itemKey: string, item: MR.ITodoItem): boolean {
		(this.publicTodos.get(todoKey) as MR.ITodo).items.set(itemKey, item);
		return false;
	}

	@action.bound
	public addUserTodo(key: string, todo: MR.ITodo): boolean {
		this.userTodos.set(key, todo);
		return false;
	}

	@action.bound
	public addUserTodoItem(todoKey: string, itemKey: string, item: MR.ITodoItem): boolean {
		const todo = this.userTodos.get(todoKey);
		if (todo && this.userTodos.has(todoKey)) {
			todo.items.set(itemKey, item);
		}
		return false;
	}

	public publishUserTodo(title: string) {
		this.userTodosRef.push({ title });
	}

	public publishUserTodoItem(todoKey: string, title: string) {
		this.userTodosRef.child(`${todoKey}/todo`).push({ title });
	}

	private initializePublicTodos(): Promise<void> {
		return new Promise<void>((resolve) => {
			this.publicTodosRef.once('value', (todos) => {
				todos.forEach(this._setPublicTodos);
				resolve();
			});
		});
	}

	private initializeUserTodos(): Promise<void> {
		return new Promise<void>((resolve) => {
			this.userTodosRef.once('value', (todos) => {
				todos.forEach(this._setUserTodos);
				resolve();
			});
		});
	}

	private _setPublicTodos = (todo: firebase.database.DataSnapshot) => {
		const key = todo.key as string;
		this.addPublicTodo(key, {
			title: todo.val().title,
			items: observable.map<MR.ITodoItem>(),
		});
		todo.child('todo').forEach((item) => this.addPublicTodoItem(
			key,
			item.key as string,
			{
				title: item.val().title,
				done: item.val().done,
			},
		));
		return false;
	}

	private _setUserTodos = (todo: firebase.database.DataSnapshot) => {
		const key = todo.key as string;
		this.addUserTodo(key, {
			title: todo.val().title,
			items: observable.map<MR.ITodoItem>(),
		});
		todo.child('todo').forEach((item) => this.addUserTodoItem(
			key,
			item.key as string,
			{
				title: item.val().title,
				done: item.val().done,
			},
		));
		return false;
	}

	@action
	private setLoading(loading: boolean = true) {
		this.loading = loading;
	}

	@action
	private setInitialized(isInitialized: boolean = true) {
		this.isInitialized = isInitialized;
	}
}

export default TodoStore;
