import { AppDataSource } from "../../core/db/data-source";
import { Estante } from "../../core/db/entities/estante-entity";

export class AlmacenRepository {

  async obtenerAlmacenPorId(almacenId: number) {
    return await AppDataSource.getRepository(Estante).find({
      where: {
        almacen: almacenId
      }
    })
  }
}