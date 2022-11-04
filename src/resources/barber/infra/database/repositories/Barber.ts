import { prisma } from "@configs/prisma";
import { IBarber } from "@resources/barber/dtos/Barber";
import { Barber, IBarberRepository } from "../entities/Barber";

export class BarberRepository implements IBarberRepository {
  public async create({
    name,
    email,
    cellphone,
    password,
    specialty,
    instagram,
  }: IBarber): Promise<Barber> {
    const barber = (await prisma.barber.create({
      data: {
        name,
        email,
        cellphone,
        password,
        specialty,
        instagram,
      },
    })) as unknown as Barber;

    return barber;
  }
}
