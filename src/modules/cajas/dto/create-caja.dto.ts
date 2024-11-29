import { z } from 'zod';

export const CreateCajaSchema = z.object({
  planta: z.number({
    required_error: 'La planta es obligatoria',
    message: 'La hectarea es numero',
  }),
  kg: z.number({
    required_error: 'Los kilogramos son obligatorios',
    message: 'La hectarea es numero',
  }),
  tipo: z.string({
    required_error: 'El tipo es obligatorio',
    message: 'El tipo es texto',
  }),
});
