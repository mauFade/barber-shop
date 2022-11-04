import { CreateBarberService } from "@resources/barber/services/CreateBarberService";
import { Request, Response } from "express";
import { container } from "tsyringe";

interface IRequest {
  name: string;
  email: string;
  cellphone: string;
  password: string;
  specialty: string[];
  instagram?: string;
}

export class CreateBarberController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { name, email, cellphone, password, specialty, instagram }: IRequest =
      request.body;

    const data = await container
      .resolve(CreateBarberService)
      .execute({ name, email, cellphone, password, specialty, instagram });

    return response.status(201).json(data);
  }
}
