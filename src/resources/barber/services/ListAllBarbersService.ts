import { inject, injectable } from "tsyringe";
import { Barber, IBarberRepository } from "../infra/database/entities/Barber";

@injectable()
export class ListAllBarbersService {
  constructor(
    @inject("BarberRepository")
    private barbersRepository: IBarberRepository
  ) {}

  public async execute(): Promise<Barber[]> {
    const barbers = await this.barbersRepository.find();

    return barbers;
  }
}
