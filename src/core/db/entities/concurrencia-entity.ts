import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn } from 'typeorm';

@Entity('concurrencia')
export class Concurrencia {
  @PrimaryColumn() 
  id: number;

  @Column({ type: 'text', nullable: false })
  nombre: string;
}