import { AppDataSource } from "../../core/db/data-source";
import { SensorCrecimiento } from "../../core/db/entities/sensor-crecimiento-entity";
import { SensorProducto } from "../../core/db/entities/sensor-producto-entity";
import { ActualizarSensorCrecimiento } from "./dto/actualizar-sensor-crecimient.dto";
import { ActualizarSensorProducto } from "./dto/actualizar-sensor-producto.dto";

export class SensoresRepository {

  async obtenerSensorCrecimientoPorId(sensorCrecimientoId: number) {
    return await AppDataSource.getRepository(SensorCrecimiento).findOne({
      where: {
        id: sensorCrecimientoId
      }
    });
  }

  async obtenerSensorProductoPorId(sensorProductoId: number) {
    return await AppDataSource.getRepository(SensorProducto).findOne({
      where: {
        id: sensorProductoId
      }
    });
  }

  async grabarSensorProducto(sensorProducto: SensorProducto) {
    await AppDataSource.getRepository(SensorProducto).insert(sensorProducto);
  }

  async grabarSensorCrecimiento(sensorCrecimiento: SensorCrecimiento) {
    await AppDataSource.getRepository(SensorCrecimiento).insert(sensorCrecimiento);
  }

  async actualizarSensorCrecimientoPorId(sensorCrecimientoId: number, nuevosValores: ActualizarSensorCrecimiento) {
    await AppDataSource.getRepository(SensorCrecimiento).update(sensorCrecimientoId, nuevosValores);
  }

  async actualizarSensorProductoPorId(sensorProductoId: number, nuevosValores: ActualizarSensorProducto) {
    await AppDataSource.getRepository(SensorProducto).update(sensorProductoId, nuevosValores);
  }
}