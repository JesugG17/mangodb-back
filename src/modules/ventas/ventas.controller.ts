import { Request, Response } from 'express';
import { VentaService } from './ventas.service';
import { HTTP_CODE } from '../../core/utils/http-codes';

export class VentaController {
  constructor(private readonly ventaService: VentaService) {}
  venderKilos = async (req: Request, res: Response) => {
    const response = await this.ventaService.crearVenta(req.body.kilos, req.body.tipo);
    if (!response.isValid) {
      return res.status(HTTP_CODE.BAD_REQUEST).send(response);
    }
    res.status(HTTP_CODE.CREATED).send(response);
  };
}
