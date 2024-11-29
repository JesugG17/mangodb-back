import { IsNull, Not } from "typeorm";
import { Planta } from "../../core/db/entities/planta-entity";

export class PlantasRepository {

  async obtenerPlantaPorId(plantaId: number) {
    return await Planta.findOne({
      where: {
        idPlanta: plantaId
      },
      relations: {
        sensorCrecimiento: true,
        sensorProducto: true
      }
    });
  }

  async actualizarPlantaPorId(plantaId: number, planta: Planta) {
    return await Planta.update(plantaId, planta);
  }

  async obtenerPlantasConSensorDeCrecimiento() {
    return await Planta.find({
      relations: {
        sensorCrecimiento: true,
      },
      where: {
        sensorCrecimiento: {
          id: Not(IsNull())
        }
      }
    });
  }

  async obtenerPlantasConSensorDeProducto() {
    return await Planta.find({
      relations: {
        sensorProducto: true,
      },
      where: {
        sensorProducto: {
          id: Not(IsNull())
        }
      }
    });
  }
}