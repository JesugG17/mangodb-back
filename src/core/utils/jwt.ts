import jwt from 'jsonwebtoken';
import { ENV } from './env';

export class Jwt {

  static sign(payload: {[key: string]: string}): Promise<{isValid: boolean, token?: string}> {
    return new Promise((resolve) => {
      jwt.sign(payload, ENV.SECRET_KEY, { expiresIn: '2h' } ,(err, token) => {
        
        if (err) {
          resolve({ isValid: false });
        } else { 
          resolve({ isValid: true, token });
        }
      });
    });
  }

  static verify(token: string) {
    return new Promise((resolve) => {
      jwt.verify(token, ENV.SECRET_KEY, (err, decoded) => {
        if (err) {
          resolve({ isValid: false });
        } else {
          resolve({ isValid: true, data: decoded as { correo: string } });
        }
      })
    });
  }
}