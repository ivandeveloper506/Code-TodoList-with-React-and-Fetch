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
	const [todos, setTodos] = useState([{ id: null, label: "", done: false }]);

	const addToDo = todo => {
		if (!todo.label || /^\s*$/.test(todo.label)) {
			return;
		}

		const newTodos = [todo, ...todos];

		setTodos(newTodos);
	};

	const updateTodo = (todoId, newValue) => {
		if (!newValue.label || /^\s*$/.test(newValue.label)) {
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
	const getListTodo = async () => {
		await fetch(
			"https://assets.breatheco.de/apis/fake/todos/user/ivandeveloper506",
			{
				method: "GET",
				headers: {
					"Content-Type": "application/json"
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

	const updateListTodo = async () => {
		await fetch(
			"https://assets.breatheco.de/apis/fake/todos/user/ivandeveloper506",
			{
				method: "PUT",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify(todos)
			}
		)
			.then(response => {
				if (response.ok) {
					alert(
						"Las tareas han sido actualizadas satisfactoriamente!"
					);
				}

				console.log(response);
			})
			.catch(err => {
				console.log(err);
			});
	};

	const createListTodo = async () => {
		await fetch(
			"https://assets.breatheco.de/apis/fake/todos/user/ivandeveloper506",
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify([])
			}
		).catch(err => {
			console.log(err);
		});
	};

	const deleteListTodo = async () => {
		await fetch(
			"https://assets.breatheco.de/apis/fake/todos/user/ivandeveloper506",
			{
				method: "DELETE",
				headers: {
					"Content-Type": "application/json"
				}
			}
		)
			.then(response => {
				if (response.ok) {
					createListTodo();
					alert("Las tareas han sido eliminadas satisfactoriamente!");
				}
			})
			.then(response => {
				getListTodo();
			})
			.then(createListTodo())
			.catch(err => {
				console.log(err);
			});
	};

	useEffect(() => {
		getListTodo();
	}, []);

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

			{/* Contenedor para los botones de actualización de las tareas en la API. */}
			<div className="container topButtonClass">
				<div className="row">
					<div className="col">
						<button
							onClick={() => updateListTodo()}
							type="button"
							className="btn btn-primary">
							<i className="fas fa-cloud-upload-alt"></i>{" "}
							Actualizar Tareas
						</button>

						<button
							onClick={() => deleteListTodo()}
							type="button"
							className="btn btn-danger ml-3">
							<i className="fas fa-trash"></i> Eliminar Tareas
						</button>
					</div>
				</div>
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
