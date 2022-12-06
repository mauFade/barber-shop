import { UpdateAppointmentBarberService } from "@resources/appointment/services/UpdateAppointmentBarberService";
import { Request, Response } from "express";
import { container } from "tsyringe";

interface IRequest {
  newBarberId: string;
  appointmentId: string;
}
export class UpdateAppointmentBarberController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { newBarberId, appointmentId }: IRequest = Object(request.query);

    const data = await container
      .resolve(UpdateAppointmentBarberService)
      .execute({ appointmentId, newBarberId });

    return response.status(200).json(data);
  }
}
