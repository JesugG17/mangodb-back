import { z } from 'zod';

export const idPlantaSchemaBody = z.object({
  plantaId: z.number({
    required_error: 'El ID planta es obligatorio',
    message: 'El ID planta es numerico',
  }),
});
