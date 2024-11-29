import { NextFunction, Request, Response } from "express";
import { Roles } from "../db/entities/roles-entity";
import { HTTP_CODE } from "../utils/http-codes";
import { Usuario } from "../db/entities/user-entity";


export const hasRoles = (...roles: Roles[]) => {
  return async(req: Request, res: Response, next: NextFunction) => {

    if (!req.body.user) {
      return res.status(HTTP_CODE.UNAUTHORIZED).json({
        isValid: false,
        message: 'Acceso no autorizado'
      });
    }

    const userDb = await Usuario.findOne({
      where: {
        correo: req.body.user
      },
      relations: ['role']
    });

    const isValidRole = roles.includes(userDb?.role.nombre as Roles);
    if (!isValidRole) {
      return res.status(HTTP_CODE.UNAUTHORIZED).json({
        isVAlid: false,
        message: 'Acceso no autorizado'
      });
    }

    next();
  }
}