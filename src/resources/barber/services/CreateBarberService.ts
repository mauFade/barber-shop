import { inject, injectable } from "tsyringe";
import { Barber, IBarberRepository } from "../infra/database/entities/Barber";

interface IRequest {
  name: string;
  email: string;
  cellphone: string;
  password: string;
  specialty: string[];
  instagram?: string;
}

@injectable()
export class CreateBarberService {
  constructor(
    @inject("BarberRepository")
    private barbersRepository: IBarberRepository
  ) {}

  public async execute({
    name,
    email,
    cellphone,
    password,
    specialty,
    instagram,
  }: IRequest): Promise<Barber> {
    const barber = await this.barbersRepository.create({
      name,
      email,
      cellphone,
      password,
      specialty,
      instagram,
    });

    return barber;
  }
}
