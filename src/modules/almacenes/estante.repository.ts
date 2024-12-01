import { IsNull, Not, QueryRunner } from "typeorm";
import { Estante } from "../../core/db/entities/estante-entity";
import { AppDataSource } from "../../core/db/data-source";
import { CajaEntity } from "../../core/db/entities/caja-entity";
import { Concurrencia } from "../../core/db/entities/concurrencia-entity";

export class EstanteRepository {
  async abrirConcurrencia(id: number) {
    const queryRunner = AppDataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      await AppDataSource.getRepository(Concurrencia).findOne({
        where: { id: id },
        lock: {mode:'pessimistic_write'}
      });
    } catch (error) {
      
    }
    return queryRunner;
  }
  async cerrarConcurrencia(concurrencia: QueryRunner) {
    await concurrencia.commitTransaction();
    await concurrencia.release();
  }
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

  async buscarCajaEnEstante(caja: CajaEntity) {
    return await AppDataSource.getRepository(Estante).findOne({
      where: {
        caja: {
          idCaja: caja.idCaja
        }
      }
    })
  }
}