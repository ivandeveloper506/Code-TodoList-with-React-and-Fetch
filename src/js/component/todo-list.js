/********************************************************************************/
/* Fecha Creación:  11 Marzo 2021.                                              */
/* Autor:           Iván Fonseca Castro                                         */
/*                                                                              */
/* Descripción:     Archivo para crear componente que lista todas las tareas.   */
/********************************************************************************/

import React, { useState, useEffect } from "react";
import TodoForm from "./todo-form.js";
import TodoAdd from "./todo-add.js";

export default function TodoList() {
	const [todos, setTodos] = useState([{ id: null, label: "", done: false }]);

	// Esta función agrega las tareas de forma individual en la lista.
	const addToDo = todo => {
		if (!todo.label || /^\s*$/.test(todo.label)) {
			return;
		}

		const newTodos = [todo, ...todos];

		setTodos(newTodos);
	};

	// Esta función actualiza las tareas cuando son editadas.
	const updateTodo = (todoId, newValue) => {
		if (!newValue.label || /^\s*$/.test(newValue.label)) {
			return;
		}

		setTodos(prev =>
			prev.map(item => (item.id === todoId ? newValue : item))
		);
	};

	// Esta función elimina una tarea cuando se acciona el botón de eliminar sobre la fila.
	const removeTodo = id => {
		const removeArr = [...todos].filter(todo => todo.id !== id);

		setTodos(removeArr);
	};

	// Esta función permite dar por completadas las tareas cada vez que se da click sobre el registro
	// o cuando se selecciona el ckeckbox
	const completeTodo = id => {
		let updateTodos = todos.map(todo => {
			if (todo.id === id) {
				todo.done = !todo.done;
			}

			return todo;
		});

		setTodos(updateTodos);
	};

	/* Funciones para el Fetch y comunicación con los métodos de la API. */

	// Función para realizar GET y obtener todas las tareas desde la API.
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
						if (item.id === null || item.id === undefined) {
							item.id = 1;
						}

						return item;
					})
				);
			})
			.catch(error => {
				alert("OCURRIO UN ERROR INESPERADO:\n" + error);
			});
	};

	// Función para realizar PUT y actualizar todas las tareas hacía la API.
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
			})
			.catch(error => {
				alert("OCURRIO UN ERROR INESPERADO:\n" + error);
			});
	};

	// Función para realizar POST y crear el usuario con una tarea por defecto en la API.
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
		).catch(error => {
			alert("OCURRIO UN ERROR INESPERADO:\n" + error);
		});
	};

	// Función para realizar DELETE y eliminar todas las tareas en la API.
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
			.catch(error => {
				alert("OCURRIO UN ERROR INESPERADO:\n" + error);
			});
	};

	// Se invoca la función que permite obtener todas las tareas.
	useEffect(() => {
		getListTodo();
	}, []);

	return (
		<div>
			<div className="container mt-3">
				<div className="row">
					<h3>
						<span className="badge badge-secondary ml-4">
							Total de Tareas{" "}
							<span className="badge badge-warning">
								{todos.length}
							</span>
						</span>
					</h3>
				</div>
			</div>
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
