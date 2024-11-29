export class UpdateUserDto {

  private constructor(
    public readonly correo: string,
    // public readonly contrasenia: string,
    public readonly nombres: string,
    public readonly apellido_paterno: string,
    public readonly apellido_materno: string,
    public readonly roleId: number
  ) {}

  static create(body: {[key: string]: string}): [string?, UpdateUserDto?] {
    const { correo, nombres, apellido_paterno, apellido_materno, roleId } = body;

    if (!correo) {
      return ['Es necesario proporcionar un correo para continuar'];
    }

    return [
      undefined,
      new UpdateUserDto(
        correo,
        nombres,
        apellido_paterno,
        apellido_materno,
        +roleId
      )
    ];
  }

}