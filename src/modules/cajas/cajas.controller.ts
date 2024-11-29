import { HTTP_CODE } from '../../core/utils/http-codes';
import { Request, Response } from 'express';
import { PlantasService } from '../plantas/plantas.service';
import { CajaService } from './cajas.service';

export class CajaController {
  constructor(private readonly plantasService: PlantasService, private readonly cajaService: CajaService) { }

  regitrarCajas = async (req: Request, res: Response) => {
    const { kg, tipo, planta } = req.body;
    const plantaDb = await this.plantasService.obtenerPlanta(planta);

    if (!plantaDb) {
      return res.status(HTTP_CODE.BAD_REQUEST).send({
        isValid: false,
        message: `La planta con el id ${planta} no existe`
      });
    }

    const response = await this.cajaService.crearCaja(kg, tipo, plantaDb);
    res.status(HTTP_CODE.CREATED).send(response);
  }
}
