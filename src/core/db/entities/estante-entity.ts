import { BaseEntity, Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { Caja } from './caja-entity';

@Entity('estantes')
export class Estante extends BaseEntity {
  @Column({
    primary: true
  })
  id: number;

  @Column({
    primary: true
  })
  division: number;

  @Column({
    primary: true
  })
  particion: number;

  @Column({
    primary: true
  })
  almacen: number;

  @OneToOne(() => Caja, (caja) => caja.idCaja)
  @JoinColumn({ name: 'caja' })
  caja: Caja;

  @Column({
    type: 'timestamp',
    name: 'fecha_ingreso'
  })
  fechaIngreso: Date

}