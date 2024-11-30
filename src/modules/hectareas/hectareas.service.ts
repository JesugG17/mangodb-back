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

  async obtenerHectareas() {
    return await this.hectareaRepository.obtenerHectareas();
  }

  async actualizarHectarea(idHectarea: number, hectareaDto: UpdateHectareaDto) {
    return await this.hectareaRepository.actualizarHectarea(idHectarea, hectareaDto);
  }

  async eliminarHectarea(idHectarea: number) {
    return await this.hectareaRepository.eliminarHectarea(idHectarea);
  }

  async obtenerHectarea(idHectarea: number) {
    const hectareaDb = await this.hectareaRepository.obtenerHectareaPorId(idHectarea, { 
      relations: { 
        plantas: true 
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

    return {
      isValid: true,
      code: 200,
      data: hectareaDb
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

  async checarEstatusHectareas() {}
}
