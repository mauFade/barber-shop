import { CreateAppointmentService } from "@resources/appointment/services/CreateAppointmentService";
import { Request, Response } from "express";
import { container } from "tsyringe";

interface IRequest {
  time: string;
  price: number;
  type: string;
  barberId: string;
}

export class CreateAppointmentController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { price, time, type, barberId }: IRequest = request.body;

    try {
      const data = await container.resolve(CreateAppointmentService).execute({
        barberId,
        price: Number(price),
        time,
        type,
        userId: request.user.id,
      });

      return response.status(201).json(data);
    } catch (error) {
      return response.status(error.status || 500).json(error);
    }
  }
}
