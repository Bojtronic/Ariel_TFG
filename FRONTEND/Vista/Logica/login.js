let serverUrl = "http://localhost:3000/api";

function submitForm() {
    const email = document.getElementById('nombre').value;
    const password = document.getElementById('clave').value;

    // Validar que los campos no estén vacíos
    if (!email || !password) {
        alert('Por favor, complete ambos campos.');
        return;
    }

    // Realizar la solicitud GET para obtener la lista de usuarios
    fetch(`${serverUrl}/usuarios`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al obtener la lista de usuarios.');
            }
            return response.json();
        })
        .then(data => {
            // Buscar usuario con las credenciales ingresadas
            const usuarioEncontrado = data.find(user => user.correo === email && user.identificacion === password);

            if (usuarioEncontrado) {
                // Redirigir a la página de inicio
                window.location.href = 'home.html';
            } else {
                alert('Usuario o contraseña incorrectos.');
                //window.location.href = 'home.html';
            }
        })
        .catch(error => {
            alert(`Error: ${error.message}`);
        });
}
