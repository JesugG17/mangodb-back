// import { Caja } from '../../core/db/entities/caja-entity';
import { Planta } from '../../core/db/entities/planta-entity';
import { Caja } from '../../core/models/caja-model';
import { CajaRepository } from './cajas.repositoy';

export class CajaService {
  constructor(private readonly cajaRepository: CajaRepository) {}

  async crearCaja(kg: number, tipo: string, planta: Planta) {
    const caja = new Caja(kg, planta, new Date(), tipo);

    const newId = await this.cajaRepository.guardarCaja(caja);
    caja.setId = newId;
    if (!caja) {
      return { isValid: false, reason: 'error al registrar la caja' };
    }
    return { isValid: true, data: caja };
  }

  async obtenerCaja(idCaja: number) {
    return await this.cajaRepository.obtenerCajaPorId(idCaja);
  }
}
