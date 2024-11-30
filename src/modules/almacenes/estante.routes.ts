import { Router } from "express";
import { EstanteRepository } from "./estante.repository";
import { EstanteService } from "./estante.service";
import { EstanteController } from "./estante.controller";

export class EstanteRoutes {


  static get routes() {
    const router = Router();

    const estanteRepository = new EstanteRepository();
    const estanteService = new EstanteService(estanteRepository);
    const estanteController = new EstanteController(estanteService);

    router.post('/', estanteController.obtenerEstante)

    return router;
  }

}