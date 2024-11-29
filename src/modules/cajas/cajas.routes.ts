import { Router } from 'express';

import { CajaRepository } from '../cajas/cajas.repositoy';
import { CajaService } from './cajas.service';
import { CreateCajaSchema } from './dto/create-caja.dto';
import { validateData } from '../../core/middlewares/validate-data';
import { PlantasService } from '../plantas/plantas.service';
import { PlantasRepository } from '../plantas/plantas.repository';
import { SensoresService } from '../sensores/sensores.service';
import { SensoresRepository } from '../sensores/sensores.repository';
import { CajaController } from './cajas.controller';

export class CajasRoutes {
  static get routes() {
    const router = Router();
    const cajaService = new CajaService(new CajaRepository());
    const sensoresService = new SensoresService(new SensoresRepository());
    const plantasService = new PlantasService(new PlantasRepository(), sensoresService);
    const cajaController = new CajaController(plantasService, cajaService);
    router.post('/create', validateData(CreateCajaSchema), cajaController.regitrarCajas);
    return router;
  }
}
