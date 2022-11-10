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
    })) as Barber;

    return barber;
  }

  public async find(): Promise<Barber[]> {
    const barbers = (await prisma.barber.findMany()) as Barber[];

    return barbers;
  }

  public async findById(id: string): Promise<Barber | undefined> {
    const barber = (await prisma.barber.findFirst({
      where: {
        id,
      },
    })) as Barber | undefined;

    return barber;
  }

  public async findByEmail(email: string): Promise<Barber | undefined> {
    const barber = (await prisma.barber.findFirst({
      where: { email },
    })) as Barber | undefined;

    return barber;
  }

  public async findByCellphone(phone: string): Promise<Barber | undefined> {
    const barber = (await prisma.barber.findFirst({
      where: { cellphone: phone },
    })) as Barber | undefined;

    return barber;
  }

  public async findInstagram(instagram: string): Promise<Barber | undefined> {
    const barber = (await prisma.barber.findFirst({
      where: { instagram },
    })) as Barber | undefined;

    return barber;
  }
}
