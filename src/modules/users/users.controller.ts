import { Request, Response } from "express";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { HTTP_CODE } from "../../core/utils/http-codes";
import { UpdateUserDto } from "./dto/update-user.dto";

export class UsersController {

  constructor(
    private readonly userService: UsersService
  ){}

  create = async(req: Request, res: Response) => {
    const [error, createUserDto] = CreateUserDto.create(req.body);

    if (error) {
      return res.status(HTTP_CODE.BAD_REQUEST).send({
        isValid: false,
        message: error
      });
    }

    const response = await this.userService.createUser(createUserDto!);
    
    res.status(HTTP_CODE.CREATED).send(response);
  }

  getAll = async(req: Request, res: Response) => {
    const response = await this.userService.getAllUsers();

    res.send(response);
  }

  update = async(req: Request, res: Response) => {
    const [error, updateUserDto] = UpdateUserDto.create({...req.body, ...req.params});

    if (error) {
      return res.status(HTTP_CODE.BAD_REQUEST).send({
        isValid: false,
        message: error
      });
    }

    const response = await this.userService.updateUser(updateUserDto!);

    res.send(response);
  }

  delete = async(req: Request, res: Response) => {

  }

  obtenerOpciones = async(req: Request, res: Response) => {
    const { user } = req.body;

    const response = await this.userService.obtenerOpciones(user);

    res.send(response);
  }

}