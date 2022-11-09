import { ListAllAppointmentService } from "@resources/appointment/services/ListAllAppointmentService";
import { Request, Response } from "express";
import { container } from "tsyringe";

export class ListAllAppointmentController {
  public async handle(
    _request: Request,
    response: Response
  ): Promise<Response> {
    const data = await container.resolve(ListAllAppointmentService).execute();

    return response.status(200).json(data);
  }
}
