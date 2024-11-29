import { Router } from "express";
import { UsersRepository } from "./users.repository";
import { UsersService } from "./users.service";
import { UsersController } from "./users.controller";
import { hasRoles } from '../../core/middlewares/has-roles';
import { validateJwt } from "../../core/middlewares/validate-jwt";

export class UsersRoutes {

  static get routes() {
    const router = Router();
    const usersRepository = new UsersRepository();
    const usersService = new UsersService(usersRepository);
    const usersController = new UsersController(usersService);
    
    router.post('/create', usersController.create);

    router.get('/all', [
      validateJwt,
      hasRoles('admin')
    ], usersController.getAll);

    router.get('/opciones', validateJwt, usersController.obtenerOpciones);

    router.put('/update/:correo', [
      validateJwt,
      hasRoles('admin')
    ], usersController.update);

    router.delete('/delete/:correo', [
      validateJwt,
      hasRoles('admin')
    ], usersController.delete);

    return router;
  }
}