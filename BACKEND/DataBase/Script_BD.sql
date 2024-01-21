DROP SCHEMA public CASCADE;
CREATE SCHEMA public;

---------------------- CREACION DE TABLAS ------------------------------------------------------------

CREATE TABLE PERSONAS (
	id SERIAL PRIMARY KEY,
    nombre VARCHAR(50),
    apellido1 VARCHAR(50),
	apellido2 VARCHAR(50),
	cedula BIGINT,
	fecha_nacimiento date,
	genero VARCHAR(20),
	estado VARCHAR(20)
);

CREATE TABLE ADMINISTRADORES (
	id SERIAL PRIMARY KEY,
    id_persona INT,
    correo VARCHAR(50),
	clave VARCHAR(20)
);

CREATE TABLE ROLES (
	id SERIAL PRIMARY KEY,
    nombre VARCHAR(20),
	descripcion VARCHAR(50)
);

CREATE TABLE TELEFONOS (
	id SERIAL PRIMARY KEY,
	id_persona INT,
    numero VARCHAR(20),
	descripcion VARCHAR(50)
);

CREATE TABLE AULAS (
	id SERIAL PRIMARY KEY,
    nombre VARCHAR(20),
	descripcion VARCHAR(50)
);

CREATE TABLE FUNCIONARIOS (
	id SERIAL PRIMARY KEY,
    id_persona INT,
	rol INT,
	aula INT,
	correo VARCHAR(50),
	clave VARCHAR(10)
);

CREATE TABLE ENCARGADOS (
	id SERIAL PRIMARY KEY,
    id_persona INT,
	direccion VARCHAR(200)
);

CREATE TABLE PERSONAS_MENORES (
	id SERIAL PRIMARY KEY,
    id_persona INT,
	id_encargado INT,
	autorizacion BOOLEAN
);

CREATE TABLE CONTROL_ASISTENCIA (
	id SERIAL PRIMARY KEY,
    id_funcionario INT,
	id_menor INT,
	fecha DATE,
	asistencia BOOLEAN
);

CREATE TABLE CATEGORIAS (
	id SERIAL PRIMARY KEY,
    dinero INT,
	descripcion VARCHAR(50)
);

CREATE TABLE PROYECTOS (
	id SERIAL PRIMARY KEY,
    nombre VARCHAR(20),
	descripcion VARCHAR(50),
	fecha DATE
);

CREATE TABLE RENDIMIENTOS (
	id SERIAL PRIMARY KEY,
    id_menor INT,
	id_proyecto INT,
	nota INT
);

CREATE TABLE TAMISAJES (
	id SERIAL PRIMARY KEY,
    id_menor INT,
	periodo INT,
	resultado INT
);

CREATE TABLE CUOTAS (
	id SERIAL PRIMARY KEY,
    id_menor INT,
	id_categoria INT
);

---------------------- ASIGNAR LLAVES FORANEAS ------------------------------------------------------------

-- Para ADMINISTRADORES
ALTER TABLE ADMINISTRADORES
ADD FOREIGN KEY (id_persona) REFERENCES PERSONAS(id);

-- Para TELEFONOS
ALTER TABLE TELEFONOS
ADD FOREIGN KEY (id_persona) REFERENCES PERSONAS(id);

-- Para FUNCIONARIOS
ALTER TABLE FUNCIONARIOS
ADD FOREIGN KEY (id_persona) REFERENCES PERSONAS(id),
ADD FOREIGN KEY (rol) REFERENCES ROLES(id),
ADD FOREIGN KEY (aula) REFERENCES AULAS(id);

-- Para ENCARGADOS
ALTER TABLE ENCARGADOS
ADD FOREIGN KEY (id_persona) REFERENCES PERSONAS(id);

-- Para PERSONAS_MENORES
ALTER TABLE PERSONAS_MENORES
ADD FOREIGN KEY (id_persona) REFERENCES PERSONAS(id),
ADD FOREIGN KEY (id_encargado) REFERENCES ENCARGADOS(id);

-- Para CONTROL_ASISTENCIA
ALTER TABLE CONTROL_ASISTENCIA
ADD FOREIGN KEY (id_funcionario) REFERENCES FUNCIONARIOS(id),
ADD FOREIGN KEY (id_menor) REFERENCES PERSONAS_MENORES(id);

-- Para RENDIMIENTOS
ALTER TABLE RENDIMIENTOS
ADD FOREIGN KEY (id_menor) REFERENCES PERSONAS_MENORES(id),
ADD FOREIGN KEY (id_proyecto) REFERENCES PROYECTOS(id);

-- Para TAMISAJES
ALTER TABLE TAMISAJES
ADD FOREIGN KEY (id_menor) REFERENCES PERSONAS_MENORES(id);

-- Para CUOTAS
ALTER TABLE CUOTAS
ADD FOREIGN KEY (id_menor) REFERENCES PERSONAS_MENORES(id),
ADD FOREIGN KEY (id_categoria) REFERENCES CATEGORIAS(id);


---------------------- INSERTAR DATOS ------------------------------------------------------------

-- Para PERSONAS
INSERT INTO PERSONAS (nombre, apellido1, apellido2, cedula, fecha_nacimiento, genero, estado)
VALUES
    ('Nombre1', 'Apellido1-1', 'Apellido1-2', 1234567890, '2000-01-01', 'Masculino', 'Activo'),
    ('Nombre2', 'Apellido2-1', 'Apellido2-2', 2345678901, '2000-02-02', 'Femenino', 'Inactivo'),
    ('Nombre3', 'Apellido3-1', 'Apellido3-2', 3456789012, '2000-03-03', 'Masculino', 'Activo'),
    ('Nombre4', 'Apellido4-1', 'Apellido4-2', 4567890123, '2000-04-04', 'Femenino', 'Inactivo'),
    ('Nombre5', 'Apellido5-1', 'Apellido5-2', 5678901234, '2000-05-05', 'Masculino', 'Activo');

-- Para ROLES
INSERT INTO ROLES (nombre, descripcion)
VALUES
    ('Rol1', 'Descripción1'),
    ('Rol2', 'Descripción2'),
    ('Rol3', 'Descripción3'),
    ('Rol4', 'Descripción4'),
    ('Rol5', 'Descripción5');

-- Para TELEFONOS
INSERT INTO TELEFONOS (id_persona, numero, descripcion)
VALUES
    (1, '123456789', 'Teléfono1'),
    (2, '234567890', 'Teléfono2'),
    (3, '345678901', 'Teléfono3'),
    (4, '456789012', 'Teléfono4'),
    (5, '567890123', 'Teléfono5');

-- Para AULAS
INSERT INTO AULAS (nombre, descripcion)
VALUES
    ('Aula1', 'Descripción Aula1'),
    ('Aula2', 'Descripción Aula2'),
    ('Aula3', 'Descripción Aula3'),
    ('Aula4', 'Descripción Aula4'),
    ('Aula5', 'Descripción Aula5');

-- Para FUNCIONARIOS
INSERT INTO FUNCIONARIOS (id_persona, rol, aula, correo, clave)
VALUES
    (1, 1, 1, 'correo1@example.com', 'clave1'),
    (2, 2, 2, 'correo2@example.com', 'clave2'),
    (3, 3, 3, 'correo3@example.com', 'clave3'),
    (4, 4, 4, 'correo4@example.com', 'clave4'),
    (5, 5, 5, 'correo5@example.com', 'clave5');

-- Para ENCARGADOS
INSERT INTO ENCARGADOS (id_persona, direccion)
VALUES
    (1, 'Dirección1'),
    (2, 'Dirección2'),
    (3, 'Dirección3'),
    (4, 'Dirección4'),
    (5, 'Dirección5');

-- Para PERSONAS_MENORES
INSERT INTO PERSONAS_MENORES (id_persona, id_encargado, autorizacion)
VALUES
    (1, 1, true),
    (2, 2, false),
    (3, 3, true),
    (4, 4, false),
    (5, 5, true);

-- Para CONTROL_ASISTENCIA
INSERT INTO CONTROL_ASISTENCIA (id_funcionario, id_menor, fecha, asistencia)
VALUES
    (1, 1, '2024-01-20', true),
    (2, 2, '2024-01-20', false),
    (3, 3, '2024-01-20', true),
    (4, 4, '2024-01-20', false),
    (5, 5, '2024-01-20', true);

-- Para CATEGORIAS
INSERT INTO CATEGORIAS (dinero, descripcion)
VALUES
    (100, 'Categoría1'),
    (200, 'Categoría2'),
    (300, 'Categoría3'),
    (400, 'Categoría4'),
    (500, 'Categoría5');

-- Para PROYECTOS
INSERT INTO PROYECTOS (nombre, descripcion, fecha)
VALUES
    ('Proyecto1', 'Descripción Proyecto1', '2024-01-20'),
    ('Proyecto2', 'Descripción Proyecto2', '2024-01-21'),
    ('Proyecto3', 'Descripción Proyecto3', '2024-01-22'),
    ('Proyecto4', 'Descripción Proyecto4', '2024-01-23'),
    ('Proyecto5', 'Descripción Proyecto5', '2024-01-24');

-- Para RENDIMIENTOS
INSERT INTO RENDIMIENTOS (id_menor, id_proyecto, nota)
VALUES
    (1, 1, 90),
    (2, 2, 85),
    (3, 3, 92),
    (4, 4, 78),
    (5, 5, 95);

-- Para TAMISAJES
INSERT INTO TAMISAJES (id_menor, periodo, resultado)
VALUES
    (1, 1, 80),
    (2, 2, 75),
    (3, 3, 88),
    (4, 4, 70),
    (5, 5, 92);

-- Para CUOTAS
INSERT INTO CUOTAS (id_menor, id_categoria)
VALUES
    (1, 1),
    (2, 2),
    (3, 3),
    (4, 4),
    (5, 5);

-- Para ADMINISTRADORES
INSERT INTO ADMINISTRADORES (id_persona, correo, clave)
VALUES
    (1, 'admin1@example.com', 'clave_admin1'),
    (2, 'admin2@example.com', 'clave_admin2'),
    (3, 'admin3@example.com', 'clave_admin3'),
    (4, 'admin4@example.com', 'clave_admin4'),
    (5, 'admin5@example.com', 'clave_admin5');


select * from PERSONAS;

