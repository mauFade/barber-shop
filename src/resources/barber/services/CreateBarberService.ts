import { AlreadyExistsError } from "@lib/errors";
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
    const emailAlreadyExists = await this.barbersRepository.findByEmail(email);

    const phoneAlredyExists = await this.barbersRepository.findByCellphone(
      cellphone
    );

    const instaAlreadyExists = await this.barbersRepository.findInstagram(
      instagram as string
    );

    if (emailAlreadyExists) {
      throw new AlreadyExistsError("This email is already in use.");
    }

    if (phoneAlredyExists) {
      throw new AlreadyExistsError("This cellhpone is already in use.");
    }

    if (instaAlreadyExists) {
      throw new AlreadyExistsError("This Instagram is already in use.");
    }

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
