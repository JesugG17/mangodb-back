import { Router } from "express";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { AuthRepository } from "./auth.repository";
import { UsersRepository } from "../users/users.repository";

export class AuthRoutes {

  static get routes() {
    const router = Router();
    const usersRepository = new UsersRepository();
    const authService = new AuthService(usersRepository);
    const authController = new AuthController(authService);

    router.post('/login', authController.login);

    return router;
  }
}