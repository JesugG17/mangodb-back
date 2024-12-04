import { Semaforo } from '../../core/models/semaforo';
import { VentaRepository } from './ventas.repository';

export class VentaService {
  constructor(private readonly ventaRepository: VentaRepository) {}
  async crearVenta(kilos: number, tipo: number) {
    const id = tipo === 1  ? 3 : 4;
    const semaforo = new Semaforo(id);

    try {
      await semaforo.espera();   
      const kgTotalDb = await this.ventaRepository.obtenerKilosTotales(tipo);
      
      if (!kgTotalDb || kilos > kgTotalDb) {
        return { isValid: false, message: 'la cantidad de kilos supera la del almacen' };
      }
  
      await this.ventaRepository.venderCajasAntiguas(kilos, tipo);
      return { isValid: true, message: 'se vendieron ' + kilos + ' kilos' };
    } catch (error) {
      return {
        isValid: false,
        message: 'Ocurrio un error'
      };
    } finally {
      await semaforo.libera();
    }
  }
}
