import { AppDataSource } from "../../core/db/data-source";
import { Almacen } from "../../core/db/entities/almacen-entity";

export class AlmacenRepository {

  async obtenerAlmacenPorId(almacenId: number) {
    return await AppDataSource.getRepository(Almacen).findOne({
      where: {
        id: almacenId
      }
    })
  }
}