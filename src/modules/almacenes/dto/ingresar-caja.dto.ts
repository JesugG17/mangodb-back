import { z } from 'zod';

export const ingresarCajaSchema = z.object({
  idCaja: z.number({
    required_error: 'El ID de la caja es obligatorio',
    message: 'El ID caja es numero',
  }),
});
