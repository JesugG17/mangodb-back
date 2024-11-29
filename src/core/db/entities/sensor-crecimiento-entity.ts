import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity('sensor_crecimiento')
export class SensorCrecimiento extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: false,
    default: 0,
    type: 'numeric'
  })
  altura: number;

  @Column({
    name: 'grosor_tallo',
    nullable: false,
    default: 0,
    type: 'numeric'
  })
  grosorTallo: number;

  @Column({
    name: 'presencia_plagas',
    nullable: false,
    default: 0,
    type: 'numeric'
  })
  presenciaPlagas: number;

  @Column({
    nullable: false,
    default: 0,
    type: 'numeric'
  })
  humedad: number;
}