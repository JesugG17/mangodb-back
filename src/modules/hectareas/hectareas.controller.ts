import { HTTP_CODE } from '../../core/utils/http-codes';
import { Request, Response } from 'express';
import { HectareaService } from './hectareas.service';

export class HectareasController {
  constructor(private readonly hectareaService: HectareaService) {}

  crearHectarea = async (req: Request, res: Response) => {
    const isCreated = await this.hectareaService.crearHectarea(req.body);
    if (!isCreated.isValid) {
      return res.status(HTTP_CODE.CONFLICT).send({
        isValid: isCreated.isValid,
        message: isCreated.message,
      });
    }

    return res.status(HTTP_CODE.CREATED).send({
      isValid: true,
      message: '¡Hectarea creada exitosamente!',
    });
  };
  obtenerHectareas = async (req: Request, res: Response) => {
    const hectareas = await this.hectareaService.obtenerHectareas();
    if (!hectareas.isValid) {
      return res.status(HTTP_CODE.NOT_FOUND).send({
        isValid: hectareas.isValid,
        message: hectareas.message,
      });
    }
    return res.status(HTTP_CODE.OK).send({
      isValid: true,
      data: hectareas.data,
    });
  };

  actualizarHectarea = async (req: Request, res: Response) => {
    const isUpdated = await this.hectareaService.actualizarHectarea(
      req.params.idHectarea as any,
      req.body
    );

    if (!isUpdated.isValid) {
      return res.status(HTTP_CODE.NOT_FOUND).send({
        isValid: false,
        message: isUpdated.message,
      });
    }
    return res.status(HTTP_CODE.OK).send({
      isValid: true,
      data: req.body,
    });
  };

  eliminarHectarea = async (req: Request, res: Response) => {
    const isDeleted = await this.hectareaService.eliminarHectarea(req.params.idHectarea as any);

    if (!isDeleted.isValid) {
      return res.status(HTTP_CODE.CONFLICT).send({
        isValid: false,
        message: isDeleted.message,
      });
    }
    return res.status(HTTP_CODE.OK).send({
      isValid: true,
    });
  };

  obtenerHectarea = async (req: Request, res: Response) => {
    const idHect = +req.params.id;

    if (isNaN(idHect)) {
      return res.status(HTTP_CODE.BAD_REQUEST).send({
        isValid: false,
        message: 'El id de la hectarea no es un numero entero',
      });
    }

    const response = await this.hectareaService.obtenerHectarea(idHect);
    res.status(response.code).send(response);
  };

  autorizarHectarea = async (req: Request, res: Response) => {
    const idHect = req.params.idHectarea;
    const response = await this.hectareaService.autorizarHectarea(+idHect);
    res.send(response);
  };

  finalizarCosecha = async (req: Request, res: Response) => {
    const response = await this.hectareaService.finalizarCosecha(req.params.idHectarea as any);
    res.send(response);
  };
}
