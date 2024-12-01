import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('concurrencia')
export class Concurrencia {
  @PrimaryGeneratedColumn() 
  id: number;

  @Column({ type: 'boolean', nullable: false })
  activo: boolean;
}
