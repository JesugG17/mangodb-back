
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Usuario } from "./user-entity";
import { RolesOpciones } from "./roles-opciones-entity";

export type Roles = 'admin' | 'gerente_almacen' | 'lider_recoleccion';

export const RolesEnum = {
  ADMIN: 'admin',
  GERENTE_ALMACEN: 'gerente_almacen',
  LIDER_RECOLECCION: 'lider_recoleccion'
}

@Entity('roles')
export class Role extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
      type: 'text',
      nullable: false
    })
    nombre: string;

    @OneToMany(() => Usuario, usuario => usuario.role)
    usuarios: Usuario[];

    @OneToMany(() => RolesOpciones, rolOpcion => rolOpcion.role)
    rolesOpciones: RolesOpciones[];
}