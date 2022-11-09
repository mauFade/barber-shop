import { AuthenticateService } from "@resources/user/services/AuthenticateService";
import { Request, Response } from "express";
import { container } from "tsyringe";

interface IRequest {
  email: string;
  password: string;
}

export class AuthenticateController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { email, password }: IRequest = request.body;

    try {
      const data = await container
        .resolve(AuthenticateService)
        .execute({ email, password });

      return response.status(200).json(data);
    } catch (error) {
      return response
        .status(error.status || 403)
        .json({ message: error.message });
    }
  }
}
