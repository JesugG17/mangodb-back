import { DataSource } from 'typeorm';
import { Role } from './entities/roles-entity';
import { Usuario } from './entities/user-entity';
import { Hectarea } from './entities/hectarea-entity';
import { ENV } from '../utils/env';
import { Planta } from './entities/planta-entity';
import { Opcion } from './entities/opciones-entity';
import { RolesOpciones } from './entities/roles-opciones-entity';
import { CajaEntity } from './entities/caja-entity';

import { SensorCrecimiento } from './entities/sensor-crecimiento-entity';
import { SensorProducto } from './entities/sensor-producto-entity';
import { Estante } from './entities/estante-entity';
import { Almacen } from './entities/almacen-entity';
import { Venta } from './entities/venta-entity';
import { Concurrencia } from './entities/concurrencia-entity';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5433,
  username: ENV.DB_USERNAME,
  password: ENV.DB_PASSWORD,
  database: ENV.DB_NAME,
  synchronize: true,
  entities: [
    Role,
    Usuario,
    Hectarea,
    Planta,
    Opcion,
    RolesOpciones,
    CajaEntity,
    SensorCrecimiento,
    SensorProducto,
    Estante,
    Almacen,
    Venta,
    Concurrencia
  ],
  subscribers: [],
  migrations: [],
});
