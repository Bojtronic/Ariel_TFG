const usuarios_url = 'http://localhost:3000/api/usuarios';

// Función para realizar una solicitud GET
async function read(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Error al obtener los datos');
        }
        return await response.json();
    } catch (error) {
        console.error('Error al obtener los datos:', error);
        throw error;
    }
}

// Función para agregar un usuario
async function agregarUsuario() {
    const inputs = [
        'tipo_identificacion', 'identificacion', 'nombre', 'apellido_1', 'apellido_2', 
        'provincia', 'canton', 'distrito', 'direccion',
        'correo', 'contrasena', 'telefono', 'operador_telefono', 'id_rol'
    ];

    const usuario = {};
    for (const id of inputs) {
        const value = document.getElementById(id).value.trim();
        if (!value) {
            alert(`Por favor, complete el campo: ${id}`);
            return;
        }
        usuario[id] = value;
    }

    try {
        const response = await fetch(usuarios_url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(usuario),
        });

        if (!response.ok) {
            throw new Error('Error al agregar usuario');
        }

        alert('Usuario agregado con éxito');
        limpiarFormulario();
        await actualizarLista();
        await llenarSelect();
    } catch (error) {
        console.error('Error al agregar usuario:', error);
        alert('Error al agregar usuario. Consulta la consola para más detalles.');
    }
}

// Función para editar un usuario
async function editarUsuario() {
    const selectedId = document.getElementById('selectUsuario').value;
    if (!selectedId) {
        alert('Por favor, seleccione un usuario para editar.');
        return;
    }

    const inputs = [
        'tipo_identificacion_editar', 'identificacion_editar', 'nombre_editar', 'apellido_1_editar', 'apellido_2_editar',
        'provincia_editar', 'canton_editar', 'distrito_editar', 'direccion_editar',
        'correo_editar', 'contrasena_editar', 'telefono_editar', 'operador_telefono_editar',
        'id_rol_editar', 'estado_editar'
    ];

    const usuarioEditado = {};
    let camposIncompletos = [];

    for (const id of inputs) {
        const value = document.getElementById(id).value.trim();
        if (!value) {
            camposIncompletos.push(id);
        }
        usuarioEditado[id.replace('_editar', '')] = value;
    }

    if (camposIncompletos.length > 0) {
        alert(`Por favor, complete los siguientes campos: ${camposIncompletos.join(', ')}`);
        return;
    }

    try {
        const response = await fetch(`${usuarios_url}/${selectedId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(usuarioEditado),
        });

        if (!response.ok) {
            const errorDetails = await response.text();
            throw new Error(`Error al editar usuario: ${errorDetails}`);
        }

        alert('Usuario editado con éxito');
        limpiarFormulario();
        await actualizarLista();
        await llenarSelect();
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
        const response = await fetch(`${usuarios_url}/${selectedId}`, { method: 'DELETE' });
        if (!response.ok) {
            throw new Error('Error al eliminar usuario');
        }

        alert('Usuario eliminado con éxito');
        await actualizarLista();
        await llenarSelect();
    } catch (error) {
        console.error('Error al eliminar usuario:', error);
        alert('Error al eliminar usuario. Consulta la consola para más detalles.');
    }
}

// Función para actualizar la lista de usuarios
async function actualizarLista() {
    try {
        const usuarios = await read(usuarios_url);
        const usuariosList = document.getElementById('usuariosList');
        usuariosList.innerHTML = '';
        usuarios.forEach(usuario => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${usuario.tipo_identificacion}</td>
                <td>${usuario.identificacion}</td>
                <td>${usuario.nombre}</td>
                <td>${usuario.apellido1}</td>
                <td>${usuario.apellido2}</td>
                <td>${usuario.correo}</td>
				<td>${usuario.contrasena}</td>
                <td>${usuario.telefono}</td>
				<td>${usuario.operador_telefono}</td>
				<td>${usuario.estado}</td>
				<td>${usuario.id_rol}</td>
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
    document.querySelectorAll('input, select').forEach(input => (input.value = ''));
}

// Inicialización
document.getElementById('btnAgregar').addEventListener('click', agregarUsuario);
document.getElementById('btnEditar').addEventListener('click', editarUsuario);
document.getElementById('btnEliminar').addEventListener('click', eliminarUsuario);

// Cargar datos iniciales
actualizarLista();
llenarSelect();

document.getElementById('selectUsuario').addEventListener('change', async function () {
    const selectedId = this.value;
    if (!selectedId) {
        limpiarFormulario();
        return;
    }

    try {
        const usuario = await read(`${usuarios_url}/${selectedId}`);
        document.getElementById('tipo_identificacion_editar').value = usuario.tipo_identificacion || '';
        document.getElementById('identificacion_editar').value = usuario.identificacion || '';
        document.getElementById('nombre_editar').value = usuario.nombre || '';
        document.getElementById('apellido_1_editar').value = usuario.apellido1 || '';
        document.getElementById('apellido_2_editar').value = usuario.apellido2 || '';
        document.getElementById('provincia_editar').value = usuario.provincia || '';
        document.getElementById('canton_editar').value = usuario.canton || '';
        document.getElementById('distrito_editar').value = usuario.distrito || '';
        document.getElementById('direccion_editar').value = usuario.direccion || '';
        document.getElementById('correo_editar').value = usuario.correo || '';
        document.getElementById('contrasena_editar').value = usuario.contrasena || '';
        document.getElementById('telefono_editar').value = usuario.telefono || '';
        document.getElementById('operador_telefono_editar').value = usuario.operador_telefono || '';
        document.getElementById('id_rol_editar').value = usuario.id_rol || '';
        document.getElementById('estado_editar').value = usuario.estado || '';
    } catch (error) {
        console.error('Error al obtener datos del usuario seleccionado:', error);
    }
});



const provinciasData = {
	"provincias": {
		"1": {
			"nombre": "San José",
			"cantones": {
				"01": {
					"nombre": "Central",
					"distritos": {
						"01": "Carmen",
						"02": "Merced",
						"03": "Hospital",
						"04": "Catedral",
						"05": "Zapote",
						"06": "San Francisco De Dos Rios",
						"07": "Uruca",
						"08": "Mata Redonda",
						"09": "Pavas",
						"10": "Hatillo",
						"11": "San Sebastián"
					}
				},
				"02": {
					"nombre": "Escazú",
					"distritos": {
						"01": "Escazú",
						"02": "San Antonio",
						"03": "San Rafael"
					}
				},
				"03": {
					"nombre": "Desamparados",
					"distritos": {
						"01": "Desamparados",
						"02": "San Miguel",
						"03": "San Juan De Dios",
						"04": "San Rafael Arriba",
						"05": "San Rafael Abajo",
						"06": "San Antonio",
						"07": "Frailes",
						"08": "Patarra",
						"09": "San Cristobal",
						"10": "Rosario",
						"11": "Damas",
						"12": "Gravilias",
						"13": "Los Guido"
					}
				},
				"04": {
					"nombre": "Puriscal",
					"distritos": {
						"01": "Santiago",
						"02": "Mercedes Sur",
						"03": "Barbacoas",
						"04": "Grifo Alto",
						"05": "San Rafael",
						"06": "Candelarita",
						"07": "Desamparaditos",
						"08": "San Antonio",
						"09": "Chires"
					}
				},
				"05": {
					"nombre": "Tarrazú",
					"distritos": {
						"01": "San Marcos",
						"02": "San Lorenzo",
						"03": "San Carlos"
					}
				},
				"06": {
					"nombre": "Aserrí",
					"distritos": {
						"01": "Aserrí",
						"02": "Tarbaca",
						"03": "Vuelta De Jorco",
						"04": "San Gabriel",
						"05": "Legua",
						"06": "Monterrey",
						"07": "Salitrillos"
					}
				},
				"07": {
					"nombre": "Mora",
					"distritos": {
						"01": "Colón",
						"02": "Guayabo",
						"03": "Tabarcia",
						"04": "Piedras Negras",
						"05": "Picagres",
						"06": "Jaris"
					}
				},
				"08": {
					"nombre": "Goicoechea",
					"distritos": {
						"01": "Guadalupe",
						"02": "San Francisco",
						"03": "Calle Blancos",
						"04": "Mata De Platano",
						"05": "Ipís",
						"06": "Rancho Redondo",
						"07": "Purral"
					}
				},
				"09": {
					"nombre": "Santa Ana",
					"distritos": {
						"01": "Santa Ana",
						"02": "Salitral",
						"03": "Pozos",
						"04": "Uruca",
						"05": "Piedades",
						"06": "Brasil"
					}
				},
				"10": {
					"nombre": "Alajuelita",
					"distritos": {
						"01": "Alajuelita",
						"02": "San Josecito",
						"03": "San Antonio",
						"04": "Concepción",
						"05": "San Felipe"
					}
				},
				"11": {
					"nombre": "Vázquez De Coronado",
					"distritos": {
						"01": "San Isidro",
						"02": "San Rafael",
						"03": "Dulce Nombre De Jesus",
						"04": "Patalillo",
						"05": "Cascajal"
					}
				},
				"12": {
					"nombre": "Acosta",
					"distritos": {
						"01": "San Ignacio",
						"02": "Guaitil",
						"03": "Palmichal",
						"04": "Cangrejal",
						"05": "Sabanillas"
					}
				},
				"13": {
					"nombre": "Tibás",
					"distritos": {
						"01": "San Juan",
						"02": "Cinco Esquinas",
						"03": "Anselmo Llorente",
						"04": "Leon XII",
						"05": "Colima"
					}
				},
				"14": {
					"nombre": "Moravia",
					"distritos": {
						"01": "San Vicente",
						"02": "San Jeronimo",
						"03": "La Trinidad"
					}
				},
				"15": {
					"nombre": "Montes De Oca",
					"distritos": {
						"01": "San Pedro",
						"02": "Sabanilla",
						"03": "Mercedes",
						"04": "San Rafael"
					}
				},
				"16": {
					"nombre": "Turrubares",
					"distritos": {
						"01": "San Pablo",
						"02": "San Pedro",
						"03": "San Juan De Mata",
						"04": "San Luis",
						"05": "Carara"
					}
				},
				"17": {
					"nombre": "Dota",
					"distritos": {
						"01": "Santa María",
						"02": "Jardin",
						"03": "Copey"
					}
				},
				"18": {
					"nombre": "Curridabat",
					"distritos": {
						"01": "Curridabat",
						"02": "Granadilla",
						"03": "Sanchez",
						"04": "Tirrases"
					}
				},
				"19": {
					"nombre": "Pérez Zeledón",
					"distritos": {
						"01": "San Isidro De El General",
						"02": "El General",
						"03": "Daniel Flores",
						"04": "Rivas",
						"05": "San Pedro",
						"06": "Platanares",
						"07": "Pejibaye",
						"08": "Cajon",
						"09": "Baru",
						"10": "Rio Nuevo",
						"11": "Páramo"
					}
				},
				"20": {
					"nombre": "León Cortés Castro",
					"distritos": {
						"01": "San Pablo",
						"02": "San Andres",
						"03": "Llano Bonito",
						"04": "San Isidro",
						"05": "Santa Cruz",
						"06": "San Antonio"
					}
				}
			}
		},
		"2": {
			"nombre": "Alajuela",
			"cantones": {
				"01": {
					"nombre": "Central",
					"distritos": {
						"01": "Alajuela",
						"02": "San José",
						"03": "Carrizal",
						"04": "San Antonio",
						"05": "Guácima",
						"06": "San Isidro",
						"07": "Sabanilla",
						"08": "San Rafael",
						"09": "Rio Segundo",
						"10": "Desamparados",
						"11": "Turrucares",
						"12": "Tambor",
						"13": "Garita",
						"14": "Sarapiquí"
					}
				},
				"02": {
					"nombre": "San Ramón",
					"distritos": {
						"01": "San Ramón",
						"02": "Santiago",
						"03": "San Juan",
						"04": "Piedades Norte",
						"05": "Piedades Sur",
						"06": "San Rafael",
						"07": "San Isidro",
						"08": "Angeles",
						"09": "Alfaro",
						"10": "Volio",
						"11": "Concepción",
						"12": "Zapotal",
						"13": "Peñas Blancas"
					}
				},
				"03": {
					"nombre": "Grecia",
					"distritos": {
						"01": "Grecia",
						"02": "San Isidro",
						"03": "San José",
						"04": "San Roque",
						"05": "Tacares",
						"06": "Rio Cuarto",
						"07": "Puente De Piedra",
						"08": "Bolivar"
					}
				},
				"04": {
					"nombre": "San Mateo",
					"distritos": {
						"01": "San Mateo",
						"02": "Desmonte",
						"03": "Jesús María",
						"04": "Labrador"
					}
				},
				"05": {
					"nombre": "Atenas",
					"distritos": {
						"01": "Atenas",
						"02": "Jesús",
						"03": "Mercedes",
						"04": "San Isidro",
						"05": "Concepción",
						"06": "San José",
						"07": "Santa Eulalia",
						"08": "Escobal"
					}
				},
				"06":{
					"nombre": "Naranjo",
					"distritos": {
						"01": "Naranjo",
						"02": "San Miguel",
						"03": "San José",
						"04": "Cirrí Sur",
						"05": "San Jerónimo",
						"06": "San Juan",
						"07": "El Rosario",
						"08": "Palmitos"
					}
				},
				"07": {
					"nombre": "Palmares",
					"distritos": {
						"01": "Palmares",
						"02": "Zaragoza",
						"03": "Buenos Aires",
						"04": "Santiago",
						"05": "Candelaria",
						"06": "Esquipulas",
						"07": "La Granja"
					}
				},
				"08": {
					"nombre": "Poás",
					"distritos": {
						"01": "San Pedro",
						"02": "San Juan",
						"03": "San Rafael",
						"04": "Carrillos",
						"05": "Sabana Redonda"
					}
				},
				"09": {
					"nombre": "Orotina",
					"distritos": {
						"01": "Orotina",
						"02": "El Mastate",
						"03": "Hacienda Vieja",
						"04": "Coyolar",
						"05": "La Ceiba"
					}
				},
				"10": {
					"nombre": "San Carlos",
					"distritos": {
						"01": "Quesada",
						"02": "Florencia",
						"03": "Buenavista",
						"04": "Aguas Zarcas",
						"05": "Venecia",
						"06": "Pital",
						"07": "La Fortuna",
						"08": "La Tigra",
						"09": "La Palmera",
						"10": "Venado",
						"11": "Cutris",
						"12": "Monterrey",
						"13": "Pocosol"
					}
				},
				"11": {
					"nombre": "Zarcero",
					"distritos": {
						"01": "Zarcero",
						"02": "Laguna",
						"03": "Tapesco",
						"04": "Guadalupe",
						"05": "Palmira",
						"06": "Zapote",
						"07": "Brisas"
					}
				},
				"12": {
					"nombre": "Sarchí",
					"distritos": {
						"01": "Sarchí Norte",
						"02": "Sarchí Sur",
						"03": "Toro Amarillo",
						"04": "San Pedro",
						"05": "Rodriguez"
					}
				},
				"13": {
					"nombre": "Upala",
					"distritos": {
						"01": "Upala",
						"02": "Aguas Claras",
						"03": "San José o Pizote",
						"04": "Bijagua",
						"05": "Delicias",
						"06": "Dos Rios",
						"07": "Yolillal",
						"08": "Canalete"
					}
				},
				"14": {
					"nombre": "Los Chiles",
					"distritos": {
						"01": "Los Chiles",
						"02": "Caño Negro",
						"03": "El Amparo",
						"04": "San Jorge"
					}
				},
				"15": {
					"nombre": "Guatuso",
					"distritos": {
						"01": "San Rafael",
						"02": "Buenavista",
						"03": "Cote",
						"04": "Katira"
					}
				},
				"16": {
					"nombre": "Río Cuarto",
					"distritos": {
						"01": "Río Cuarto"
					}
				}
			}
		},
		"3": {
			"nombre": "Cartago",
			"cantones": {
				"01": {
					"nombre": "Central",
					"distritos": {
						"01": "Oriental",
						"02": "Occidental",
						"03": "Carmen",
						"04": "San Nicolás",
						"05": "Aguacaliente o San Francisco",
						"06": "Guadalupe o Arenilla",
						"07": "Corralillo",
						"08": "Tierra Blanca",
						"09": "Dulce Nombre",
						"10": "Llano Grande",
						"11": "Quebradilla"
					}
				},
				"02": {
					"nombre": "Paraíso",
					"distritos": {
						"01": "Paraiso",
						"02": "Santiago",
						"03": "Orosi",
						"04": "Cachí",
						"05": "Llanos de Santa Lucía"
					}
				},
				"03": {
					"nombre": "La Unión",
					"distritos": {
						"01": "Tres Rios",
						"02": "San Diego",
						"03": "San Juan",
						"04": "San Rafael",
						"05": "Concepción",
						"06": "Dulce Nombre",
						"07": "San Ramón",
						"08": "Rio Azul"
					}
				},
				"04": {
					"nombre": "Jiménez",
					"distritos": {
						"01": "Juan Viñas",
						"02": "Tucurrique",
						"03": "Pejibaye"
					}
				},
				"05": {
					"nombre": "Turrialba",
					"distritos": {
						"01": "Turrialba",
						"02": "La Suiza",
						"03": "Peralta",
						"04": "Santa Cruz",
						"05": "Santa Teresita",
						"06": "Pavones",
						"07": "Tuis",
						"08": "Tayutic",
						"09": "Santa Rosa",
						"10": "Tres Equis",
						"11": "La Isabel",
						"12": "Chirripó"
					}
				},
				"06": {
					"nombre": "Alvarado",
					"distritos": {
						"01": "Pacayas",
						"02": "Cervantes",
						"03": "Capellades"
					}
				},
				"07": {
					"nombre": "Oreamuno",
					"distritos": {
						"01": "San Rafael",
						"02": "Cot",
						"03": "Potrero Cerrado",
						"04": "Cipreses",
						"05": "Santa Rosa"
					}
				},
				"08": {
					"nombre": "El Guarco",
					"distritos": {
						"01": "El Tejar",
						"02": "San Isidro",
						"03": "Tobosi",
						"04": "Patio De Agua"
					}
				}
			}
		},
		"4": {
			"nombre": "Heredia",
			"cantones": {
				"01": {
					"nombre": "Central",
					"distritos": {
						"01": "Heredia",
						"02": "Mercedes",
						"03": "San Francisco",
						"04": "Ulloa",
						"05": "Varablanca"
					}
				},
				"02": {
					"nombre": "Barva",
					"distritos": {
						"01": "Barva",
						"02": "San Pedro",
						"03": "San Pablo",
						"04": "San Roque",
						"05": "Santa Lucía",
						"06": "San José de la Montaña"
					}
				},
				"03": { 
					"nombre": "Santo Domingo",
					"distritos": {
						"01": "Santo Domingo",
						"02": "San Vicente",
						"03": "San Miguel",
						"04": "Paracito",
						"05": "Santo Tomás",
						"06": "Santa Rosa",
						"07": "Tures",
						"08": "Para"
					}
				},
				"04": { 
					"nombre": "Santa Barbara",
					"distritos": {
						"01": "Santa Bárbara",
						"02": "San Pedro",
						"03": "San Juan",
						"04": "Jesús",
						"05": "Santo Domingo",
						"06": "Puraba"
					}
				},
				"05": { 
					"nombre": "San Rafael",
					"distritos": {
						"01": "San Rafael",
						"02": "San Josecito",
						"03": "Santiago",
						"04": "Los Ángeles",
						"05": "Concepción"
					}
				},
				"06": { 
					"nombre": "San Isidro",
					"distritos": {
						"01": "San Isidro",
						"02": "San José",
						"03": "Concepción",
						"04": "San Francisco"
					}
				},
				"07": { 
					"nombre": "Belén",
					"distritos": {
						"01": "San Antonio",
						"02": "La Ribera",
						"03": "La Asuncion"
					}
				},
				"08": { 
					"nombre": "Flores",
					"distritos": {
						"01": "San Joaquín",
						"02": "Barrantes",
						"03": "Llorente"
					}
				},
				"09": { 
					"nombre": "San Pablo",
					"distritos": {
						"01": "San Pablo",
						"02": "Rincon De Sabanilla"
					}
				},
				"10": { 
					"nombre": "Sarapiquí",
					"distritos": {
						"01": "Puerto Viejo",
						"02": "La Virgen",
						"03": "Las Horquetas",
						"04": "Llanuras Del Gaspar",
						"05": "Cureña"
					}
				}
			}
		},
		"5": {
			"nombre": "Guanacaste",
			"cantones": {
				"01": {
					"nombre": "Liberia",
					"distritos": {
						"01": "Liberia",
						"02": "Cañas Dulces",
						"03": "Mayorga",
						"04": "Nacascolo",
						"05": "Curubande"
					}
				},
				"02": {
					"nombre": "Nicoya",
					"distritos": {
						"01": "Nicoya",
						"02": "Mansión",
						"03": "San Antonio",
						"04": "Quebrada Honda",
						"05": "Sámara",
						"06": "Nosara",
						"07": "Belén De Nosarita"
					}
				},
				"03": {
					"nombre": "Santa Cruz",
					"distritos": {
						"01": "Santa Cruz",
						"02": "Bolson",
						"03": "Veintisiete de Abril",
						"04": "Tempate",
						"05": "Cartagena",
						"06": "Cuajiniquil",
						"07": "Diria",
						"08": "Cabo Velas",
						"09": "Tamarindo"
					}
				},
				"04": {
					"nombre": "Bagaces",
					"distritos": {
						"01": "Bagaces",
						"02": "La Fortuna",
						"03": "Mogote",
						"04": "Rio Naranjo"
					}
				},
				"05": {
					"nombre": "Carrillo",
					"distritos": {
						"01": "Filadelfia",
						"02": "Palmira",
						"03": "Sardinal",
						"04": "Belen"
					}
				},
				"06": {
					"nombre": "Cañas",
					"distritos": {
						"01": "Cañas",
						"02": "Palmira",
						"03": "San Miguel",
						"04": "Bebedero",
						"05": "Porozal"
					}
				},
				"07": {
					"nombre": "Abangares",
					"distritos": {
						"01": "Las Juntas",
						"02": "Sierra",
						"03": "San Juan",
						"04": "Colorado"
					}
				},
				"08": {
					"nombre": "Tilarán",
					"distritos": {
						"01": "Tilarán",
						"02": "Quebrada Grande",
						"03": "Tronadora",
						"04": "Santa Rosa",
						"05": "Líbano",
						"06": "Tierras Morenas",
						"07": "Arenal"
					}
				},
				"09": {
					"nombre": "Nandayure",
					"distritos": {
						"01": "Carmona",
						"02": "Santa Rita",
						"03": "Zapotal",
						"04": "San Pablo",
						"05": "Porvenir",
						"06": "Bejuco"
					}
				},
				"10": {
					"nombre": "La Cruz",
					"distritos": {
						"01": "La Cruz",
						"02": "Santa Cecilia",
						"03": "La Garita",
						"04": "Santa Elena"
					}
				},
				"11": {
					"nombre": "Hojancha",
					"distritos": {
						"01": "Hojancha",
						"02": "Monte Romo",
						"03": "Puerto Carrillo",
						"04": "Huacas"
					}
				}
			}
		},
		"6": {
			"nombre": "Puntarenas",
			"cantones": {
				"01": {
					"nombre": "Central",
					"distritos": {
						"01": "Puntarenas",
						"02": "Pitahaya",
						"03": "Chomes",
						"04": "Lepanto",
						"05": "Paquera",
						"06": "Manzanillo",
						"07": "Guacimal",
						"08": "Barranca",
						"09": "Monte Verde",
						"10": "Isla Del Coco",
						"11": "Cóbano",
						"12": "Chacarita",
						"13": "Chira",
						"14": "Acapulco",
						"15": "El Roble",
						"16": "Arancibia"
					}
				},
				"02": {
					"nombre": "Esparza",
					"distritos": {
						"01": "Espíritu Santo",
						"02": "San Juan Grande",
						"03": "Macacona",
						"04": "San Rafael",
						"05": "San Jerónimo"
					}
				},
				"03": {
					"nombre": "Buenos Aires",
					"distritos": {
						"01": "Buenos Aires",
						"02": "Volcán",
						"03": "Potrero Grande",
						"04": "Boruca",
						"05": "Pilas",
						"06": "Colinas",
						"07": "Changuena",
						"08": "Biolley",
						"09": "Brunka"
					}
				},
				"04": {
					"nombre": "Montes De Oro",
					"distritos": {
						"01": "Miramar",
						"02": "La Unión",
						"03": "San Isidro"
					}
				},
				"05": {
					"nombre": "Osa",
					"distritos": {
						"01": "Puerto Cortés",
						"02": "Palmar",
						"03": "Sierpe",
						"04": "Bahía Ballena",
						"05": "Piedras Blancas",
						"06": "Bahía Drake"
					}
				},
				"06": {
					"nombre": "Quepos",
					"distritos": {
						"01": "Quepos",
						"02": "Savegre",
						"03": "Naranjito"
					}
				},
				"07": {
					"nombre": "Golfito",
					"distritos": {
						"01": "Golfito",
						"02": "Puerto Jiménez",
						"03": "Guaycara",
						"04": "Pavón"
					}
				},
				"08": {
					"nombre": "Coto Brus",
					"distritos": {
						"01": "San Vito",
						"02": "Sabalito",
						"03": "Aguabuena",
						"04": "Limoncito",
						"05": "Pittier"
					}
				},
				"09": {
					"nombre": "Parrita",
					"distritos": {
						"01": "Parrita"
					}
				},
				"10": {
					"nombre": "Corredores",
					"distritos": {
						"01": "Corredor",
						"02": "La Cuesta",
						"03": "Canoas",
						"04": "Laurel"
					}
				},
				"11": {
					"nombre": "Garabito",
					"distritos": {
						"01": "Jacó",
						"02": "Tárcoles"
					}
				}
			}
		},
		"7": {
			"nombre": "Limón",
			"cantones": {
				"01": {
					"nombre": "Central",
					"distritos": {
						"01": "Limón",
						"02": "Valle La Estrella",
						"03": "Rio Blanco",
						"04": "Matama"
					}
				},
				"02": {
					"nombre": "Pococí",
					"distritos": {
						"01": "Guapiles",
						"02": "Jiménez",
						"03": "Rita",
						"04": "Roxana",
						"05": "Cariari",
						"06": "Colorado",
						"07": "La Colonia"
					}
				},
				"03": {
					"nombre": "Siquirres",
					"distritos": {
						"01": "Siquirres",
						"02": "Pacuarito",
						"03": "Florida",
						"04": "Germania",
						"05": "El Cairo",
						"06": "Alegría"
					}
				},
				"04": { 
					"nombre": "Talamanca",
					"distritos": {
						"01": "Bratsi",
						"02": "Sixaola",
						"03": "Cahuita",
						"04": "Telire"
					}
				},
				"05": {
					"nombre": "Matina",
					"distritos": {
						"01": "Matina",
						"02": "Batán",
						"03": "Carrandi"
					}
				},
				"06": {
					"nombre": "Guácimo",
					"distritos": {
						"01": "Guácimo",
						"02": "Mercedes",
						"03": "Pocora",
						"04": "Rio Jiménez",
						"05": "Duacari"
					}
				}
			}
		}
	}
}

// Inicializar dropdowns
function initializeDropdowns() {
    const provincias = provinciasData.provincias; 
    const provinciaSelect = document.getElementById("provincia");
    const provinciaSelect_editar = document.getElementById("provincia_editar");

    provinciaSelect.innerHTML = Object.keys(provincias).map(key => {
        const provincia = provincias[key];
        return `<option value="${key}">${provincia.nombre}</option>`;
    }).join("");

    provinciaSelect_editar.innerHTML = Object.keys(provincias).map(key => {
        const provincia = provincias[key];
        return `<option value="${key}">${provincia.nombre}</option>`;
    }).join("");

    provinciaSelect.addEventListener("change", updateCantones);
    provinciaSelect_editar.addEventListener("change", updateCantones);
    updateCantones(); // Llenar cantones iniciales
}

// Actualizar cantones
function updateCantones() {
    const provincias = provinciasData.provincias;
    const provinciaId = document.getElementById("provincia").value;
    const provinciaId_editar = document.getElementById("provincia_editar").value;
    const cantonesData = provincias[provinciaId]?.cantones || {};
    const cantonesData_editar = provincias[provinciaId_editar]?.cantones || {};

    const cantonSelect = document.getElementById("canton");
    const cantonSelect_editar = document.getElementById("canton_editar");

    cantonSelect.innerHTML = Object.keys(cantonesData).map(key => {
        const canton = cantonesData[key];
        return `<option value="${key}">${canton.nombre}</option>`;
    }).join("");

    cantonSelect_editar.innerHTML = Object.keys(cantonesData_editar).map(key => {
        const canton = cantonesData_editar[key];
        return `<option value="${key}">${canton.nombre}</option>`;
    }).join("");

    cantonSelect.addEventListener("change", updateDistritos);
    cantonSelect_editar.addEventListener("change", updateDistritos);
    updateDistritos(); // Llenar distritos iniciales
}

// Actualizar distritos
function updateDistritos() {
    const provincias = provinciasData.provincias;
    const provinciaId = document.getElementById("provincia").value;
    const provinciaId_editar = document.getElementById("provincia_editar").value;
    const cantonId = document.getElementById("canton").value;
    const cantonId_editar = document.getElementById("canton_editar").value;
    const distritosData = provincias[provinciaId]?.cantones[cantonId]?.distritos || {};
    const distritosData_editar = provincias[provinciaId_editar]?.cantones[cantonId_editar]?.distritos || {};

    const distritoSelect = document.getElementById("distrito");
    const distritoSelect_editar = document.getElementById("distrito_editar");

    distritoSelect.innerHTML = Object.keys(distritosData).map(key => {
        return `<option value="${key}">${distritosData[key]}</option>`;
    }).join("");

    distritoSelect_editar.innerHTML = Object.keys(distritosData_editar).map(key => {
        return `<option value="${key}">${distritosData_editar[key]}</option>`;
    }).join("");
}

// Llamar a la función de inicialización al cargar la página
initializeDropdowns();
