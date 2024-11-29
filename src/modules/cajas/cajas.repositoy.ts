import { Caja } from '../../core/db/entities/caja-entity';

export class CajaRepository {
  async guardarCaja(caja: Caja) {
    return await caja.save();
  }

  async obtenerCajaPorId(idCaja: number) {
    return await Caja.findOne({
      where: {
        idCaja
      }
    });
  }
}
