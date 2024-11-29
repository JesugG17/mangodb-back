import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Opcion } from "./opciones-entity";
import { Role } from "./roles-entity";

@Entity('roles_opciones')
export class RolesOpciones extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Opcion, opcion => opcion.rolesOpciones, { eager: true })
    @JoinColumn({ name: 'opcionid' })
    opcion: Opcion;

    @Column({
      name: 'opcionid'
    })
    opcionId: number;

    @ManyToOne(() => Role, role => role.rolesOpciones, { eager: true })
    @JoinColumn({ name: 'roleid' })
    role: Role;

    @Column({
      name: 'roleid'
    })
    roleId: number;
}
