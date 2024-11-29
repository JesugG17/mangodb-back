import { isValid } from 'zod';
import { Caja } from '../../core/db/entities/caja-entity';
import { Planta } from '../../core/db/entities/planta-entity';
import { CajaRepository } from './cajas.repositoy';

export class CajaService {
  constructor(private readonly cajaRepository: CajaRepository) {}

  async crearCaja(kg: number, tipo: string, planta: Planta) {
    let caja = new Caja();
    caja.kg = kg;
    caja.planta = planta;
    caja.fecha = new Date();
    caja.tipo = tipo;

    caja = await this.cajaRepository.guardarCaja(caja);
    if (!caja) {
      return { isValid: false, reason: 'error al registrar la caja' };
    }
    return { isValid: true, data: caja };
  }

  async obtenerCaja(idCaja: number) {
    return await this.cajaRepository.obtenerCajaPorId(idCaja);
  }
}
