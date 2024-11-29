import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity('sensor_producto')
export class SensorProducto extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
      name: 'porcentage_color',
      nullable: false,
      default: 0,
      type: 'numeric'
    })
    porcentajeColor: number;

    @Column({
      name: 'porcentaje_textura',
      nullable: false,
      default: 0,
      type: 'numeric'
    })
    porcentajeTextura: number;

    @Column({
      nullable: false,
      default: 0,
      type: 'numeric'
    })
    oxigenacion: number;  

}