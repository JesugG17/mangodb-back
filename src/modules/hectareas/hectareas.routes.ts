import { Router } from 'express';
import { HectareaRepository } from './hectareas.repository';
import { HectareaService } from './hectareas.service';
import { HectareasController } from './hectareas.controller';
import { CajaService } from '../cajas/cajas.service';
import { CajaRepository } from '../cajas/cajas.repositoy';
import { validateData } from '../../core/middlewares/validate-data';
import { updateHectareaSchemaBody, idHectareaSchemaParams } from './dto/update-hectarea.dto';
import { createHectareaSchema } from './dto/create-hectarea.dto';

export class HectareasRoutes {
  static get routes() {
    const router = Router();
    const hectareaRepository = new HectareaRepository();
    const cajaRepository = new CajaRepository();
    const cajaService = new CajaService(cajaRepository);
    const hectareaService = new HectareaService(hectareaRepository, cajaService);
    const hectareaController = new HectareasController(hectareaService);

    router.post('/create', validateData(createHectareaSchema), hectareaController.crearHectarea);
    router.get('/all', hectareaController.obtenerHectareas);

    router.put(
      '/update/:idHectarea',
      validateData(idHectareaSchemaParams, 'params'),
      validateData(updateHectareaSchemaBody),
      hectareaController.actualizarHectarea
    );
    router.delete(
      '/delete/:idHectarea',
      validateData(idHectareaSchemaParams, 'params'),
      hectareaController.eliminarHectarea
    );
    router.put(
      '/autorizar/:idHectarea',
      validateData(idHectareaSchemaParams, 'params'),
      hectareaController.autorizarHectarea
    );

    router.put(
      '/finalizar-cosecha/:idHectarea',
      validateData(idHectareaSchemaParams, 'params'),
      hectareaController.finalizarCosecha
    )

    router.get('/by-id/:id', hectareaController.obtenerHectarea);
    return router;
  }
}
