import { BaseEntity, Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, OneToOne } from 'typeorm';
import { CajaEntity } from './caja-entity';
import { Almacen } from './almacen-entity';

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


  @ManyToOne(() => Almacen, (almacen) => almacen.id)
  @JoinColumn({ name: 'almacen_id' })
  almacen: Almacen;

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