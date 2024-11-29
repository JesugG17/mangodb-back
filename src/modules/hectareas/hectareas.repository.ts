import { Hectarea } from '../../core/db/entities/hectarea-entity';
import { Planta } from '../../core/db/entities/planta-entity';
import { CreateHectareaDto } from './dto/create-hectarea.dto';
import { AppDataSource } from '../../core/db/data-source';
import { UpdateHectareaDto } from './dto/update-hectarea.dto';
import { FindOneOptions } from 'typeorm';
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
  async obtenerHectareas() {
    try {
      const hectareas = await AppDataSource.getRepository(Hectarea).find();
      return { isValid: true, data: hectareas };
    } catch (error) {
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

  async actualizarHectarea(idHectarea: number, hectareaData: UpdateHectareaDto | Hectarea) {
    try {
      await AppDataSource.getRepository(Hectarea).update(idHectarea, hectareaData);
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
