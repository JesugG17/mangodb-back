import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { RolesOpciones } from "./roles-opciones-entity";

@Entity('opciones')
export class Opcion extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'text',
        nullable: false
    })
    ruta: string;

    @Column({
        type: 'text',
        nullable: false
    })
    texto: string;

    @Column({
      type: 'text',
      nullable: false
    })
    icono: string

    @OneToMany(() => RolesOpciones, rolOpcion => rolOpcion.opcionId)
    rolesOpciones: RolesOpciones[];
}