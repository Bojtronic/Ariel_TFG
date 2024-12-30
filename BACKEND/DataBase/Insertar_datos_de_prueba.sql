-- Insertar roles
INSERT INTO roles (nombre, tarifa_hora) VALUES 
('Administrador', 10000),
('Colaborador', 3500),
('Supervisor', 7000);

-- Insertar usuarios
INSERT INTO usuarios (id_rol, tipo_identificacion, identificacion, nombre, apellido_1, apellido_2, provincia, canton, distrito, direccion, correo, contrasena, telefono, operador_telefono, estado) VALUES 
(1, 'Cédula', '1-1234-5678', 'María', 'Fernández', 'Jiménez', 'San José', 'Escazú', 'San Rafael', 'Calle Lajas, Casa 12', 'maria.fernandez@empresa.com', 'password123', 88881111, 'Kolbi', 'activo'),
(2, 'DIMEX', '123456789012', 'Juan', 'Pérez', 'Rodríguez', 'Heredia', 'Heredia', 'Mercedes', 'Barrio Los Ángeles, Edificio Azul', 'juan.perez@empresa.com', 'password456', 84567890, 'Claro', 'activo'),
(3, 'Cédula', '2-3456-7890', 'Ana', 'Soto', 'Morales', 'Alajuela', 'Alajuela', 'San José', 'Calle Principal, Condominio Verde', 'ana.soto@empresa.com', 'password789', 88882222, 'Liberty', 'activo');

-- Insertar salarios
INSERT INTO salarios (id_usuario, fecha_inicio, fecha_fin, salario_mensual, bonificaciones, horas_extras) VALUES 
(1, '2024-01-01', '2024-12-31', 1500000, 50000, 10),
(2, '2024-01-01', '2024-12-31', 500000, 20000, 5),
(3, '2024-01-01', '2024-12-31', 1000000, 30000, 8);

-- Insertar permisos
INSERT INTO permisos (id_usuario, fecha_solicitud, fecha_inicio, fecha_fin, estado, comentario) VALUES 
(1, '2024-12-15', '2024-12-20', '2024-12-25', 'aprobado', 'Vacaciones familiares.'),
(2, '2024-11-10', '2024-11-15', '2024-11-20', 'rechazado', 'No cumple con los días acumulados.'),
(3, '2024-12-01', '2024-12-05', '2024-12-10', 'pendiente', 'Motivo personal.');

-- Insertar vacaciones
INSERT INTO vacaciones (id_usuario, dias_acumulados, dias_usados) VALUES 
(1, 10, 5),
(2, 8, 3),
(3, 12, 6);

-- Insertar solicitudes de vacaciones
INSERT INTO solicitudes_vacaciones (id_usuario, fecha_solicitud, fecha_inicio, fecha_fin, estado, comentario) VALUES 
(1, '2024-12-10', '2024-12-15', '2024-12-20', 'aprobado', 'Viaje a la playa.'),
(2, '2024-10-01', '2024-10-10', '2024-10-15', 'rechazado', 'No tiene suficientes días acumulados.'),
(3, '2024-11-20', '2024-11-25', '2024-11-30', 'pendiente', 'Asuntos familiares.');

-- Insertar incapacidades
INSERT INTO incapacidades (id_usuario, fecha_inicio, fecha_fin, motivo) VALUES 
(1, '2024-09-01', '2024-09-05', 'Accidente automovilístico.'),
(2, '2024-08-10', '2024-08-20', 'Cirugía programada.'),
(3, '2024-07-15', '2024-07-20', 'Enfermedad respiratoria.');

-- Insertar deducciones
INSERT INTO deducciones (id_usuario, fecha, monto, tipo) VALUES 
(1, '2024-12-01', 5000, 'Impuesto renta'),
(2, '2024-11-01', 3000, 'Caja de ahorro'),
(3, '2024-10-01', 2000, 'Seguro social');
