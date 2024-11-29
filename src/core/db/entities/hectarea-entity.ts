import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';
import { Planta } from './planta-entity';

type Status = 'NO COSECHABLE' | 'COSECHABLE' | 'COSECHANDO' | 'COSECHADA';
@Entity('hectareas')
export class Hectarea extends BaseEntity {
  @PrimaryColumn()
  idHectarea: number;

  @Column({
    type: 'text',
    nullable: false,
  })
  comunidad: string;

  @Column({
    type: 'text',
    nullable: false,
  })
  ubicacion: string;

  @Column({
    type: 'text',
    nullable: false,
    default: 'NO COSECHABLE',
  })
  status: string;

  @OneToMany(() => Planta, (planta) => planta.hectarea, { cascade: true, onDelete: 'CASCADE' })
  plantas: Planta[];

  public set setStatus(status: Status) {
    this.status = status;
  }
}
