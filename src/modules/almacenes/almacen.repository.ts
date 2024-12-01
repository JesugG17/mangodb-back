import { AppDataSource } from "../../core/db/data-source";
import { Almacen } from "../../core/db/entities/almacen-entity";
import { Concurrencia } from "../../core/db/entities/concurrencia-entity";

export class AlmacenRepository {
  async checarConcurrencia() {
    const queryRunner = AppDataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction("SERIALIZABLE");
    try {
      const resultado = await AppDataSource.getRepository(Concurrencia).findOne({
        where: { id: 1 }
      });
      if(resultado?.activo){
        await queryRunner.release();
        return true;
      } 
      await AppDataSource.getRepository(Concurrencia).update(1,{ activo: true });
      await queryRunner.commitTransaction();
      return false;
    } catch (error) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }

  async obtenerAlmacenPorId(almacenId: number) {
    return await AppDataSource.getRepository(Almacen).findOne({
      where: {
        id: almacenId
      }
    })
  }
}