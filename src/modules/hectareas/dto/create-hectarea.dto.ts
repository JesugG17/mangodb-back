import { z } from 'zod';

export const createHectareaSchema = z.object({
  idHectarea: z.number({
    required_error: 'El idHectarea es obligatorio',
    message: 'el ID hectarea es numero',
  }),
  comunidad: z.string({
    required_error: 'La comunidad es obligatoria',
    message: 'la comunidad es texto',
  }),
  ubicacion: z.string({
    required_error: 'La ubicacion es obligatorio',
    message: 'la ubicacion es texto',
  }),
});

export type CreateHectareaDto = z.infer<typeof createHectareaSchema>;
