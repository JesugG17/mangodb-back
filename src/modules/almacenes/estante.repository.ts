import { IsNull, Not } from "typeorm";
import { Estante } from "../../core/db/entities/estante-entity";
import { AppDataSource } from "../../core/db/data-source";

export class EstanteRepository {
  
  async checarEspaciosDisponibles(idAlmacen: number) {
    return await AppDataSource.getRepository(Estante).count({
      where: {
        caja: Not(IsNull()),
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
        almacen: idAlmacen,
        caja: Not(IsNull())
      },
      
    });

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

  async obtenerEstantePorId(estanteId: number, almacenId: number) {
    return AppDataSource.getRepository(Estante).find({
      where: {
        almacen: almacenId,
        id: estanteId
      },
      relations: {
        caja: true
      }
    });
  }

  async actualizarEstante(estante: Estante) {
    await AppDataSource.getRepository(Estante).update({ id: estante.id, division: estante.division, particion: estante.particion, almacen: estante.almacen }, estante);
  }
}