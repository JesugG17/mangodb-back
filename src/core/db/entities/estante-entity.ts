import { BaseEntity, Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { CajaEntity } from './caja-entity';

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
    primary: true,
    name: 'almacen_id'
  })
  almacen: number;

  @OneToOne(() => CajaEntity, (caja) => caja.idCaja)
  @JoinColumn({ name: 'caja' })
  caja: CajaEntity;

  @Column({
    type: 'timestamp',
    name: 'fecha_ingreso',
    nullable: true
  })
  fechaIngreso: Date

}