import { UsersRepository } from '../../modules/users/users.repository';
import { CreateUserDto } from "../../modules/users/dto/create-user.dto";

export class Seed {

  static async start() {
    const usersRepository = new UsersRepository();

    const admin: CreateUserDto = {
      nombres: 'Admin',
      apellido_materno: 'Admin',
      apellido_paterno: 'Admin',
      correo: 'admin@gmail.com',
      contrasenia: '123456',
      roleId: 1
    };

    const gerenteAlmacen: CreateUserDto = {
      nombres: 'Gerente Almacen',
      apellido_materno: 'Admin',
      apellido_paterno: 'Admin',
      correo: 'gerente_almacen@gmail.com',
      contrasenia: '123456',
      roleId: 2
    };

    const liderRecoleccion: CreateUserDto = {
      nombres: 'Lider Recoleccion',
      apellido_materno: 'Admin',
      apellido_paterno: 'Admin',
      correo: 'lider_recoleccion@gmail.com',
      contrasenia: '123456',
      roleId: 3
    };

    usersRepository.createUser(admin);
    usersRepository.createUser(gerenteAlmacen);
    usersRepository.createUser(liderRecoleccion);
  }

}