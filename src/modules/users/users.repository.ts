import { AppDataSource } from "../../core/db/data-source";
import { RolesOpciones } from "../../core/db/entities/roles-opciones-entity";
import { Usuario } from "../../core/db/entities/user-entity";
import { PasswordManager } from "../../core/utils/password-manager";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";

export class UsersRepository {
  
  async findUserByEmail(correo: string) {
    return await Usuario.findOne({
      where: {
        correo
      },
    });
  }

  async createUser(createUserDto: CreateUserDto) {
    const newUser = AppDataSource.getRepository(Usuario).create({
      ...createUserDto,
      contrasenia: PasswordManager.hashPassword(createUserDto.contrasenia)
    });
    await newUser.save();
  }

  async findAllUsers() {
    return await Usuario.find({
      relations: ['role'],
      select: {
        correo: true,
        nombres: true,
        apellido_paterno: true,
        apellido_materno: true,
        roleId: true,
      }
    });
  }

  async updateUserByEmail(updateUserDto: UpdateUserDto) {
    const { correo, ...rest} = updateUserDto;
    
    await AppDataSource.getRepository(Usuario).update(correo, rest);
  }

  async obtenerOpcionesUsuario(roleId: number) {
    const rolesOpciones = await RolesOpciones.find({
      where: { roleId },
      relations: ['opcion'],
    });
    return rolesOpciones.map(ro => ro.opcion);
  }
}