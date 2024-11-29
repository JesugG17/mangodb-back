import { Request, Response } from "express";
import { LoginUserDto } from "./dto/login-user.dto";
import { AuthService } from "./auth.service";
import { HTTP_CODE } from "../../core/utils/http-codes";

export class AuthController {

  
  constructor(
    private readonly authService: AuthService
  ) {}

  login = async (req: Request, res: Response) => {
    const [error, loginUserDto] = LoginUserDto.crear(req.body);

    if (error) {
      return res.json({
        isValid: false,
        message: error
      });
    }

    const response = await this.authService.login(loginUserDto!);

    const code = response.isValid ? HTTP_CODE.OK : HTTP_CODE.BAD_REQUEST;

    res.status(code).json(response);
  }
}