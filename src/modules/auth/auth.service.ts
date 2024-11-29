import { Jwt } from "../../core/utils/jwt";
import { PasswordManager } from "../../core/utils/password-manager";
import { UsersRepository } from "../users/users.repository";
import { LoginUserDto } from "./dto/login-user.dto";

export class AuthService {

  constructor(
    private readonly authRepository: UsersRepository
  ) {}

  async login(loginUserDto: LoginUserDto) {
    const { contrasenia, correo } = loginUserDto;

    const userDb = await this.authRepository.findUserByEmail(correo);

    if (!userDb) {
      return {
        isValid: false,
        message: 'Credenciales invalidas'
      };
    }

    const isValidPassword = PasswordManager.comparePassword(contrasenia, userDb.contrasenia);

    if (!isValidPassword) {
      return {
        isValid: false,
        message: 'Credenciales invalidas'
      };
    }

    const { isValid, token } = await Jwt.sign({ correo: userDb.correo });
    
    if (!isValid) {
      return {
        isValid: false,
        message: 'No ha sido posible loguearse'
      };
    }

    return {
      isValid: true,
      data: {
        token,
        user: {
          name: userDb.nombres,
          correo: userDb.correo
        }
      }
    };
  }
}