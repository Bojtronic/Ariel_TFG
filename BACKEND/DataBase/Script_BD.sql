-- Eliminar la base de datos si ya existe
DROP DATABASE IF EXISTS RecursosHumanos;

-- Crear la base de datos
CREATE DATABASE RecursosHumanos;

-- Conectar a la base de datos (solo para PostgreSQL CLI)
\c RecursosHumanos;

-- Tabla de roles
CREATE TABLE roles (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL UNIQUE, -- Ejemplo: administrador, colaborador, etc.
    tarifa_hora NUMERIC(10, 2) NOT NULL CHECK (tarifa_hora >= 0) -- Tarifa por hora para cálculo de horas extras
);

-- Tabla de usuarios
CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    id_rol INT NOT NULL,
    tipo_identificacion VARCHAR(50) NOT NULL, -- Ejemplo: cedula, dimex, etc
    identificacion VARCHAR(100) NOT NULL, 
    nombre VARCHAR(50) NOT NULL,
    apellido_1 VARCHAR(50) NOT NULL,
    apellido_2 VARCHAR(50) NOT NULL,
    provincia VARCHAR(50) NOT NULL,
    canton VARCHAR(50) NOT NULL,
    distrito VARCHAR(50) NOT NULL,
    direccion VARCHAR(100) NOT NULL,
    correo VARCHAR(50) UNIQUE NOT NULL CHECK (correo ~* '^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$'), -- Validación regex para correos
    contrasena VARCHAR(100) NOT NULL, -- Longitud para compatibilidad con contraseñas encriptadas
    telefono BIGINT NOT NULL, 
    operador_telefono VARCHAR(50) NOT NULL, -- Ejemplo: kolbi, claro, liberty
    estado VARCHAR(20) DEFAULT 'activo',
    FOREIGN KEY (id_rol) REFERENCES roles(id) ON DELETE CASCADE
);


-- Tabla de salarios
CREATE TABLE salarios (
    id SERIAL PRIMARY KEY,
    id_usuario INT NOT NULL,
    fecha_inicio DATE NOT NULL CHECK (fecha_inicio <= CURRENT_DATE),
    fecha_fin DATE NOT NULL CHECK (fecha_fin >= fecha_inicio),
    salario_mensual NUMERIC(12, 2) NOT NULL CHECK (salario_mensual >= 0),
    bonificaciones NUMERIC(12, 2) DEFAULT 0 CHECK (bonificaciones >= 0),
    horas_extras NUMERIC(12, 2) DEFAULT 0 CHECK (horas_extras >= 0),
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id) ON DELETE CASCADE
);

-- Tabla de permisos
CREATE TABLE permisos (
    id SERIAL PRIMARY KEY,
    id_usuario INT NOT NULL,
    fecha_solicitud DATE NOT NULL DEFAULT CURRENT_DATE,
    fecha_inicio DATE NOT NULL CHECK (fecha_inicio >= fecha_solicitud),
    fecha_fin DATE NOT NULL CHECK (fecha_fin >= fecha_inicio),
    estado VARCHAR(10) NOT NULL CHECK (estado IN ('aprobado', 'rechazado', 'pendiente')),
    comentario TEXT,
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id) ON DELETE CASCADE
);

-- Tabla de vacaciones
CREATE TABLE vacaciones (
    id SERIAL PRIMARY KEY,
    id_usuario INT NOT NULL,
    dias_acumulados NUMERIC(5, 2) DEFAULT 0 CHECK (dias_acumulados >= 0),
    dias_usados NUMERIC(5, 2) DEFAULT 0 CHECK (dias_usados >= 0 AND dias_usados <= dias_acumulados),
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id) ON DELETE CASCADE
);

-- Tabla de solicitudes de vacaciones
CREATE TABLE solicitudes_vacaciones (
    id SERIAL PRIMARY KEY,
    id_usuario INT NOT NULL,
    fecha_solicitud DATE NOT NULL DEFAULT CURRENT_DATE,
    fecha_inicio DATE NOT NULL CHECK (fecha_inicio >= fecha_solicitud),
    fecha_fin DATE NOT NULL CHECK (fecha_fin >= fecha_inicio),
    estado VARCHAR(10) NOT NULL CHECK (estado IN ('aprobado', 'rechazado', 'pendiente')),
    comentario TEXT,
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id) ON DELETE CASCADE
);

-- Tabla de incapacidades
CREATE TABLE incapacidades (
    id SERIAL PRIMARY KEY,
    id_usuario INT NOT NULL,
    fecha_inicio DATE NOT NULL,
    fecha_fin DATE NOT NULL CHECK (fecha_fin >= fecha_inicio),
    motivo TEXT NOT NULL,
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id) ON DELETE CASCADE
);

-- Tabla de liquidaciones
CREATE TABLE liquidaciones (
    id SERIAL PRIMARY KEY,
    id_usuario INT NOT NULL,
    fecha DATE NOT NULL DEFAULT CURRENT_DATE,
    indemnizacion NUMERIC(12, 2) CHECK (indemnizacion >= 0),
    aguinaldo NUMERIC(12, 2) CHECK (aguinaldo >= 0),
    vacaciones_acumuladas NUMERIC(12, 2) CHECK (vacaciones_acumuladas >= 0),
    total NUMERIC(12, 2) NOT NULL CHECK (total >= 0),
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id) ON DELETE CASCADE
);

-- Tabla de marcas de entrada y salida
CREATE TABLE marcas (
    id SERIAL PRIMARY KEY,
    id_usuario INT NOT NULL,
    fecha DATE NOT NULL CHECK (fecha <= CURRENT_DATE),
    hora_entrada TIME,
    hora_salida TIME,
    ausente BOOLEAN DEFAULT FALSE,
    tardia BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id) ON DELETE CASCADE
);

-- Tabla de deducciones
CREATE TABLE deducciones (
    id SERIAL PRIMARY KEY,
    id_usuario INT NOT NULL,
    fecha DATE NOT NULL CHECK (fecha <= CURRENT_DATE),
    monto NUMERIC(12, 2) NOT NULL CHECK (monto >= 0),
    tipo VARCHAR(50) NOT NULL,
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id) ON DELETE CASCADE
);

-- Tabla de planillas
CREATE TABLE planillas (
    id SERIAL PRIMARY KEY,
    id_usuario INT NOT NULL,
    fecha_inicio DATE NOT NULL,
    fecha_fin DATE NOT NULL CHECK (fecha_fin >= fecha_inicio),
    salario_bruto NUMERIC(12, 2) NOT NULL CHECK (salario_bruto >= 0),
    deducciones NUMERIC(12, 2) NOT NULL CHECK (deducciones >= 0),
    salario_neto NUMERIC(12, 2) NOT NULL CHECK (salario_neto >= 0),
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id) ON DELETE CASCADE
);

-- Tabla de reportes
CREATE TABLE reportes (
    id SERIAL PRIMARY KEY,
    id_usuario INT NOT NULL,
    modulo VARCHAR(50) NOT NULL,
    fecha_generacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id) ON DELETE CASCADE
);

-- Tabla de seguridad
CREATE TABLE seguridad (
    id SERIAL PRIMARY KEY,
    id_usuario INT NOT NULL,
    intentos_fallidos INT DEFAULT 0 CHECK (intentos_fallidos >= 0),
    ultimo_acceso TIMESTAMP,
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id) ON DELETE CASCADE
);
