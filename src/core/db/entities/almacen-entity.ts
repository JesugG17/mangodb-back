import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('almacenes')
export class Almacen {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'text'
  })
  tipo: string;
}