import { Request, Response } from "express";
import { CajaService } from "../cajas/cajas.service";
import { EstanteService } from "./estante.service";

export class AlmacenController {
  constructor(
    private readonly cajaService: CajaService,
    private readonly estanteService: EstanteService
  ){}

  ingresarCaja = async(req: Request, res: Response) => {
    const { idCaja, idAlmacen } = req.body;

    const caja = await this.cajaService.obtenerCaja(idCaja);

    const response = await this.estanteService.asignarEspacioCaja(caja!, idAlmacen);

    res.send(response);
  }
}