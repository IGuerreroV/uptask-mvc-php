(function() { // Funcion IIFE (Immediately Invoked Function Expression)
  // Boton para mostrar el Modal de agregar nueva Tarea
  const nuevaTareaBtn = document.querySelector('.agregar-tarea');
  nuevaTareaBtn.addEventListener('click', mostrarFormulario);

  function mostrarFormulario() {
    const modal = document.createElement('DIV')
    modal.classList.add('modal');
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
    `
    setTimeout(() => {
      const formulario = document.querySelector('.formulario')
      formulario.classList.add('animar');
    }, 0)
    
    // Delegate para cerrar el Modal
    modal.addEventListener('click', function(event) {
      event.preventDefault();
      if(event.target.classList.contains('cerrar-modal')) {
        const formulario = document.querySelector('.formulario')
        formulario.classList.add('cerrar');
        setTimeout(() => {
          modal.remove();
        }, 500)
      } 
      if(event.target.classList.contains('submit-nueva-tarea')) {
        submitFormularioNuevaTarea();
      }
      // console.log(event.target);
    })
    
    document.querySelector('.dashboard').appendChild(modal);
    // console.log(modal);
  }

  function submitFormularioNuevaTarea() {
    const tarea = document.querySelector('#tarea').value.trim();

    if(tarea === '' ) {
      // Mostrar alerta de error
      mostrarAlerta('El nombre de la tarea es Obligatorio', 'error', document.querySelector('.formulario legend'));
      return
    }
    agregarTarea(tarea);
  }
  
  // Muestra un mensaje de error si no se cumple la validacion
  function mostrarAlerta(mensaje, tipo, referencia) {
    // Previen que se muestren mas de una alerta
    const alertaPrevia = document.querySelector('.alertas');
    if(alertaPrevia) {
      alertaPrevia.remove();
    }
    
    const alertas = document.createElement('DIV')
    alertas.classList.add('alertas', tipo);
    alertas.textContent = mensaje;

    // Inserta la alertas antes del legend
    referencia.parentElement.insertBefore(alertas, referencia.nextElementSibling);

    // console.log(referencia);
    // console.log(referencia.parentElement);

    // Eliminar la alerta despues de 5 segundos
    setTimeout(() => {
      alertas.remove();
    }, 5000)
  }

  // Consultar el servidor para agregar la nueva tarea al proyecto actual
  async function agregarTarea(tarea) {
    // Construir la peticion
    const datos = new FormData()
    datos.append('nombre', tarea)
    datos.append('proyecto_id', obtenerProyecto())

    try {
      const url = 'http://localhost:3000/api/tarea'
      const respuesta = await fetch(url, {
        method: 'POST',
        body: datos
      })
      
      const resultado = await respuesta.json()
      console.log(resultado);

      mostrarAlerta(resultado.mensaje, resultado.tipo, document.querySelector('.formulario legend'))
      
    } catch (error) {
      console.log(error);
    }
  }

  function obtenerProyecto() {
    const proyectoParams = new URLSearchParams(window.location.search) // Nos muestra los parametros de la URL
    const proyecto = Object.fromEntries(proyectoParams.entries()) // Convierte los parametros de la URL en un objeto
    return proyecto.url
  }
})();
