import bcrypt from 'bcrypt';

export class PasswordManager {
  static hashPassword(password: string) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync());
  }

  static comparePassword(password: string, hashedPassword: string) {
    return bcrypt.compareSync(password, hashedPassword);
  }
}