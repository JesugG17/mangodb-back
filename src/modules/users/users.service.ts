import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { UsersRepository } from "./users.repository";

export class UsersService {

  constructor(
    private readonly usersRepository: UsersRepository
  ){}

  async createUser(createUserDto: CreateUserDto) {
    
    const usuarioDb = await this.usersRepository.findUserByEmail(createUserDto.correo);

    if (usuarioDb) {
      return {
        isValid: false,
        message: 'Este correo ya existe'
      };
    }
    
    await this.usersRepository.createUser(createUserDto);

    return {
      isValid: true,
      message: 'Usuario creado exitosamente'
    };
  }

  async getAllUsers() {
    const users = await this.usersRepository.findAllUsers();

    return {
      isValid: true,
      data: users
    };
  }

  async updateUser(updateUserDto: UpdateUserDto) {
    await this.usersRepository.updateUserByEmail(updateUserDto);
    return {
      isValid: true,
      message: 'Usuario actualizado correctamente'
    };
  }

  async obtenerOpciones(correo: string) {
    const usuarioDb = await this.usersRepository.findUserByEmail(correo);

    if (!usuarioDb) {
      return {
        isValid: false,
        message: 'Acceso no autorizado'
      };
    }

    const opciones = await this.usersRepository.obtenerOpcionesUsuario(usuarioDb.roleId);

    return {
      isValid: true,
      data: opciones
    }
  }
}