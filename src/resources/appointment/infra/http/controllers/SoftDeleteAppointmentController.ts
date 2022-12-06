import { SoftDeleteAppointmentService } from "@resources/appointment/services/SoftDeleteAppointmentsService";
import { Request, Response } from "express";
import { container } from "tsyringe";

interface IRequest {
  appointmentId: string;
}

export class SoftDeleteAppointmentController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { appointmentId }: IRequest = Object(request.params);

    await container
      .resolve(SoftDeleteAppointmentService)
      .execute(appointmentId);

    return response.status(202).json();
  }
}
