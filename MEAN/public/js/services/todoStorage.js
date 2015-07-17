/*global angular */

/**
 * Services that persists and retrieves todos from localStorage or a backend API
 * if available.
 *
 * They both follow the same API, returning promises for all changes to the
 * model.
 */
angular.module('todomvc')
	.factory('todoStorage', function ($http, $injector) {
		'use strict';

		// Detect if an API backend is present. If so, return the API module, else
		// hand off the localStorage adapter
		return $http.get('/api')
			.then(function () {
				return $injector.get('api');
			});
	})

	.factory('api', function ($http) {
		'use strict';

		var store = {
			todos: [],

			clearCompleted: function () {
				var originalTodos = store.todos.slice(0);

				var completeTodos = [];
				var incompleteTodos = [];
				store.todos.forEach(function (todo) {
					if (todo.completed) {
						completeTodos.push(todo);
					} else {
						incompleteTodos.push(todo);
					}
				});

				angular.copy(incompleteTodos, store.todos);

				return $http.delete('/api/todos')
					.then(function success() {
						return store.todos;
					}, function error() {
						angular.copy(originalTodos, store.todos);
						return originalTodos;
					});
			},

			delete: function (todo) {
				var originalTodos = store.todos.slice(0);

				store.todos.splice(store.todos.indexOf(todo), 1);
				console.log(todo._id);
				return $http.delete('/api/todos/' + todo.id)
					.then(function success() {
						return store.todos;
					}, function error() {
						angular.copy(originalTodos, store.todos);
						return originalTodos;
					});
			},

			get: function () {
				return $http.get('/api/todos')
					.then(function (resp) {
                        store.todos.length = 0; 
						for (var index in resp.data.data){
							var newTodo = {
								title:resp.data.data[index].title,
								completed:resp.data.data[index].completed,
								id:resp.data.data[index]._id
							};
							store.todos.push(newTodo);
						}
						return store.todos;
					});
			},

			insert: function (todo) {
				var originalTodos = store.todos.slice(0);
				return $http.post('/api/todos', todo)
					.then(function success(resp) {
						todo.id = resp.data.data._id;
						store.todos.push(todo);
						return store.todos;
					}, function error() {
						angular.copy(originalTodos, store.todos);
						return store.todos;
					});
			},

			put: function (todo) {
				var originalTodos = store.todos.slice(0);

				return $http.put('/api/todos/' + todo.id, todo)
					.then(function success() {
						return store.todos;
					}, function error() {
						angular.copy(originalTodos, store.todos);
						return originalTodos;
					});
			}
		};

		return store;
	});