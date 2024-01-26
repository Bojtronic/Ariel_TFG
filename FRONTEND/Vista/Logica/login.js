let serverUrl = "http://localhost:3000/api";

function submitForm() {
    var username = document.getElementById('nombre').value;
    var password = document.getElementById('clave').value;

    // Validar que los campos no estén vacíos
    if (!username || !password) {
        console.error('Por favor, ingrese tanto el nombre como la clave.');
        return;
    }

    // Realizar la solicitud GET utilizando fetch()
    fetch(`${serverUrl}/administradores?id=${encodeURIComponent(username)}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    })
        .then(response => {
            if (!response.ok) {
                alert('La solicitud no fue exitosa');
                throw new Error('La solicitud no fue exitosa');
                
            }
            return response.json();
        })
        .then(data => {
            // Verificar si la respuesta contiene un usuario con el mismo nombre y clave
            const usuarioEncontrado = data.find(user => user.nombre === username && user.clave === password);

            if (usuarioEncontrado) {
                // Redirigir a otra página HTML (reemplaza 'otra_pagina.html' con la ruta correcta)
                window.location.href = 'home.html';
            } else {
                console.log('Usuario no encontrado o credenciales incorrectas.');
                alert('Usuario no encontrado o credenciales incorrectas.');
            }
        })
        .catch(error => {
            alert(`Error al realizar la solicitud: ${error.message}`);
        });
}
