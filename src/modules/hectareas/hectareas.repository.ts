import { Hectarea } from '../../core/db/entities/hectarea-entity';
import { Planta } from '../../core/db/entities/planta-entity';
import { CreateHectareaDto } from './dto/create-hectarea.dto';
import { AppDataSource } from '../../core/db/data-source';
import { UpdateHectareaDto } from './dto/update-hectarea.dto';
import { IsNull, Not } from 'typeorm';

export class HectareaRepository {
  async crearHectarea(nuevaHectarea: CreateHectareaDto) {
    const queryRunner = AppDataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const hectarea = await queryRunner.manager.save(Hectarea, nuevaHectarea);
      const plantas = Array.from({ length: 25 }, () => {
        const planta = new Planta();
        planta.hectarea = hectarea;
        planta.fechaCreada = new Date();
        return planta;
      });
      await queryRunner.manager
        .createQueryBuilder()
        .insert()
        .into(Planta)
        .values(plantas)
        .execute();
      await queryRunner.commitTransaction();
      return { isValid: true };
    } catch (e: any) {
      if (e.code == 23505) return { isValid: false, message: 'la hectarea ya existe' };
      return { isValid: false, message: 'Error desconocido' };
    } finally {
      await queryRunner.release();
    }
  }
  async obtenerHectareas(filters = {}) {
    try {
      const hectareas = await AppDataSource.getRepository(Hectarea).find({
        relations: {
          plantas: {
            sensorCrecimiento: true,
            sensorProducto: true
          },
        },
        ...filters
      });
      return { isValid: true, data: hectareas };
    } catch (error) {
      console.log(error);
      return { isValid: false, message: 'Error obteniendo hectareas' };
    }
  }

  async obtenerHectareaPorId(idHectarea: number, filters = {}) {
    const hectareaDb = await AppDataSource.getRepository(Hectarea).findOne({
      where: {
        idHectarea,
      },
      ...filters,
    });
    return hectareaDb;
  }

  async actualizarHectarea(idHectarea: number, hectareaData: Hectarea) {
    try {
      const { plantas, ...rest } = hectareaData;
      await AppDataSource.getRepository(Hectarea).update(idHectarea, rest);
      return { isValid: true };
    } catch (error) {
      return { isValid: false, message: 'Error actualizando hectarea' };
    }
  }

  async eliminarHectarea(idHectarea: number) {
    try {
      await AppDataSource.getRepository(Hectarea).delete(idHectarea);
      return { isValid: true };
    } catch (error) {
      return { isValid: false, message: 'Error eliminando hectarea' };
    }
  }

  async obtenerHectareaPlanta(hectarea: number, planta: number) {
    return await AppDataSource.getRepository(Planta).findOne({
      where: {
        idPlanta: planta,
      },
      relations: ['hectarea'],
    });
  }
}
