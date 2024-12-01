import { Almacen } from "../../core/db/entities/almacen-entity";
import { CajaEntity } from "../../core/db/entities/caja-entity";
import { AlmacenRepository } from "./almacen.repository";
import { EstanteService } from "./estante.service";

export class AlmacenService {
  constructor(
    private readonly estanteService: EstanteService,
    private readonly almacenRepository: AlmacenRepository
  ) {}

  async entradaCaja(caja: CajaEntity, almacen: Almacen) {
    return this.estanteService.asignarEspacioCaja(caja, almacen);
  }

  async obtenerAlmacen(almacenId: number) {

    const almacen = await this.almacenRepository.obtenerAlmacenPorId(almacenId);
    const estantes = await this.estanteService.obtenerEstantesPorAlmacenId(almacenId);
    
    if (!estantes) {
      return {
        isValid: false,
        message: `El almacen con el id ${almacenId} no existe`,
        code: 404
      };
    }

    return {
      isValid: true,
      code: 200,
      data: {
        almacen,
        estantes: estantes
      }
    };
  }

}