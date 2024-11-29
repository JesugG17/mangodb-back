import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Planta } from './planta-entity';

@Entity('cajas')
export class Caja extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'id_caja' })
  idCaja: number;
  @Column()
  kg: number;

  @ManyToOne(() => Planta, (planta) => planta.idPlanta)
  Planta: Planta;
  @Column()
  fecha: Date;
  @Column()
  tipo: string;
}
