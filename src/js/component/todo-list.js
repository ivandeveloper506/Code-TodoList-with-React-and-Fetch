/********************************************************************************/
/* Fecha Creación:  08 Marzo 2021.                                              */
/* Autor:           Iván Fonseca Castro                                         */
/*                                                                              */
/* Descripción:     Archivo para crear componente que lista todas las tareas.   */
/********************************************************************************/

import React, { useState, useEffect } from "react";
import TodoForm from "./todo-form.js";
import TodoAdd from "./todo-add.js";

export default function TodoList() {
	// const [todos, setTodos] = useState([]);
	const [todos, setTodos] = useState([{ label: "", done: false }]);

	const addToDo = todo => {
		if (!todo.label || /^\s*$/.test(todo.label)) {
			return;
		}

		console.log("*** todo ***");
		console.log(todo);

		const newTodos = [todo, ...todos];

		console.log("*** newTodos ***");
		console.log(newTodos);

		setTodos(newTodos);
	};

	const updateTodo = (todoId, newValue) => {
		if (!newValue.text || /^\s*$/.test(newValue.text)) {
			return;
		}

		setTodos(prev =>
			prev.map(item => (item.id === todoId ? newValue : item))
		);
	};

	const removeTodo = id => {
		const removeArr = [...todos].filter(todo => todo.id !== id);

		setTodos(removeArr);
	};

	const completeTodo = id => {
		let updateTodos = todos.map(todo => {
			if (todo.id === id) {
				todo.isComplete = !todo.isComplete;
			}

			return todo;
		});
		setTodos(updateTodos);
	};

	// Funciones para el Fetch
	const getListTodo = () => {
		fetch(
			"https://assets.breatheco.de/apis/fake/todos/user/ivandeveloper506",
			{
				method: "GET",
				headers: {
					"content-type": "application/json"
				}
			}
		)
			.then(res => res.json())
			.then(response => {
				setTodos(
					response.map((item, index) => {
						return item;
					})
				);
			});
	};

	useEffect(() => {
		getListTodo();
	}, []);

	console.log("*** listTodo ***");
	console.log(todos);

	return (
		<div>
			<div className="container todoTopClass">
				<div className="row">
					<h1>LISTA DE TAREAS</h1>
				</div>
			</div>

			<div className="container inputTodoClass">
				<TodoForm onSubmit={addToDo} />
			</div>
			<div className="container todoListClass">
				<div className="row d-flex flex-column">
					<div className="list-group">
						<TodoAdd
							todos={todos}
							completeTodo={completeTodo}
							removeTodo={removeTodo}
							updateTodo={updateTodo}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}
