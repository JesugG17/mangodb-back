import { VentaRepository } from './ventas.repository';

export class VentaService {
  constructor(private readonly ventaRepository: VentaRepository) {}
  async crearVenta(kilos: number) {
    const kgTotalDb = await this.ventaRepository.obtenerKilosTotales();
    if (kgTotalDb == null) {
      return { isValid: false, message: 'los kilos son null' };
    }
    if (kilos > kgTotalDb) {
      return { isValid: false, message: 'la cantidad de kilos supera la del almacen' };
    }
    await this.ventaRepository.venderCajasAntiguas(kilos);
    return { isValid: true, message: 'se vendieron ' + kilos + 'kilos' };
  }
}
