import { Hectarea } from "../../core/db/entities/hectarea-entity";
import { SensorCrecimiento } from "../../core/db/entities/sensor-crecimiento-entity";
import { SensorProducto } from "../../core/db/entities/sensor-producto-entity";
import { ActualizarSensorCrecimiento } from "./dto/actualizar-sensor-crecimient.dto";
import { ActualizarSensorProducto } from "./dto/actualizar-sensor-producto.dto";
import { SensoresRepository } from "./sensores.repository";

export const MIN_GROSOR_TALLO = 20;
export const MAX_GROSOR_TALLO = 70;
export const MIN_ALTURA = 1;
export const MAX_ALTURA = 5;
export const MAX_PRESENCIA_PLAGAS = 5;
export const MIN_HUMEDAD = 60;
export const MAX_HUMEDAD = 80;
export const VARIACION = 1;

export const PORCENTAJE_COLOR = {
  MIN: 70,
  MAX: 90
};

export const PORCENTAJE_TEXTURE = {
  MIN: 70,
  MAX: 80
};

export const OXIGENACION = {
  MIN: 20,
  MAX: 40,
};

export class SensoresService {

  constructor(
    private readonly sensoresRepository: SensoresRepository
  ){}
  
  async checarParametrosSensores(hectareas: Hectarea[]) {

    const hectareasListasParaCosecha = [];
    for(let i = 0; i < hectareas.length; i++) {
      let totalPlantasBuenas = 0;
      const totalPlantas = hectareas[i].plantas.length;
      for(let j = 0; j < hectareas[i].plantas.length; i++) {
        const planta = hectareas[i].plantas[j];
        const [sensorCrecimiento, sensorProducto] = await Promise.all([
          this.sensoresRepository.obtenerSensorCrecimientoPorId(planta.sensorCrecimiento.id),
          this.sensoresRepository.obtenerSensorProductoPorId(planta.sensorProducto.id)
        ]);

        if (this.checarParametrosCrecimiento(sensorCrecimiento!) && this.checarParametrosProducto(sensorProducto!)) {
          totalPlantasBuenas++;
        }

      }

      if ((totalPlantasBuenas / totalPlantas) * 100 >= 80) {
        // TODO: Cambiar estado de la hectarea y guardar
      }
    }

  }

  async crearSensorCrecimiento() {
    const nuevoSensorCrecimiento = new SensorCrecimiento();
    await this.sensoresRepository.grabarSensorCrecimiento(nuevoSensorCrecimiento);

    return nuevoSensorCrecimiento;
  }

  async crearSensorProducto() {
    const nuevoSensorProducto = new SensorProducto();
    await this.sensoresRepository.grabarSensorProducto(nuevoSensorProducto);

    return nuevoSensorProducto;
  }

  async actualizarSensorCrecimiento(sensorCrecimientoId: number, nuevosValores: ActualizarSensorCrecimiento) {
    const sensorCrecimiento = await this.sensoresRepository.obtenerSensorCrecimientoPorId(sensorCrecimientoId);

    if (!sensorCrecimiento) {
      return;
    }

    await this.sensoresRepository.actualizarSensorCrecimientoPorId(sensorCrecimientoId, nuevosValores);
  }

  async actualizarSensorProducto(sensorProductoId: number, nuevosValores: ActualizarSensorProducto) {
    const sensorProducto = await this.sensoresRepository.obtenerSensorProductoPorId(sensorProductoId);

    if (!sensorProducto) {
      return;
    }
    
    await this.sensoresRepository.actualizarSensorProductoPorId(sensorProductoId, nuevosValores);
  }

  private checarParametrosCrecimiento(sensorCrecimiento: SensorCrecimiento) {
    const { grosorTallo, altura, presenciaPlagas, humedad } = sensorCrecimiento;

    if (grosorTallo < MIN_GROSOR_TALLO) {
      return false;
    }

    if (altura < MAX_ALTURA) {
      return false;
    }

    if (presenciaPlagas > MAX_PRESENCIA_PLAGAS) {
      return false;
    }

    if (humedad < MIN_HUMEDAD || humedad > MAX_HUMEDAD) {
      return false;
    }

    return true;
  }

  private checarParametrosProducto(sensorProducto: SensorProducto) {
    const { porcentajeColor, porcentajeTextura, oxigenacion } = sensorProducto;

    if (porcentajeColor < PORCENTAJE_COLOR.MIN || porcentajeColor > PORCENTAJE_COLOR.MAX) {
      return false;
    }

    if (porcentajeTextura < PORCENTAJE_TEXTURE.MIN || porcentajeTextura > PORCENTAJE_TEXTURE.MAX) {
      return false;
    }

    if (oxigenacion < OXIGENACION.MIN || oxigenacion > OXIGENACION.MAX) {
      return false;
    }

    return true;
  }

}