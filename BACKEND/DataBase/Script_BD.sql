-- Eliminar la base de datos si ya existe
DROP DATABASE IF EXISTS RecursosHumanos;

-- Crear la base de datos
CREATE DATABASE RecursosHumanos;

-- Conectar a la base de datos
\c RecursosHumanos;

-- Crear las tablas principales

-- Tabla de Colaboradores
CREATE TABLE Colaboradores (
    id_colaborador SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    cedula VARCHAR(20) UNIQUE NOT NULL,
    fecha_ingreso DATE NOT NULL,
    puesto VARCHAR(100),
    salario_base NUMERIC(10, 2) NOT NULL,
    salario_por_hora NUMERIC(10, 2)
);

-- Tabla de Aguinaldos
CREATE TABLE Aguinaldos (
    id_aguinaldo SERIAL PRIMARY KEY,
    id_colaborador INT NOT NULL,
    anio INT NOT NULL,
    monto NUMERIC(10, 2) NOT NULL
);

-- Tabla de Permisos
CREATE TABLE Permisos (
    id_permiso SERIAL PRIMARY KEY,
    id_colaborador INT NOT NULL,
    fecha_solicitud DATE NOT NULL,
    tipo_permiso VARCHAR(50) CHECK (tipo_permiso IN ('Con goce de salario', 'Sin goce de salario')) NOT NULL,
    estado VARCHAR(20) CHECK (estado IN ('Pendiente', 'Aprobado', 'Rechazado')) DEFAULT 'Pendiente',
    detalles TEXT
);

-- Tabla de Vacaciones
CREATE TABLE Vacaciones (
    id_vacacion SERIAL PRIMARY KEY,
    id_colaborador INT NOT NULL,
    dias_disponibles NUMERIC(5, 2) DEFAULT 0,
    dias_usados NUMERIC(5, 2) DEFAULT 0
);

-- Tabla de Horas Extras
CREATE TABLE HorasExtras (
    id_hora_extra SERIAL PRIMARY KEY,
    id_colaborador INT NOT NULL,
    fecha DATE NOT NULL,
    cantidad_horas NUMERIC(5, 2) NOT NULL,
    monto_pagado NUMERIC(10, 2) NOT NULL
);

-- Tabla de Incapacidades
CREATE TABLE Incapacidades (
    id_incapacidad SERIAL PRIMARY KEY,
    id_colaborador INT NOT NULL,
    tipo_incapacidad VARCHAR(50) NOT NULL,
    fecha_inicio DATE NOT NULL,
    fecha_fin DATE NOT NULL,
    detalles TEXT
);

-- Tabla de Liquidaciones
CREATE TABLE Liquidaciones (
    id_liquidacion SERIAL PRIMARY KEY,
    id_colaborador INT NOT NULL,
    fecha_calculo DATE NOT NULL,
    monto_total NUMERIC(10, 2) NOT NULL
);

-- Tabla de Marcas de Entrada/Salida
CREATE TABLE RegistroMarcas (
    id_marca SERIAL PRIMARY KEY,
    id_colaborador INT NOT NULL,
    fecha DATE NOT NULL,
    hora_entrada TIME NOT NULL,
    hora_salida TIME
);

-- Tabla de Deducciones
CREATE TABLE Deducciones (
    id_deduccion SERIAL PRIMARY KEY,
    id_colaborador INT NOT NULL,
    fecha DATE NOT NULL,
    monto NUMERIC(10, 2) NOT NULL,
    tipo_deduccion VARCHAR(50) CHECK (tipo_deduccion IN ('CCSS', 'Impuesto sobre la Renta')) NOT NULL
);

-- Tabla de Planillas
CREATE TABLE Planillas (
    id_planilla SERIAL PRIMARY KEY,
    id_colaborador INT NOT NULL,
    fecha_pago DATE NOT NULL,
    salario_bruto NUMERIC(10, 2) NOT NULL,
    deducciones NUMERIC(10, 2) NOT NULL,
    salario_neto NUMERIC(10, 2) NOT NULL
);

-- Tabla de Reportes
CREATE TABLE Reportes (
    id_reporte SERIAL PRIMARY KEY,
    id_modulo VARCHAR(50) NOT NULL,
    fecha_generacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    formato VARCHAR(10) CHECK (formato IN ('PDF')) NOT NULL,
    contenido BYTEA
);

-- Tabla de Perfiles y Usuarios (Seguridad)
CREATE TABLE Perfiles (
    id_perfil SERIAL PRIMARY KEY,
    nombre_perfil VARCHAR(50) NOT NULL,
    descripcion TEXT
);

CREATE TABLE Usuarios (
    id_usuario SERIAL PRIMARY KEY,
    id_colaborador INT,
    username VARCHAR(50) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    id_perfil INT
);

-- Agregar llaves foráneas
ALTER TABLE Aguinaldos ADD CONSTRAINT fk_aguinaldos_colaboradores FOREIGN KEY (id_colaborador) REFERENCES Colaboradores(id_colaborador);
ALTER TABLE Permisos ADD CONSTRAINT fk_permisos_colaboradores FOREIGN KEY (id_colaborador) REFERENCES Colaboradores(id_colaborador);
ALTER TABLE Vacaciones ADD CONSTRAINT fk_vacaciones_colaboradores FOREIGN KEY (id_colaborador) REFERENCES Colaboradores(id_colaborador);
ALTER TABLE HorasExtras ADD CONSTRAINT fk_horasextras_colaboradores FOREIGN KEY (id_colaborador) REFERENCES Colaboradores(id_colaborador);
ALTER TABLE Incapacidades ADD CONSTRAINT fk_incapacidades_colaboradores FOREIGN KEY (id_colaborador) REFERENCES Colaboradores(id_colaborador);
ALTER TABLE Liquidaciones ADD CONSTRAINT fk_liquidaciones_colaboradores FOREIGN KEY (id_colaborador) REFERENCES Colaboradores(id_colaborador);
ALTER TABLE RegistroMarcas ADD CONSTRAINT fk_registromarcas_colaboradores FOREIGN KEY (id_colaborador) REFERENCES Colaboradores(id_colaborador);
ALTER TABLE Deducciones ADD CONSTRAINT fk_deducciones_colaboradores FOREIGN KEY (id_colaborador) REFERENCES Colaboradores(id_colaborador);
ALTER TABLE Planillas ADD CONSTRAINT fk_planillas_colaboradores FOREIGN KEY (id_colaborador) REFERENCES Colaboradores(id_colaborador);
ALTER TABLE Usuarios ADD CONSTRAINT fk_usuarios_colaboradores FOREIGN KEY (id_colaborador) REFERENCES Colaboradores(id_colaborador);
ALTER TABLE Usuarios ADD CONSTRAINT fk_usuarios_perfiles FOREIGN KEY (id_perfil) REFERENCES Perfiles(id_perfil);
