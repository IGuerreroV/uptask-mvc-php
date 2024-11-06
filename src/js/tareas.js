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
    
    document.querySelector('body').appendChild(modal);
    // console.log(modal);
  }

  function submitFormularioNuevaTarea() {
    const tarea = document.querySelector('#tarea').value.trim();

    if(tarea === '' ) {
      // Mostrar alerta de error
      
      return
    }

    console.log('Despues del if');
  }
})();

