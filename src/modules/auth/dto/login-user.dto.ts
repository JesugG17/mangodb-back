export class LoginUserDto {

  private constructor(
    public readonly correo: string,
    public readonly contrasenia: string
  ) {}

  static crear(body: {[key: string]: string}): [string?, LoginUserDto?] {
    const { correo, contrasenia } = body;

    if (!correo) {
      return ['Correo no proporcionado'];
    }

    if (!contrasenia) {
      return ['Contraseña no proporcionada'];
    }

    return [
      undefined,
      new LoginUserDto(correo, contrasenia)
    ]
  }
}