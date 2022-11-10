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

    try {
      const user = await container.resolve(CreateUserService).execute({
        name,
        email,
        cellphone,
        password,
        instagram,
      });

      return response.status(201).json(user);
    } catch (error) {
      return response
        .status(error.status || 500)
        .json({ error: error.type, message: error.message });
    }
  }
}
