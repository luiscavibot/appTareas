const listaTareas = document.querySelector("#listaTareas");

document.querySelector("#formularioTareas").addEventListener("submit", guardarTarea);

function guardarTarea(e) {
	e.preventDefault();

	let tituloTarea = document.querySelector("#tituloTarea").value;
	let descripcionTarea = document.querySelector("#descripcionTarea").value;
	let tarea = {
		tituloTarea,
		descripcionTarea,
	};

	if (localStorage.getItem("tareas") === null) {
		let tareas = [];
		tareas.push(tarea);
		localStorage.setItem("tareas", JSON.stringify(tareas));
	} else {
		let tareas = JSON.parse(localStorage.getItem("tareas"));
		tareas.push(tarea);
		localStorage.setItem("tareas", JSON.stringify(tareas));
	}
	obtenerTareas();
	document.querySelector("#formularioTareas").reset();
}

function obtenerTareas() {
	let tareas = JSON.parse(localStorage.getItem("tareas"));
	listaTareas.innerHTML = "";
	for (let index = 0; index < tareas.length; index++) {
		let titulo = tareas[index].tituloTarea;
		let descripcion = tareas[index].descripcionTarea;
		listaTareas.innerHTML += `<li><b>${titulo}:</b> ${descripcion} <a href="#" onclick="eliminarTarea('${titulo}')">Eliminar</a></li>`;
	}
}

function eliminarTarea(titulo) {
	let tareas = JSON.parse(localStorage.getItem("tareas"));
	for (let index = 0; index < tareas.length; index++) {
		if (tareas[index].tituloTarea === titulo) {
			tareas.splice(index, 1);
		}
	}
	localStorage.setItem("tareas", JSON.stringify(tareas));
	obtenerTareas();
}

obtenerTareas();
