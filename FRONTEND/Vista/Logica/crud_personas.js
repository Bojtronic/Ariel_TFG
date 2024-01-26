const personas_url = 'http://localhost:3000/api/personas';


function get(url) {
    return fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error al obtener los datos');
        }
        return response.json();
      })
      .catch((error) => {
        console.error('Error:', error);
        throw error;
      });
}


function create(url, data) {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    };

    // Realiza la solicitud POST a la API
    return fetch(url, requestOptions)
        .then(response => {
            if (!response.ok) {
                throw new Error(`La solicitud no se pudo completar correctamente. Código de estado: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('Respuesta de la API:', data);
            return data;
        })
        .catch(error => {
            console.error('Error en la solicitud:', error);
            throw error;
        });
}



function update(url, data) {
  const requestOptions = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data), // Convierte el objeto de datos a formato JSON
  };
  // Realiza la solicitud PUT a la API
  fetch(url, requestOptions)
    .then(response => {
      if (!response.ok) {
        throw new Error('La solicitud no se pudo completar correctamente');
      }
      return response.json(); // Parsea la respuesta JSON si la hay
    })
    .then(data => {
      console.log('Respuesta de la API:', data);
    })
    .catch(error => {
      console.error('Error en la solicitud:', error);
    });
}

function eliminate(url, id) {
    const requestOptions = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    };
  
    // Realiza la solicitud DELETE a la API
    return fetch(`${url}/${id}`, requestOptions)
      .then((response) => {
        if (!response.ok) {
          throw new Error('La solicitud no se pudo completar correctamente');
        }
        console.log(`Eliminado con éxito para el ID: ${id}`);
      })
      .catch((error) => {
        console.error(`Error al eliminar para el ID: ${id}`, error);
        throw error;
      });
  }



// Función para agregar una persona
async function agregarPersona() {
    const nombre = document.getElementById('nombre').value;
    const apellido1 = document.getElementById('apellido1').value;
    const apellido2 = document.getElementById('apellido2').value;
    const cedula = document.getElementById('cedula').value;
    const fecha = document.getElementById('fechaNacimiento').value;
    const genero = document.getElementById('genero').value;
    const estado = document.getElementById('estado').value;
    
    
    if (!nombre || !apellido1 || !apellido2 || !cedula || !fecha || !genero || !estado) {
        alert('Por favor, complete todos los campos.');
        return;
    }

    let partes = fecha.split('-');
    let fecha_nacimiento = `${partes[2]}-${partes[1]}-${partes[0]}`;
    
    const persona = { nombre, apellido1, apellido2, cedula, fecha_nacimiento, genero, estado };

    try {
        await create(personas_url, persona);
        alert('Agregado con éxito');
        limpiarFormulario();
        await actualizarLista();
        llenarSelect();
        console.log(persona.fecha);
    } catch (error) {
        console.error('Error al agregar persona:', error);
        alert('Error al agregar persona. Consulta la consola para más detalles.');
    }
    
}



// Función para eliminar una persona
async function eliminarPersona() {
    const selectedId = document.getElementById('selectPersona').value;

    if (!selectedId) {
        alert('Por favor, seleccione una persona para eliminar.');
        return;
    }

    try {
        await eliminate(personas_url, selectedId);
        alert('Eliminado con éxito');
        limpiarFormulario();
        await actualizarLista();
        location.reload();
        llenarSelect();
    } catch (error) {
        console.error(`Error al eliminar para el ID: ${selectedId}`, error);
        alert(`Error al eliminar para el ID: ${selectedId}. Consulta la consola para más detalles.`);
    }
}



// Función para editar una persona
async function editarPersona() {
    const selectedId = document.getElementById('selectPersona').value;
    const nombre = document.getElementById('nombreEditar').value;
    const apellido1 = document.getElementById('apellido1Editar').value;
    const apellido2 = document.getElementById('apellido2Editar').value;
    const cedula = parseInt(document.getElementById('cedulaEditar').value, 10);


    const fecha = document.getElementById('fechaNacimientoEditar').value;

    let partes = fecha.split('-');
    let fecha_nacimiento = `${partes[2]}-${partes[1]}-${partes[0]}`;

    const genero = document.getElementById('generoEditar').value;
    const estado = document.getElementById('estadoEditar').value;

    if (!selectedId || !nombre || !apellido1 || !apellido2 || !cedula || !fecha_nacimiento || !genero || !estado) {
        alert('Por favor, complete todos los campos.');
        return;
    }

    const objetoEditado = {
        nombre,
        apellido1,
        apellido2,
        cedula,
        fecha_nacimiento,
        genero,
        estado
    };

    console.log(objetoEditado.fecha_nacimiento);

    
    try {
        await update(`${personas_url}/${selectedId}`, objetoEditado);
        alert('Editado con éxito');
        limpiarFormulario();
        await actualizarLista();
        llenarSelect();
    } catch (error) {
        console.error('Error al editar persona:', error);
        alert('Error al editar persona. Consulta la consola para más detalles.');
    } 
}

// Función para llenar opciones de select
function llenarSelect() {
    const selectPersona = document.getElementById('selectPersona');

    // Obtener la lista de personas almacenada en el localStorage
    get(personas_url)
        .then(personas => {
            // Verificar si personas es un array antes de usar forEach
            if (!Array.isArray(personas)) {
                console.error('Error: La respuesta no es un array de personas');
                return;
            }

            // Limpiar opciones actuales
            selectPersona.innerHTML = '<option value="">Seleccionar</option>';

            // Llenar opciones con los nombres de las personas
            personas.forEach(persona => {
                const option = document.createElement('option');
                option.value = persona.id;
                option.textContent = `${persona.id}:  ${persona.nombre}  ${persona.apellido1}  ${persona.apellido2} - ${persona.cedula}`;
                selectPersona.appendChild(option);
            });

            // Agregar evento change al selectPersona
            selectPersona.addEventListener('change', function () {
                const selectedId = this.value;

                // Obtener la información de la persona seleccionada
                const personaSeleccionada = personas.find(persona => persona.id == selectedId);

                if (personaSeleccionada) {
                    document.getElementById('nombreEditar').value = personaSeleccionada.nombre;
                    document.getElementById('apellido1Editar').value = personaSeleccionada.apellido1;
                    document.getElementById('apellido2Editar').value = personaSeleccionada.apellido2;
                    document.getElementById('cedulaEditar').value = personaSeleccionada.cedula;
                    
                    const fecha = new Date(personaSeleccionada.fecha_nacimiento);
                    const opcionesDeFormato = { year: 'numeric', month: '2-digit', day: '2-digit' };
                    const fechaFormateada = fecha.toLocaleDateString('es-ES', opcionesDeFormato);

                    let partes = fechaFormateada.split('/');
                    let fecha_nacimiento = `${partes[2]}-${partes[1]}-${partes[0]}`;

                    document.getElementById('fechaNacimientoEditar').value = fechaFormateada;
    
                    //document.getElementById('fechaNacimientoEditar').value = fecha_nacimiento;
                    document.getElementById('fechaNacimientoEditar').value = fecha_nacimiento;

                    console.log(fecha_nacimiento);
                    
                    document.getElementById('generoEditar').value = personaSeleccionada.genero;
                    document.getElementById('estadoEditar').value = personaSeleccionada.estado;
                } else {
                    // Limpiar campos de texto si la persona seleccionada no está definida
                    limpiarFormulario();
                }
            });
        })
        .catch(error => {
            console.error('Error al obtener la lista de personas:', error);
            alert(error);
        });
}


// Función para actualizar la lista de personas en la tabla
function actualizarLista() {
    const personasList = document.getElementById('personasList');

    // Obtener la lista de personas almacenada en el localStorage
    get(personas_url)
        .then(personas => {
            // Verificar si personas es un array antes de usar forEach
            if (!Array.isArray(personas)) {
                console.error('Error: La respuesta no es un array de personas');
                return;
            }

            // Limpiar la tabla
            personasList.innerHTML = '';

            // Llenar la tabla con los datos de las personas
            personas.forEach(persona => {
                const row = document.createElement('tr'); 
                row.innerHTML = `
                    <td>${persona.id}</td>
                    <td>${persona.nombre}</td>
                    <td>${persona.apellido1}</td>
                    <td>${persona.apellido2}</td>
                    <td>${persona.cedula}</td>
                    <td>${persona.fecha_nacimiento}</td>
                    <td>${persona.genero}</td>
                    <td>${persona.estado}</td>
                `;
                personasList.appendChild(row);
            });
        })
        .catch(error => {
            console.error('Error al obtener la lista de personas:', error);
            alert(error);
        });
}

// Función para limpiar los campos del formulario
function limpiarFormulario() {
    document.getElementById('nombre').value = '';
    document.getElementById('apellido1').value = '';
    document.getElementById('apellido2').value = '';
    document.getElementById('cedula').value = '';
    document.getElementById('fechaNacimiento').value = '';
    document.getElementById('genero').value = '';
    document.getElementById('estado').value = '';
    document.getElementById('selectPersona').value = '';
    document.getElementById('nombreEditar').value = '';
    document.getElementById('apellido1Editar').value = '';
    document.getElementById('apellido2Editar').value = '';
    document.getElementById('cedulaEditar').value = '';
    document.getElementById('fechaNacimientoEditar').value = '';
    document.getElementById('generoEditar').value = '';
    document.getElementById('estadoEditar').value = '';
}


document.addEventListener('DOMContentLoaded', function () {
    // Obtener referencias a elementos del DOM
    const btnAgregar = document.getElementById('btnAgregar');
    const btnEditar = document.getElementById('btnEditar');
    const btnEliminar = document.getElementById('btnEliminar');
    const selectPersona = document.getElementById('selectPersona');
    const nombreEditar = document.getElementById('nombreEditar');
    const apellido1Editar = document.getElementById('apellido1Editar');
    const apellido2Editar = document.getElementById('apellido2Editar');
    const cedulaEditar = document.getElementById('cedulaEditar');
    const fechaNacimientoEditar = document.getElementById('fechaNacimientoEditar');
    const generoEditar = document.getElementById('generoEditar');
    const estadoEditar = document.getElementById('estadoEditar');
    const personasList = document.getElementById('personasList');

    // Escuchar clic en botón "Agregar"
    btnAgregar.addEventListener('click', function () {
        agregarPersona();
    });

    // Escuchar clic en botón "Editar"
    btnEditar.addEventListener('click', function () {
        editarPersona();
    });

    // Escuchar clic en botón "Eliminar"
    btnEliminar.addEventListener('click', function () {
        eliminarPersona();
    });

    // Llenar opciones de select al cargar la página
    llenarSelect();

    // Llenar lista de personas al cargar la página
    actualizarLista();
});
