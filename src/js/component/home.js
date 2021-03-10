/*******************************************************************************/
/* Fecha Creación: 08 Marzo 2021.                                              */
/* Autor:          Iván Fonseca Castro                                         */
/*                                                                             */
/* Descripción:   Archivo principal que invoca el componente la primera vez    */
/*                que se renderiza el sitio web.                               */
/*******************************************************************************/

import React from "react";
import TodoList from "./todo-list.js";

export function Home() {
	return <TodoList />;
}
