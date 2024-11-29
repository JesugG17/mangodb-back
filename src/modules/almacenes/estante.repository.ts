import { IsNull } from "typeorm";
import { Estante } from "../../core/db/entities/estante-entity";
import { AppDataSource } from "../../core/db/data-source";

export class EstanteRepository {
  
  async checarEspaciosDisponibles(idAlmacen: number) {
    return await AppDataSource.getRepository(Estante).count({
      where: {
        caja: IsNull(),
        almacen: idAlmacen
      }
    });
  }

  async obtenerUltimoEstante(idAlmacen: number) {
    const estante = await AppDataSource.getRepository(Estante).findOne({
      order: {
        fechaIngreso: 'DESC'
      },
      where: {
        almacen: idAlmacen
      },
      
    });

    if (!estante) {
      return await AppDataSource.getRepository(Estante).findOne({
        where: {
          id: 1,
          division: 1,
          particion: 1,
          almacen: idAlmacen
        }
      });
    }

    return estante;
  }

  async obtenerEstanteDisponible(estanteData: { estante: number, division: number, particion: number, almacen: number }) {
    return await AppDataSource.getRepository(Estante).findOne({
      where: {
        id: estanteData.estante,
        division: estanteData.division,
        particion: estanteData.particion,
        almacen: estanteData.almacen
      }
    });
  }

  async actualizarEstante(estante: Estante) {
    await AppDataSource.getRepository(Estante).update(estante.id, estante);
  }
}