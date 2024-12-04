import { Planta } from "../../core/db/entities/planta-entity";
import { SensoresService } from "../sensores/sensores.service";
import { PlantasRepository } from "./plantas.repository";

export class PlantasService {

  constructor(
    private readonly plantasRepository: PlantasRepository,
    private readonly sensoresService: SensoresService
  ) {}

  async asignarSensorCrecimiento(plantaId: number) {
    const plantaDb = await this.plantasRepository.obtenerPlantaPorId(plantaId);

    if (!plantaDb) {
      return {
        isValid: false,
        message: `La planta con el id ${plantaId} no existe`,
        code: 400
      };    
    }

    if (plantaDb.sensorCrecimiento) {
      return {
        isValid: false,
        message: 'Esta planta ya tiene un sensor de crecimiento asignado',
        code: 400
      };
    }

    const nuevoSensorCrecimiento = await this.sensoresService.crearSensorCrecimiento();
    plantaDb.sensorCrecimiento = nuevoSensorCrecimiento;

    await this.plantasRepository.actualizarPlantaPorId(plantaId, plantaDb);

    return {
      isValid: true,
      message: 'Sensor de crecimiento asignado exitosamente',
      code: 201
    };
  }

  async asignarSensorProducto(plantaId: number) {
    const plantaDb = await this.plantasRepository.obtenerPlantaPorId(plantaId);
    
    if (!plantaDb) {
      return { 
        isValid: false,
        message: `La planta con el id ${plantaId} no existe`,
        code: 400
      }
    }

    if (plantaDb.sensorProducto) {
      return {
        isValid: false,
        message: 'Esta planta ya tiene un sensor de producto asignado',
        code: 400
      };
    }

    const sensorProducto = await this.sensoresService.crearSensorProducto();
    plantaDb.sensorProducto = sensorProducto;

    await this.plantasRepository.actualizarPlantaPorId(plantaId, plantaDb);

    return {
      isValid: true,
      message: 'Sensor de producto asignado exitosamente',
      code: 201
    };
  }

  async obtenerPlantasConSensorDeCrecimiento() {
    return await this.plantasRepository.obtenerPlantasConSensorDeCrecimiento();
  }

  async obtenerPlantasConSensorDeProducto() {
    return await this.plantasRepository.obtenerPlantasConSensorDeProducto();
  }

  async obtenerPlanta(planta: number){
    const plantaDb = await this.plantasRepository.obtenerPlantaPorId(planta);
    return plantaDb;
  }
}