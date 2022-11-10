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

    try {
      const data = await container
        .resolve(CreateBarberService)
        .execute({ name, email, cellphone, password, specialty, instagram });

      return response.status(201).json(data);
    } catch (error) {
      return response
        .status(error.status || 500)
        .json({ error: error.type, message: error.message });
    }
  }
}
