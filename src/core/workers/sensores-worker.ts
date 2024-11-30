import { PlantasRepository } from "../../modules/plantas/plantas.repository";
import { PlantasService } from "../../modules/plantas/plantas.service";
import { MAX_ALTURA, MAX_GROSOR_TALLO, MAX_HUMEDAD, MAX_PRESENCIA_PLAGAS, MIN_ALTURA, MIN_GROSOR_TALLO, MIN_HUMEDAD, OXIGENACION, PORCENTAJE_COLOR, PORCENTAJE_TEXTURE, SensoresService, VARIACION } from "../../modules/sensores/sensores.service";
import { SensoresRepository } from '../../modules/sensores/sensores.repository';
import { WorkerInterface } from "./interface/worker-interface";

export class SensoresWorker implements WorkerInterface {
  private plantasService: PlantasService;
  private sensoresService: SensoresService;

  constructor() {
    const sensoresRepository = new SensoresRepository();
    const sensoresService = new SensoresService(sensoresRepository);
    const plantasRepository = new PlantasRepository();
    const plantasService = new PlantasService(plantasRepository, sensoresService);

    this.sensoresService = sensoresService;
    this.plantasService = plantasService;
  }

  private async simularSensorCrecimiento() {
    const INTERVAL = 1000 * 60; // Cada minuto

    const simular = async () => {
      const plantas = await this.plantasService.obtenerPlantasConSensorDeCrecimiento();

      for (let i = 0; i < plantas.length; i++) {
        const sensorCrecimiento = plantas[i].sensorCrecimiento;
        
        const sensorData = {
          grosorTallo: this.generarRandomEnRangoVariacion(sensorCrecimiento.grosorTallo, MIN_GROSOR_TALLO, MAX_GROSOR_TALLO, VARIACION), // Ensuring min of MIN_GROSOR_TALLO
          altura: this.generarRandomEnRangoVariacion(sensorCrecimiento.altura, MIN_ALTURA, MAX_ALTURA, VARIACION),
          presenciaPlagas: this.generarRandomEnRango(0, MAX_PRESENCIA_PLAGAS),
          humedad: this.generarRandomEnRango(MIN_HUMEDAD, MAX_HUMEDAD),
        };

        await this.sensoresService.actualizarSensorCrecimiento(sensorCrecimiento.id, sensorData);
      }
    };

    simular();
    setInterval(() => {
      simular();
    }, INTERVAL);
  }

  private async simularSensorProducto() {
    const INTERVAL = 1000 * 60; // Cada minuto

    const simular = async () => {
      const plantas = await this.plantasService.obtenerPlantasConSensorDeProducto();

      for (let i = 0; i < plantas.length; i++) {
        const sensorProducto = plantas[i].sensorProducto;

        const sensorData = {
          porcentajeColor: this.generarRandomEnRangoVariacion(sensorProducto.porcentajeColor, PORCENTAJE_COLOR.MIN, PORCENTAJE_COLOR.MAX, VARIACION),
          porcentajeTextura: this.generarRandomEnRangoVariacion(sensorProducto.porcentajeTextura, PORCENTAJE_TEXTURE.MIN, PORCENTAJE_TEXTURE.MAX, VARIACION),
          oxigenacion: this.generarRandomEnRango(OXIGENACION.MIN, OXIGENACION.MAX)
        };

        await this.sensoresService.actualizarSensorProducto(sensorProducto.id, sensorData);
      }
    };

    simular();
    setInterval(() => {
      simular();
    }, INTERVAL);
  }

  private generarRandomEnRango(min: number, max: number): number {
    return +(Math.random() * (max - min) + min).toFixed(2);
  }

  private generarRandomEnRangoVariacion(valorActual: number, min: number, max: number, variacion: number): number {
    const redondear = (num: number): number => Math.round(num * 100) / 100;
    valorActual = parseFloat(valorActual.toString());

    const cambio = +(Math.random() * variacion).toFixed(2); 
    let nuevoValor = valorActual + cambio;
  
    if (nuevoValor > max) nuevoValor = max;
    if (nuevoValor < valorActual) nuevoValor = redondear(valorActual);
    if (nuevoValor < min) nuevoValor = min;
  
    return redondear(+nuevoValor);
  }  

  start() {
    this.simularSensorCrecimiento();
    this.simularSensorProducto();
  }
}
