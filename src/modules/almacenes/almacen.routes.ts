import { Router } from "express";
import { AlmacenController } from "./almacen.controller";
import { CajaRepository } from "../cajas/cajas.repositoy";
import { CajaService } from "../cajas/cajas.service";
import { EstanteRepository } from "./estante.repository";
import { EstanteService } from "./estante.service";
import { AlmacenService } from "./almacen.service";
import { AlmacenRepository } from "./almacen.repository";

export class AlmacenRoutes {

  static get routes() {
    const router = Router();
    const cajaRepository = new CajaRepository();
    const cajaService = new CajaService(cajaRepository);
    const estanteRepository = new EstanteRepository();
    const estanteService = new EstanteService(estanteRepository);
    const almacenService = new AlmacenService(estanteService, new AlmacenRepository);
    const almacenController = new AlmacenController(cajaService, almacenService);

    router.post('/asignar-espacio', almacenController.ingresarCaja);

    router.get('/:almacenId', almacenController.obtenerAlmacen);

    return router;
  }
}