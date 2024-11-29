import { Request, Response } from "express";
import { EstanteService } from "./estante.service";

export class EstanteController {
  constructor(
    private readonly estanteService: EstanteService
  ){}

  obtenerEstante = async(req: Request, res: Response) => {
    const { estanteId, almacenId } = req.body;

    const response = await this.estanteService.obtenerEstantePorId(estanteId, almacenId);

    res.status(response.code).send(response);
  }

}