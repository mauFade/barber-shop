import { ListAllBarbersService } from "@resources/barber/services/ListAllBarbersService";
import { Request, Response } from "express";
import { container } from "tsyringe";

export class ListAllBarbersController {
  public async handle(request: Request, response: Response): Promise<Response> {
    try {
      const barbers = await container.resolve(ListAllBarbersService).execute();

      return response.status(200).json(barbers);
    } catch (error) {
      console.log("caiu no catch");
      return response.status(error.status).json(error);
    }
  }
}
