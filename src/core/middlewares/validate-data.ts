import { Request, Response, NextFunction } from 'express';
import { ZodSchema, ZodError } from 'zod';

/**
 * Middleware genérico para validar datos usando Zod.
 * @param schema Esquema de Zod para validar.
 * @param dataSource Clave de los datos a validar (body, query, params).
 */
export const validateData =
  (schema: ZodSchema, dataSource: 'body' | 'query' | 'params' = 'body') =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req[dataSource];
      const parsedData = schema.parse(data);
      req[dataSource] = parsedData;
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({
          message: 'Validation failed',
          errors: error.errors || error.message,
        });
      } else {
        next(error);
      }
    }
  };
