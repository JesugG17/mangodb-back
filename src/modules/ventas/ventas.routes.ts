import { Router } from 'express';
import { VentaController } from './ventas.controller';
import { VentaService } from './ventas.service';
import { VentaRepository } from './ventas.repository';

export class VentaRoutes {
  static get routes() {
    const router = Router();
    const ventaRepository = new VentaRepository();
    const ventaService = new VentaService(ventaRepository);
    const ventaController = new VentaController(ventaService);

    router.post('/vender', ventaController.venderKilos);
    return router;
  }
}
