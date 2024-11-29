import { Request, Response } from 'express';
import { PlantasService } from './plantas.service';
import { HTTP_CODE } from '../../core/utils/http-codes';

export class PlantasController {
  constructor(private readonly plantasService: PlantasService) {}

  asignarSensorCrecimiento = async (req: Request, res: Response) => {
    const response = await this.plantasService.asignarSensorCrecimiento(req.body);
    res.status(response.code).send(response);
  };

  crearSensorProducto = async (req: Request, res: Response) => {
    const response = await this.plantasService.asignarSensorProducto(req.body);
    res.status(response.code).send(response);
  };
}