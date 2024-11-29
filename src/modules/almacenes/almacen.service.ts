import { CajaEntity } from "../../core/db/entities/caja-entity";
import { AlmacenRepository } from "./almacen.repository";
import { EstanteService } from "./estante.service";

export class AlmacenService {
  constructor(
    private readonly estanteService: EstanteService

  ) {}

  async entradaCaja(caja: CajaEntity, almacenId: number) {
    return this.estanteService.asignarEspacioCaja(caja, almacenId);
  }

  async obtenerAlmacen(almacenId: number) {
    const almacen = await this.estanteService.obtenerEstantesPorAlmacenId(almacenId);
    
    if (!almacen) {
      return {
        isValid: false,
        message: `El almacen con el id ${almacenId} no existe`,
        code: 404
      };
    }

    return almacen;
  }

}