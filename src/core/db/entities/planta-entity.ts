import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Hectarea } from './hectarea-entity';
import { SensorProducto } from './sensor-producto-entity';
import { SensorCrecimiento } from './sensor-crecimiento-entity';

@Entity('plantas')
export class Planta extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'id_planta' })
  idPlanta: number;


  @ManyToOne(() => Hectarea, (hectarea) => hectarea.plantas, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'hectarea_id' })
  hectarea: Hectarea;

  @Column({
    type: 'text',
    nullable: false,
    default: 'SALUDABLE',
  })
  status: string;
  
  @OneToOne(() => SensorProducto)
  @JoinColumn({ name: 'sensor_producto_id' })
  sensorProducto: SensorProducto;

  @OneToOne(() => SensorCrecimiento)
  @JoinColumn({ name: 'sensor_crecimiento_id' })
  sensorCrecimiento: SensorCrecimiento;
}
