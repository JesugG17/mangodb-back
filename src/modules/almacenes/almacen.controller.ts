import { Request, Response } from "express";
import { CajaService } from "../cajas/cajas.service";
import { AlmacenRepository } from "./almacen.repository";
import { AlmacenService } from "./almacen.service";

export class AlmacenController {
  constructor(
    private readonly cajaService: CajaService,
    private readonly almacenService: AlmacenService
  ){}

  ingresarCaja = async(req: Request, res: Response) => {
    const { idCaja, idAlmacen } = req.body;

    const caja = await this.cajaService.obtenerCaja(idCaja);

    const response = await this.almacenService.entradaCaja(caja!, idAlmacen);

    res.send(response);
  }

  obtenerAlmacen = async(req: Request, res: Response) => {
    const { almacenId } = req.params;
    
    const response = await this.almacenService.obtenerAlmacen(+almacenId);

    res.status(response.code).send(response);
  }
}