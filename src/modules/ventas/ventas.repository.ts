import { IsNull, Not } from 'typeorm';
import { AppDataSource } from '../../core/db/data-source';
import { CajaEntity } from '../../core/db/entities/caja-entity';
import { Estante } from '../../core/db/entities/estante-entity';
import { Venta } from '../../core/db/entities/venta-entity';

export class VentaRepository {
  async obtenerKilosTotales() {
    return await AppDataSource.getRepository(CajaEntity).sum('kg');
  }
  async venderCajasAntiguas(kilos: number) {
    const queryRunner = AppDataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const estantes = await queryRunner.manager.find(Estante, {
        order: {
          fechaIngreso: 'ASC',
        },
        where: {
          caja: Not(IsNull()),
          fechaIngreso: Not(IsNull()),
        },
        relations: {
          caja: true,
        },
      });

      let kilosAcumulados = 0;
      for (const estante of estantes) {
        kilosAcumulados += estante.caja.kg;
        if (kilosAcumulados >= kilos) {
          estante.caja.kg = kilosAcumulados - kilos;
          await queryRunner.manager.update(
            CajaEntity,
            { idCaja: estante.caja.idCaja },
            { kg: estante.caja.kg }
          );
          break;
        }
        estante.caja.kg = 0;
        await queryRunner.manager.update(
          CajaEntity,
          { idCaja: estante.caja.idCaja },
          { kg: estante.caja.kg }
        );
        await queryRunner.manager.query(
          'UPDATE estantes set caja=null,fecha_ingreso=null WHERE id=$1 AND division=$2 AND particion=$3',
          [estante.id, estante.division, estante.particion]
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
