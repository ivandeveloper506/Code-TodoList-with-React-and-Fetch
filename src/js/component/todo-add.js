/********************************************************************************/
/* Fecha Creación:  08 Marzo 2021.                                              */
/* Autor:           Iván Fonseca Castro                                         */
/*                                                                              */
/* Descripción:     Archivo para crear componente que se utiliza para dibujar   */
/*                  cada fila de las tareas que se van agregando.               */
/********************************************************************************/

import React, { useState } from "react";
import TodoForm from "./todo-form.js";

export default function TodoAdd({
	todos,
	completeTodo,
	removeTodo,
	updateTodo
}) {
	const [edit, setEdit] = useState({
		id: null,
		value: ""
	});

	const submitUpdate = value => {
		updateTodo(edit.id, value);

		setEdit({
			id: null,
			value: ""
		});
	};

	if (edit.id) {
		return <TodoForm edit={edit} onSubmit={submitUpdate} />;
	}

	return todos.map((todo, index) => (
		<div className="row">
			<div className="input-group mb-1">
				<div className="input-group-prepend todoRowCheckbox">
					<div className="input-group-text checkboxClass">
						<input
							type="checkbox"
							aria-label="Checkbox for following text input"
						/>
					</div>
				</div>
				<div
					className={
						todo.isComplete
							? "col-6 col-sm-9 todoRowComplete"
							: "col-6 col-sm-9 todoRow"
					}
					key={index}>
					<div key={todo.id} onClick={() => completeTodo(todo.id)}>
						{todo.label}
					</div>
				</div>
				<div className="col-2 col-sm-2 optionButtonClass">
					<button
						onClick={() => removeTodo(todo.id)}
						type="button"
						className="btn btn-danger">
						<i className="fas fa-trash-alt"></i>
					</button>
					<button
						onClick={() =>
							setEdit({ id: todo.id, value: todo.label })
						}
						type="button"
						className="btn btn-warning ml-2">
						<i className="fas fa-edit"></i>
					</button>
				</div>
			</div>

			{/* <div
				className={
					todo.isComplete
						? "col-6 col-sm-9 todoRowComplete"
						: "col-6 col-sm-9 todoRow"
				}
				key={index}>
				<div key={todo.id} onClick={() => completeTodo(todo.id)}>
					{todo.label}
				</div>
			</div>
			<div className="col-2 col-sm-2 optionButtonClass">
				<button
					onClick={() => removeTodo(todo.id)}
					type="button"
					className="btn btn-danger">
					<i className="fas fa-trash-alt"></i>
				</button>
				<button
					onClick={() => setEdit({ id: todo.id, value: todo.label })}
					type="button"
					className="btn btn-warning ml-2">
					<i className="fas fa-edit"></i>
				</button>
			</div> */}
		</div>
	));
}
