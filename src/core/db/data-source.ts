import { DataSource } from 'typeorm';
import { Role } from './entities/roles-entity';
import { Usuario } from './entities/user-entity';
import { Hectarea } from './entities/hectarea-entity';
import { ENV } from '../utils/env';
import { Planta } from './entities/planta-entity';
import { Opcion } from './entities/opciones-entity';
import { RolesOpciones } from './entities/roles-opciones-entity';
import { Caja } from './entities/caja-entity';

import { SensorCrecimiento } from './entities/sensor-crecimiento-entity';
import { SensorProducto } from './entities/sensor-producto-entity';
import { Estante } from './entities/estante-entity';

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
    Caja,
    SensorCrecimiento,
    SensorProducto,
    Estante
  ],
  subscribers: [],
  migrations: [],
});
