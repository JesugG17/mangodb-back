import { QueryRunner } from "typeorm";
import { AppDataSource } from "../db/data-source";
import { Concurrencia } from "../db/entities/concurrencia-entity";

export class Semaforo {

  private queryRunner: QueryRunner;
  private id: number;

  constructor(id: number) {
    this.queryRunner = AppDataSource.createQueryRunner();
    this.queryRunner.connect();
    this.id = id;
  }

  public async espera() {
    await this.queryRunner.startTransaction();
    await this.queryRunner.manager.find(Concurrencia, {
      where: { id: this.id },
      lock: { mode:'pessimistic_write' }
    }); 
  }

  public async libera() {
    try {
      await this.queryRunner.commitTransaction();
    } catch (error) {
      await this.queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await this.queryRunner.release();
    }
  }
}