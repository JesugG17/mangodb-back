import { IsNull, Not } from "typeorm";
import { Estante } from "../../core/db/entities/estante-entity";
import { AppDataSource } from "../../core/db/data-source";

export class EstanteRepository {
  
  async checarEspaciosDisponibles(idAlmacen: number) {
    return await AppDataSource.getRepository(Estante).count({
      where: {
        caja: Not(IsNull()),
        almacen: {
          id: idAlmacen
        }
      }
    });
  }

  async obtenerUltimoEstante(idAlmacen: number) {
    const estante = await AppDataSource.getRepository(Estante).findOne({
      order: {
        fechaIngreso: 'DESC'
      },
      where: {
        almacen: {
          id: idAlmacen
        },
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
        almacen: {
          id: estanteData.almacen
        }
      },
      relations: {
        almacen: true
      }
    });
  }

  async obtenerEstantePorId(estanteId: number, almacenId: number) {
    return AppDataSource.getRepository(Estante)
      .createQueryBuilder('estantes')
      .select('estantes.division', 'division')
      .addSelect('estantes.particion', 'particion')
      .addSelect('estantes.caja', 'caja')
      .where('estantes.id = :estante', { estante: estanteId })
      .andWhere('estantes.almacen = :almacen', { almacen: almacenId })
      .getRawMany()
  }

  async obtenerEstantesPorAlmacenId(almacenId: number) {
    return AppDataSource.getRepository(Estante)
      .createQueryBuilder('estantes')
      .select('estantes.id', 'id')
      .addSelect('COUNT(estantes.caja)', 'espaciosOcupados')
      .innerJoin('estantes.almacen', 'almacen')
      .andWhere('almacen.id = :almacenId', { almacenId })
      .groupBy('estantes.id')
      .getRawMany();
  }

  async actualizarEstante(estante: Estante) {
    await AppDataSource.getRepository(Estante).update({ id: estante.id, division: estante.division, particion: estante.particion, almacen: estante.almacen }, estante);
  }
}