function mantenimiento(opcion) {
    switch (opcion) {
        case 'usuarios':
            window.location.href = 'crud_usuarios.html';
            break;
        case 'funcionarios':
            window.location.href = 'crud_funcionarios.html';
            break;
        case 'clientes':
            window.location.href = 'crud_clientes.html';
            break;
        default:
            alert('Opción no válida');
    }
}