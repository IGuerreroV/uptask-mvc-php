(() => {
	// Funcion IIFE (Immediately Invoked Function Expression)
	// Obtener Tareas
	obtenerTareas();
	let tareas = [];

	// Boton para mostrar el Modal de agregar nueva Tarea
	const nuevaTareaBtn = document.querySelector(".agregar-tarea");
	nuevaTareaBtn.addEventListener("click", mostrarFormulario);

	async function obtenerTareas() {
		try {
			const id = obtenerProyecto();
			const url = `/api/tareas?url=${id}`;
			const respuesta = await fetch(url);
			const resultado = await respuesta.json();

			tareas = resultado.tareas;
			mostrarTareas();
			// console.log(tareas);
		} catch (error) {
			console.log(error);
		}
	}

	function mostrarTareas() {
		limpiarTareas(); // Elimina las tareas previas antes de mostrar las nuevas
		// Scripting
		if (tareas.length === 0) {
			const contenedorTareas = document.querySelector("#listado-tareas");

			const textoNoTareas = document.createElement("LI");
			textoNoTareas.textContent = "No Hay Tareas";
			textoNoTareas.classList.add("no-tareas");

			contenedorTareas.appendChild(textoNoTareas);
			return;
		}
		// Estado de las tareas | Diccionario
		const estados = {
			0: "Pendiente",
			1: "Completa",
		};

		for (const tarea of tareas) {
			// console.log(tarea)
			const contenedorTarea = document.createElement("LI");
			contenedorTarea.dataset.tareaId = tarea.id;
			contenedorTarea.classList.add("tarea");

			const nombreTarea = document.createElement("P");
			nombreTarea.textContent = tarea.nombre;

			const opcionesDiv = document.createElement("DIV");
			opcionesDiv.classList.add("opciones");

			// Botones
			const btnEstadoTarea = document.createElement("BUTTON");
			btnEstadoTarea.classList.add("estado-tarea");
			btnEstadoTarea.classList.add(`${estados[tarea.estado].toLowerCase()}`);
			btnEstadoTarea.textContent = estados[tarea.estado];
			btnEstadoTarea.dataset.estadoTarea = tarea.estado; // Atributo de datos personalizados

			// Evento de doble click para cambiar el estado de la tarea
			btnEstadoTarea.ondblclick = () => {
				cambiarEstadoTarea({ ...tarea });
			};

			const btnEliminarTarea = document.createElement("BUTTON");
			btnEliminarTarea.classList.add("eliminar-tarea");
			btnEliminarTarea.dataset.idTarea = tarea.id;
			btnEliminarTarea.textContent = "Eliminar";

			opcionesDiv.appendChild(btnEstadoTarea);
			opcionesDiv.appendChild(btnEliminarTarea);

			contenedorTarea.appendChild(nombreTarea);
			contenedorTarea.appendChild(opcionesDiv);

			const listadoTareas = document.querySelector("#listado-tareas");
			listadoTareas.appendChild(contenedorTarea);
			// console.log(contenedorTarea);
		}
	}

	function mostrarFormulario() {
		const modal = document.createElement("DIV");
		modal.classList.add("modal");
		modal.innerHTML = `
    <form class="formulario nueva-tarea">
      <legend>Añade una nueva tarea</legend>
      <div class="campo">
        <label>Tarea</label>
        <input
          type="text"
          name="tarea"
          placeholder="Añadir Tarea al Proyecto Actual"
          id="tarea"
        />
      </div>
      <div class="opciones">
        <input type="submit" class="submit-nueva-tarea" value="Añadir Tarea"/>
        <button type="button" class="cerrar-modal">Cancelar</button>
      </div>
    </form>
    `;
		setTimeout(() => {
			const formulario = document.querySelector(".formulario");
			formulario.classList.add("animar");
		}, 0);

		// Delegate para cerrar el Modal
		modal.addEventListener("click", (event) => {
			event.preventDefault();
			if (event.target.classList.contains("cerrar-modal")) {
				const formulario = document.querySelector(".formulario");
				formulario.classList.add("cerrar");
				setTimeout(() => {
					modal.remove();
				}, 500);
			}
			if (event.target.classList.contains("submit-nueva-tarea")) {
				submitFormularioNuevaTarea();
			}
			// console.log(event.target);
		});

		document.querySelector(".dashboard").appendChild(modal);
		// console.log(modal);
	}

	function submitFormularioNuevaTarea() {
		const tarea = document.querySelector("#tarea").value.trim();

		if (tarea === "") {
			// Mostrar alerta de error
			mostrarAlerta(
				"El nombre de la tarea es Obligatorio",
				"error",
				document.querySelector(".formulario legend"),
			);
			return;
		}
		agregarTarea(tarea);
	}

	// Muestra un mensaje de error si no se cumple la validacion
	function mostrarAlerta(mensaje, tipo, referencia) {
		// Previen que se muestren mas de una alerta
		const alertaPrevia = document.querySelector(".alertas");
		if (alertaPrevia) {
			alertaPrevia.remove();
		}

		const alertas = document.createElement("DIV");
		alertas.classList.add("alertas", tipo);
		alertas.textContent = mensaje;

		// Inserta la alertas antes del legend
		referencia.parentElement.insertBefore(
			alertas,
			referencia.nextElementSibling,
		);

		// console.log(referencia);
		// console.log(referencia.parentElement);

		// Eliminar la alerta despues de 5 segundos
		setTimeout(() => {
			alertas.remove();
		}, 5000);
	}

	// Consultar el servidor para agregar la nueva tarea al proyecto actual
	async function agregarTarea(tarea) {
		// Construir la peticion
		const datos = new FormData();
		datos.append("nombre", tarea);
		datos.append("proyecto_id", obtenerProyecto());

		try {
			const url = "http://localhost:3000/api/tarea";
			const respuesta = await fetch(url, {
				method: "POST",
				body: datos,
			});

			const resultado = await respuesta.json();
			// console.log(resultado);

			mostrarAlerta(
				resultado.mensaje,
				resultado.tipo,
				document.querySelector(".formulario legend"),
			);

			if (resultado.tipo === "exito") {
				const modal = document.querySelector(".modal");
				setTimeout(() => {
					modal.remove();
				}, 3000);

				// Agregar el objeto de tarea al global de tareas (VIRTUAL DOM)
				const tareaObj = {
					id: String(resultado.id),
					nombre: tarea,
					estado: 0,
					proyecto_id: resultado.proyecto_id,
				};

				tareas = [...tareas, tareaObj];
				mostrarTareas();

				// console.log(tareaObj);
			}
		} catch (error) {
			console.log(error);
		}
	}

	function cambiarEstadoTarea(tarea) {
		// console.log(tarea);

		const nuevoEstado = tarea.estado === "1" ? "0" : "1"; // Cambiar el estado de la tarea (0 o 1)
		tarea.estado = nuevoEstado;
		actualizarTarea(tarea);

		// console.log(tareas);
	}

	async function actualizarTarea(tarea) {
		const { estado, id, nombre, proyecto_id } = tarea;
		const datos = new FormData();
		datos.append("id", id);
		datos.append("nombre", nombre);
		datos.append("estado", estado);
		datos.append("proyecto_id", obtenerProyecto());

		// for (const valor of datos.values()) {
		// 	console.log(valor);
		// }

		try {
			const url = "http://localhost:3000/api/tarea/actualizar";
			const respuesta = await fetch(url, {
				method: "POST",
				body: datos,
			});
			// console.log(respuesta);

			const resultado = await respuesta.json();
			// console.log(resultado);

			if (resultado.respuesta.tipo === "exito") {
				// console.log('Actualizado correctamente');
				mostrarAlerta(
					resultado.respuesta.mensaje,
					resultado.respuesta.tipo,
					document.querySelector(".contenedor-nueva-tarea"),
				);
			}
		} catch (error) {
			console.log(error);
		}

		// console.log(tarea);
	}

	function obtenerProyecto() {
		const proyectoParams = new URLSearchParams(window.location.search); // Nos muestra los parametros de la URL
		const proyecto = Object.fromEntries(proyectoParams.entries()); // Convierte los parametros de la URL en un objeto
		return proyecto.url;
	}

	function limpiarTareas() {
		// Elimina las tareas previas antes de mostrar las nuevas
		const listadoTareas = document.querySelector("#listado-tareas");

		while (listadoTareas.firstChild) {
			listadoTareas.removeChild(listadoTareas.firstChild);
		}
	}
})();
