-- Crear tabla roles
CREATE TABLE roles (
  id SERIAL PRIMARY KEY,
  nombre TEXT NOT NULL
);

INSERT INTO roles (nombre) VALUES 
  ('admin'),
  ('gerente_almacen'),
  ('lider_recoleccion');


-- Crear tabla usuarios
CREATE TABLE usuarios (
  correo TEXT NOT NULL,
  nombres TEXT NOT NULL,
  apellido_paterno TEXT NOT NULL,
  apellido_materno TEXT,
  contrasenia TEXT NOT NULL,
  activo BOOLEAN NOT NULL DEFAULT TRUE,
  roleId INTEGER NOT NULL,
  FOREIGN KEY (roleId) REFERENCES roles(id)
);

-- Crear tabla opciones
CREATE TABLE opciones (
  id SERIAL PRIMARY KEY,
  ruta TEXT NOT NULL,
  texto TEXT NOT NULL,
  icono TEXT NOT NULL
);

-- Crear tabla roles_opciones
CREATE TABLE roles_opciones (
  id SERIAL PRIMARY KEY,
  opcionId INTEGER NOT NULL,
  roleId INTEGER NOT NULL,
  FOREIGN KEY (opcionId) REFERENCES opciones(id),
  FOREIGN KEY (roleId) REFERENCES roles(id)
);

INSERT INTO opciones (ruta, texto, icono) VALUES
('/dashboard/inicio', 'Inicio', 'home'),
('/dashboard/almacen', 'Almacen', 'package'),
('/dashboard/hectarea', 'Hectareas', 'sprout'),
('/dashboard/cat-usuarios', 'Cat. Usuarios', 'users');

-- Now, assuming your roles table has these IDs (adjust if different):
-- admin = 1
-- gerente_almacen = 2
-- lider_recoleccion = 3

-- Let's create the relationships in roles_opciones
-- For admin (all options)
INSERT INTO roles_opciones (opcionId, roleId)
SELECT id, 1 FROM opciones;

-- For gerente_almacen (only Inicio and Almacen)
INSERT INTO roles_opciones (opcionId, roleId)
SELECT id, 2
FROM opciones
WHERE ruta IN ('/dashboard/inicio', '/dashboard/almacen');

-- For lider_recoleccion (only Inicio and Regis. Cajas)
INSERT INTO roles_opciones (opcionId, roleId)
SELECT id, 3
FROM opciones
WHERE ruta IN ('/dashboard/inicio', '/dashboard/hectarea');


CREATE TABLE sensor_producto (
  id SERIAL PRIMARY KEY,
  porcentage_color NUMERIC NOT NULL,
  porcentaje_textura NUMERIC NOT NULL,
  oxigenacion NUMERIC NOT NULL
);

CREATE TABLE sensor_crecimiento (
  id SERIAL PRIMARY KEY,
  altura NUMERIC NOT NULL,
  grosor_tallo NUMERIC NOT NULL,
  presencia_plagas NUMERIC NOT NULL,
  humedad NUMERIC NOT NULL
);

CREATE TABLE hectareas (
  id_hectarea INTEGER PRIMARY KEY,
  comunidad TEXT NOT NULL,
  ubicacion TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'NO COSECHABLE'
);

CREATE TABLE plantas (
  id_planta SERIAL PRIMARY KEY,
  hectarea_id INTEGER NOT NULL REFERENCES hectareas(id_hectarea) ON DELETE CASCADE,
  status TEXT NOT NULL DEFAULT 'SALUDABLE',
  sensor_producto_id INTEGER REFERENCES sensor_producto(id) ON DELETE SET NULL,
  sensor_crecimiento_id INTEGER REFERENCES sensor_crecimiento(id) ON DELETE SET NULL
);

CREATE TABLE cajas (
  id_caja SERIAL PRIMARY KEY,
  kg INTEGER NOT NULL,
  planta_id INTEGER REFERENCES plantas(id_planta) ON DELETE SET NULL
);

CREATE TABLE almacenes (
  id SERIAL PRIMARY KEY,
  tipo TEXT NOT NULL
);

INSERT INTO almacenes(tipo) VALUES
('CALIDAD'),
('NO CALIDAD');

CREATE TABLE estantes (
  id INTEGER NOT NULL,
  division INTEGER NOT NULL,
  particion INTEGER NOT NULL,
  almacen_id INTEGER REFERENCES almacenes(id) NOT NULL,
  caja INTEGER UNIQUE REFERENCES cajas(id_caja),
  fecha_ingreso TIMESTAMP,
  PRIMARY KEY(id, division, particion, almacen_id)
);

-- Insert 20 rows for almacen_id = 1
INSERT INTO estantes (id, division, particion, almacen_id, caja, fecha_ingreso) VALUES
(1, 1, 1, 1, NULL, NULL),
(1, 1, 2, 1, NULL, NULL),
(1, 1, 3, 1, NULL, NULL),
(1, 1, 4, 1, NULL, NULL),
(1, 1, 5, 1, NULL, NULL),
(1, 2, 1, 1, NULL, NULL),
(1, 2, 2, 1, NULL, NULL),
(1, 2, 3, 1, NULL, NULL),
(1, 2, 4, 1, NULL, NULL),
(1, 2, 5, 1, NULL, NULL),
(2, 1, 1, 1, NULL, NULL),
(2, 1, 2, 1, NULL, NULL),
(2, 1, 3, 1, NULL, NULL),
(2, 1, 4, 1, NULL, NULL),
(2, 1, 5, 1, NULL, NULL),
(2, 2, 1, 1, NULL, NULL),
(2, 2, 2, 1, NULL, NULL),
(2, 2, 3, 1, NULL, NULL),
(2, 2, 4, 1, NULL, NULL),
(2, 2, 5, 1, NULL, NULL);

-- Insert 20 rows for almacen_id = 2
-- (1, 1, 1, 2, NULL, NULL),
-- (1, 1, 2, 2, NULL, NULL),
-- (1, 1, 3, 2, NULL, NULL),
-- (1, 1, 4, 2, NULL, NULL),
-- (1, 1, 5, 2, NULL, NULL),
-- (1, 2, 1, 2, NULL, NULL),
-- (1, 2, 2, 2, NULL, NULL),
-- (1, 2, 3, 2, NULL, NULL),
-- (1, 2, 4, 2, NULL, NULL),
-- (1, 2, 5, 2, NULL, NULL),
-- (2, 1, 1, 2, NULL, NULL),
-- (2, 1, 2, 2, NULL, NULL),
-- (2, 1, 3, 2, NULL, NULL),
-- (2, 1, 4, 2, NULL, NULL),
-- (2, 1, 5, 2, NULL, NULL),
-- (2, 2, 1, 2, NULL, NULL),
-- (2, 2, 2, 2, NULL, NULL),
-- (2, 2, 3, 2, NULL, NULL),
-- (2, 2, 4, 2, NULL, NULL),
-- (2, 2, 5, 2, NULL, NULL);

