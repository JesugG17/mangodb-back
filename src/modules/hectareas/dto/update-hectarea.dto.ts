import { z } from 'zod';

export const updateHectareaSchemaBody = z.object({
  comunidad: z
    .string({
      message: 'la comunidad es texto',
    })
    .optional(),
  ubicacion: z
    .string({
      message: 'la ubicacion es texto',
    })
    .optional(),
  status: z.enum(['COSECHABLE', 'NO COSECHABLE', 'COSECHANDO'], {
    required_error: 'El estado es obligatorio',
  }),
});

export type UpdateHectareaDto = z.infer<typeof updateHectareaSchemaBody>;

export const idHectareaSchemaParams = z.object({
  idHectarea: z
    .string()
    .regex(/^\d+$/, 'ID hectarea es numero')
    .transform((val) => parseInt(val, 10)),
});
