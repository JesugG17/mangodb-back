import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('concurrencia')
export class Concurrencia {
  @PrimaryGeneratedColumn() 
  id: number;

  @Column({ type: 'text', nullable: false })
  nombre: string;
}