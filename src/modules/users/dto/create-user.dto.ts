export class CreateUserDto {

  private constructor(
    public readonly correo: string,
    public readonly contrasenia: string,
    public readonly nombres: string,
    public readonly apellido_paterno: string,
    public readonly apellido_materno: string | undefined,
    public readonly roleId: number
  ){}

  static create(body: {[key: string]: string}): [string?, CreateUserDto?] {
    const { correo, contrasenia, roleId, nombres, apellido_paterno, apellido_materno } = body;

    if (!correo) {
      return [
        'El correo es obligatorio'
      ];
    }

    if (!contrasenia) {
      return [
        'La contraseña es obligatoria'
      ];
    }

    if (!roleId) {
      return [
        'El role es obligatorio'
      ];
    }

    if (!nombres) {
      return [
        'El nombre del usuario es obligatorio'
      ];
    }

    if (!apellido_paterno) {
      return [
        'El apellido paterno es obligatorio'
      ];
    }

    return [
      undefined,
      new CreateUserDto(
        correo, 
        contrasenia,
        nombres,
        apellido_paterno,
        apellido_materno,
        +roleId
      )
    ];
  }
}