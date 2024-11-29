import { AppDataSource } from '../../core/db/data-source';
import { CajaEntity } from '../../core/db/entities/caja-entity';
import { Caja } from "../../core/models/caja-model";


export class CajaRepository {
  async guardarCaja(caja: Caja) {
    return AppDataSource.getRepository(CajaEntity).insert({
      kg: caja.getKg,
      planta: caja.getPlanta,
      fecha: caja.getFecha,
      tipo: caja.getTipo
    });
  }

  async obtenerCajaPorId(idCaja: number) {
    return await CajaEntity.findOne({
      where: {
        idCaja
      }
    });
  }
}
