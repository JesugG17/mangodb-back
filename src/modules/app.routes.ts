import { Router } from 'express';
import { AuthRoutes } from './auth/auth.routes';
import { UsersRoutes } from './users/users.routes';
import { HectareasRoutes } from './hectareas/hectareas.routes';
import { CajasRoutes } from './cajas/cajas.routes';
import { PlantasRoutes } from './plantas/plantas.routes';

export class AppRoutes {
  static get routes(): Router {
    const router = Router();

    router.use('/api/auth', AuthRoutes.routes);
    router.use('/api/users', UsersRoutes.routes);
    router.use('/api/hectareas', HectareasRoutes.routes);
    router.use('/api/cajas', CajasRoutes.routes);
    router.use('/api/plantas', PlantasRoutes.routes);

    return router;
  }
}
