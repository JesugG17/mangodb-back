import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { Role } from "./roles-entity";

@Entity('usuarios')
export class Usuario extends BaseEntity {
  @PrimaryColumn()
  correo: string;

  @Column({
    nullable: true
  })
  nombres: string;

  @Column({
    nullable: true
  })
  apellido_paterno: string;

  @Column({
    nullable: true
  })
  apellido_materno: string;

  @Column({
    nullable: true
  })
  contrasenia: string;

  @Column({
    default: true,
    nullable: false
  })
  activo: boolean;

  @ManyToOne(() => Role, { eager: true })
  @JoinColumn({ name: 'roleid' })
  role: Role;

  @Column({
    name: 'roleid'
  })
  roleId: number;
}