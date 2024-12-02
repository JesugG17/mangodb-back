import { Request, Response } from "express";
import { CajaService } from "../cajas/cajas.service";
import { AlmacenRepository } from "./almacen.repository";
import { AlmacenService } from "./almacen.service";
import { HTTP_CODE } from "../../core/utils/http-codes";

export class AlmacenController {
  constructor(
    private readonly cajaService: CajaService,
    private readonly almacenService: AlmacenService
  ){}

  ingresarCaja = async(req: Request, res: Response) => {
    const { idCaja, idAlmacen } = req.body;

    const caja = await this.cajaService.obtenerCaja(idCaja);

    if (!caja) {
      return res.status(HTTP_CODE.NOT_FOUND).send({
        isValid: false,
        message: `La caja con el id ${idCaja} no existe`
      });
    }

    if (caja.kg === 0) {
      return res.status(HTTP_CODE.BAD_REQUEST).send({
        isValid: false,
        message: 'No se puede ingresar una caja con 0 kilos'
      });
    }

    const { isValid, data } = await this.almacenService.obtenerAlmacen(idAlmacen);

    if (!isValid || !data) {
      return res.status(HTTP_CODE.NOT_FOUND).send({
        isValid: false,
        message: `El almacen con el id ${idAlmacen} no existe`
      });
    }

    const { almacen } = data;
    if (caja.tipo !== almacen?.tipo) {
      return res.status(HTTP_CODE.NOT_FOUND).send({
        isValid: false,
        message: `La caja es de ${caja.tipo} y el almacen es de ${almacen?.tipo}`
      });
    }

    const response = await this.almacenService.entradaCaja(caja!, almacen!);

    res.send(response);
  }

  obtenerAlmacen = async(req: Request, res: Response) => {
    const { almacenId } = req.params;
    
    const response = await this.almacenService.obtenerAlmacen(+almacenId);

    res.status(response.code).send(response);
  }
}