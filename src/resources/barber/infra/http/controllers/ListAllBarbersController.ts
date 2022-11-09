import { ListAllBarbersService } from "@resources/barber/services/ListAllBarbersService";
import { Request, Response } from "express";
import { container } from "tsyringe";

export class ListAllBarbersController {
  public async handle(
    _request: Request,
    response: Response
  ): Promise<Response> {
    try {
      const barbers = await container.resolve(ListAllBarbersService).execute();

      return response.status(200).json(barbers);
    } catch (error) {
      return response.status(error.status || 500).json(error);
    }
  }
}
