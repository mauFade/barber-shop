import { CreateUserService } from "@resources/user/services/CreateUserService";
import { Request, Response } from "express";
import { container } from "tsyringe";

interface IRequest {
  name: string;
  email: string;
  password: string;
  cellphone: string;
  instagram: string;
}

export class CreateUserController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { name, email, password, cellphone, instagram }: IRequest =
      request.body;

    const user = await container.resolve(CreateUserService).execute({
      name,
      email,
      cellphone,
      password,
      instagram,
    });

    return response.status(200).json(user);
  }
}
