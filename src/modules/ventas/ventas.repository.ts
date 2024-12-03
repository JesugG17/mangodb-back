import { IsNull, Not } from 'typeorm';
import { AppDataSource } from '../../core/db/data-source';
import { CajaEntity } from '../../core/db/entities/caja-entity';
import { Estante } from '../../core/db/entities/estante-entity';
import { Venta } from '../../core/db/entities/venta-entity';

export class VentaRepository {
  async obtenerKilosTotales(tipo: number) {
    return await AppDataSource.getRepository(Estante)
      .createQueryBuilder('estantes')
      .innerJoin('estantes.caja', 'caja')
      .select('SUM(caja.kg)', 'total')
      .where('estantes.almacen_id = :almacen_id', { almacen_id: tipo })
      .getRawOne()
      .then((result) => result.total || null);
  }
  async venderCajasAntiguas(kilos: number, tipo: number) {
    const queryRunner = AppDataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const estantes = await queryRunner.manager
        .createQueryBuilder(Estante, 'estantes')
        .innerJoinAndSelect('estantes.caja', 'cajas')
        .where('estantes.caja IS NOT NULL')
        .andWhere('estantes.fechaIngreso IS NOT NULL')
        .andWhere('estantes.almacen_id = :almacen_id', { almacen_id: tipo })
        .orderBy('estantes.fechaIngreso', 'ASC')
        .groupBy(
          'estantes.id, estantes.division, estantes.particion, estantes.almacen_id, cajas.idCaja'
        )
        .getMany();

      let kilosAcumulados = 0;
      for (const estante of estantes) {
        kilosAcumulados += estante.caja.kg;
        if (kilosAcumulados > kilos) {
          estante.caja.kg = kilosAcumulados - kilos;
          await queryRunner.manager.update(
            CajaEntity,
            { idCaja: estante.caja.idCaja },
            { kg: estante.caja.kg }
          );
          break;
        }
        
        await queryRunner.manager.update(
          CajaEntity,
          { idCaja: estante.caja.idCaja },
          { kg: 0 }
        );
        await queryRunner.manager.query(
          'UPDATE estantes SET caja=null,fecha_ingreso=null WHERE id=$1 AND division=$2 AND particion=$3 AND almacen_id=$4',
          [estante.id, estante.division, estante.particion, tipo]
        );
      }
      const nuevaVenta = new Venta();
      nuevaVenta.kilosVendidos = kilos;
      nuevaVenta.fechaVenta = new Date();

      await queryRunner.manager.save(nuevaVenta);

      await queryRunner.commitTransaction();
    } catch (err) {
      console.log(err);
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }
}
