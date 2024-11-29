import { Router } from "express";
import { AlmacenController } from "./almacen.controller";
import { CajaRepository } from "../cajas/cajas.repositoy";
import { CajaService } from "../cajas/cajas.service";
import { EstanteRepository } from "./estante.repository";
import { EstanteService } from "./estante.service";

export class AlmacenRoutes {

  static get routes() {
    const router = Router();
    const cajaRepository = new CajaRepository();
    const cajaService = new CajaService(cajaRepository);
    const estanteRepository = new EstanteRepository();
    const estanteService = new EstanteService(estanteRepository);
    const almacenController = new AlmacenController(cajaService, estanteService);

    router.post('/asignar-espacio', almacenController.ingresarCaja);

    router.post('/estante', almacenController.obtenerCaja)

    return router;
  }
}