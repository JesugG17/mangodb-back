import { NextFunction, Request, Response } from "express";
import { HTTP_CODE } from "../utils/http-codes";
import { Jwt } from "../utils/jwt";
import { Usuario } from "../db/entities/user-entity";


export const validateJwt = async(req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(HTTP_CODE.UNAUTHORIZED).json({
      isValid: false,
      message: 'Acceso no autorizado'
    });
  }

  try {
    const formattedToken = token.replace('Bearer', '').trim();

    const response = await Jwt.verify(formattedToken) as any;

    if (!response.isValid) {
      return res.status(HTTP_CODE.UNAUTHORIZED).json({
        isValid: false,
        message: 'Acceso no autorizado'
      });
    }

    const userDb = await Usuario.findOne({
      where: {
        correo: response.data.correo
      }
    });

    if (!userDb) {
      return res.status(HTTP_CODE.UNAUTHORIZED).json({
        isValid: false,
        message: 'Acceso no autorizado'
      });
    }

    req.body.user = userDb.correo;
    next();

  } catch (error) {
    res.status(HTTP_CODE.UNAUTHORIZED).json({
      isValid: true,
      message: 'Acceso no autorizado'
    });
  }

}