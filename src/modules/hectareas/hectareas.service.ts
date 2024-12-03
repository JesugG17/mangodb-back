import { Hectarea } from '../../core/db/entities/hectarea-entity';
import { HECTAREA_STATUS } from '../../core/utils/constants';
import { CajaService } from '../cajas/cajas.service';
import { CreateHectareaDto } from './dto/create-hectarea.dto';
import { UpdateHectareaDto } from './dto/update-hectarea.dto';
import { HectareaRepository } from './hectareas.repository';

export class HectareaService {
  constructor(
    private readonly hectareaRepository: HectareaRepository,
    private readonly cajaService?: CajaService
  ) {}

  async crearHectarea(hectareaDto: CreateHectareaDto) {
    const hectareaDb = await this.hectareaRepository.obtenerHectareaPorId(hectareaDto.idHectarea);

    if (hectareaDb) {
      return {
        isValid: false,
        message: 'Ya existe una hectarea con ese id',
        code: 400
      };
    }

    return await this.hectareaRepository.crearHectarea(hectareaDto);
  }

  async obtenerHectareas(filters = {}) {
    return await this.hectareaRepository.obtenerHectareas(filters);
  }

  async actualizarHectarea(idHectarea: number, hectareaDto: Hectarea) {
    return await this.hectareaRepository.actualizarHectarea(idHectarea, hectareaDto);
  }

  async eliminarHectarea(idHectarea: number) {
    return await this.hectareaRepository.eliminarHectarea(idHectarea);
  }

  async obtenerHectarea(idHectarea: number) {
    const hectareaDb = await this.hectareaRepository.obtenerHectareaPorId(idHectarea, { 
      relations: { 
        plantas: {
          sensorCrecimiento: true,
          sensorProducto: true
        }
      },
      order: {
        plantas: {
          idPlanta: 'ASC'
        }
      }
    }); 
  
    if(!hectareaDb) {
      return {
        isValid: false,
        code: 404,
        message: `La hectarea con el id ${idHectarea} no existe`,
      }
    }

    const MONTH = 1000 * 60 //1000 * 60 * 60 * 24 * 30;
    const currentDate = new Date();

    const formattedHectarea = {
      ...hectareaDb,
      plantas: hectareaDb.plantas.map(planta => ({
        ...planta,
        aptaSensorCrecimiento: currentDate.getTime() - new Date(planta.fechaCreada).getTime() >= MONTH,
        aptaSensorProducto: currentDate.getTime() - new Date(planta.fechaCreada).getTime() >= (MONTH * 2)
      }))
    };

    return {
      isValid: true,
      code: 200,
      data: formattedHectarea
    }
  }

  async autorizarHectarea(idHectarea: number) {
    const hectareaDb = await this.hectareaRepository.obtenerHectareaPorId(idHectarea);

    if (!hectareaDb) {
      return {
        isValid: false,
        message: `El id ${idHectarea} no existe`,
      };
    }

    if (hectareaDb.status !== HECTAREA_STATUS.COSECHABLE) {
      return {
        isValid: false,
        message: 'Esta hectarea aun no está lista para cosecharse',
      };
    }

    hectareaDb.setStatus = 'COSECHANDO';
    await this.hectareaRepository.actualizarHectarea(idHectarea, hectareaDb);

    return {
      isValid: true,
      message: 'La hectarea ha sido autorizada exitosamente',
    };
  }

  async finalizarCosecha(idHectarea: number) {
    const hectareaDb = await this.hectareaRepository.obtenerHectareaPorId(idHectarea);

    if (!hectareaDb) {
      return {
        isValid: false,
        message: `El id ${idHectarea} no existe`,
      };
    }

    if (hectareaDb.status !== HECTAREA_STATUS.COSECHANDO) {
      return {
        isValid: false,
        message: 'Esta hectarea aun no está en proceso de cosecha',
      };
    }

    hectareaDb.setStatus = 'COSECHADA';
    await this.hectareaRepository.actualizarHectarea(idHectarea, hectareaDb);

    return {
      isValid: true,
      message: 'La hectarea ha sido cosechada exitosamente',
    };
  }
}
