const usuarios_url = 'http://localhost:3000/api/usuarios';

// Función para realizar una solicitud GET y obtener los datos
async function read(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Error al obtener los datos');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error al obtener los datos:', error);
        throw error;
    }
}

// Función para agregar un usuario
async function agregarUsuario() {
    const nombre = document.getElementById('nombre').value;
    const apellido1 = document.getElementById('apellido1').value;
    const apellido2 = document.getElementById('apellido2').value;
    const identificacion = document.getElementById('identificacion').value;
    const correo = document.getElementById('correo').value;
    const contrasena = document.getElementById('contrasena').value;
    const telefono = document.getElementById('telefono').value;
    const operador_telefono = document.getElementById('operador_telefono').value;
    const provincia = document.getElementById('provincia').value;
    const canton = document.getElementById('canton').value;
    const distrito = document.getElementById('distrito').value;
    const direccion = document.getElementById('direccion').value;
    const id_rol = document.getElementById('id_rol').value;

    if (!nombre || !apellido1 || !apellido2 || !identificacion || !correo || !contrasena || !telefono || !operador_telefono || !provincia || !canton || !distrito || !direccion || !id_rol) {
        alert('Por favor, complete todos los campos.');
        return;
    }

    const usuario = { nombre, apellido1, apellido2, identificacion, correo, contrasena, telefono, operador_telefono, provincia, canton, distrito, direccion, id_rol };

    try {
        await create(usuarios_url, usuario);
        alert('Usuario agregado con éxito');
        limpiarFormulario();
        await actualizarLista();
        llenarSelect();
    } catch (error) {
        console.error('Error al agregar usuario:', error);
        alert('Error al agregar usuario. Consulta la consola para más detalles.');
    }
}

// Función para editar un usuario
async function editarUsuario() {
    const selectedId = document.getElementById('selectUsuario').value;
    const nombre = document.getElementById('nombreEditar').value;
    const apellido1 = document.getElementById('apellido1Editar').value;
    const apellido2 = document.getElementById('apellido2Editar').value;
    const identificacion = document.getElementById('identificacionEditar').value;
    const correo = document.getElementById('correoEditar').value;
    const contrasena = document.getElementById('contrasenaEditar').value;
    const telefono = document.getElementById('telefonoEditar').value;
    const operador_telefono = document.getElementById('operador_telefonoEditar').value;
    const provincia = document.getElementById('provinciaEditar').value;
    const canton = document.getElementById('cantonEditar').value;
    const distrito = document.getElementById('distritoEditar').value;
    const direccion = document.getElementById('direccionEditar').value;
    const id_rol = document.getElementById('id_rolEditar').value;

    if (!selectedId || !nombre || !apellido1 || !apellido2 || !identificacion || !correo || !contrasena || !telefono || !operador_telefono || !provincia || !canton || !distrito || !direccion || !id_rol) {
        alert('Por favor, complete todos los campos.');
        return;
    }

    const usuarioEditado = {
        nombre,
        apellido1,
        apellido2,
        identificacion,
        correo,
        contrasena,
        telefono,
        operador_telefono,
        provincia,
        canton,
        distrito,
        direccion,
        id_rol
    };

    try {
        await update(`${usuarios_url}/${selectedId}`, usuarioEditado);
        alert('Usuario editado con éxito');
        limpiarFormulario();
        await actualizarLista();
        llenarSelect();
    } catch (error) {
        console.error('Error al editar usuario:', error);
        alert('Error al editar usuario. Consulta la consola para más detalles.');
    }
}

// Función para eliminar un usuario
async function eliminarUsuario() {
    const selectedId = document.getElementById('selectUsuario').value;

    if (!selectedId) {
        alert('Por favor, seleccione un usuario para eliminar.');
        return;
    }

    try {
        await eliminate(usuarios_url, selectedId);
        alert('Usuario eliminado con éxito');
        await actualizarLista();
        llenarSelect();
    } catch (error) {
        console.error('Error al eliminar usuario:', error);
        alert('Error al eliminar usuario. Consulta la consola para más detalles.');
    }
}

// Función para obtener la lista de usuarios y actualizar la vista
async function actualizarLista() {
    try {
        const usuarios = await read(usuarios_url);
        const usuariosList = document.getElementById('usuariosList');
        usuariosList.innerHTML = '';
        usuarios.forEach(usuario => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${usuario.id}</td>
                <td>${usuario.nombre}</td>
                <td>${usuario.apellido1}</td>
                <td>${usuario.apellido2}</td>
                <td>${usuario.identificacion}</td>
                <td>${usuario.correo}</td>
                <td>${usuario.telefono}</td>
                <td>${usuario.estado}</td>
            `;
            usuariosList.appendChild(row);
        });
    } catch (error) {
        console.error('Error al actualizar lista de usuarios:', error);
    }
}

// Función para llenar el select con los usuarios
async function llenarSelect() {
    try {
        const usuarios = await read(usuarios_url);
        const selectUsuario = document.getElementById('selectUsuario');
        selectUsuario.innerHTML = '<option value="">Seleccionar</option>';
        usuarios.forEach(usuario => {
            const option = document.createElement('option');
            option.value = usuario.id;
            option.textContent = `${usuario.nombre} ${usuario.apellido1} ${usuario.apellido2}`;
            selectUsuario.appendChild(option);
        });
    } catch (error) {
        console.error('Error al llenar el select de usuarios:', error);
    }
}

// Función para limpiar el formulario
function limpiarFormulario() {
    document.getElementById('nombre').value = '';
    document.getElementById('apellido1').value = '';
    document.getElementById('apellido2').value = '';
    document.getElementById('identificacion').value = '';
    document.getElementById('correo').value = '';
    document.getElementById('contrasena').value = '';
    document.getElementById('telefono').value = '';
    document.getElementById('operador_telefono').value = '';
    document.getElementById('provincia').value = '';
    document.getElementById('canton').value = '';
    document.getElementById('distrito').value = '';
    document.getElementById('direccion').value = '';
    document.getElementById('id_rol').value = '';
}

// Inicialización
document.getElementById('btnAgregar').addEventListener('click', agregarUsuario);
document.getElementById('btnEditar').addEventListener('click', editarUsuario);
document.getElementById('btnEliminar').addEventListener('click', eliminarUsuario);

// Cargar la lista de usuarios al iniciar
actualizarLista();
llenarSelect();
