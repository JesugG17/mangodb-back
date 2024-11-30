import { Router } from 'express';
import { PlantasRepository } from './plantas.repository';
import { PlantasService } from './plantas.service';
import { PlantasController } from './plantas.controller';
import { SensoresRepository } from '../sensores/sensores.repository';
import { SensoresService } from '../sensores/sensores.service';
import { validateData } from '../../core/middlewares/validate-data';
import { idPlantaSchemaBody } from './dto/asignar-sensores.dto';

export class PlantasRoutes {
  static get routes() {
    const router = Router();
    const plantasRepository = new PlantasRepository();
    const sensoresRepository = new SensoresRepository();
    const sensoresService = new SensoresService(sensoresRepository);
    const plantasService = new PlantasService(plantasRepository, sensoresService);
    const plantasController = new PlantasController(plantasService);

    router.post(
      '/asignar-sensor-crecimiento',
      validateData(idPlantaSchemaBody, 'body'),
      plantasController.asignarSensorCrecimiento
    );

    router.post(
      '/asignar-sensor-producto',
      validateData(idPlantaSchemaBody, 'body'),
      plantasController.crearSensorProducto
    );

    return router;
  }
}
