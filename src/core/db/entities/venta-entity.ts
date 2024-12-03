import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity('ventas')
export class Venta extends BaseEntity {
  @PrimaryGeneratedColumn()
  idVenta: number;

  @Column()
  kilosVendidos: number;

  @Column()
  fechaVenta: Date;
}
