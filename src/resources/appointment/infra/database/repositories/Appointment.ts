import { prisma } from "@configs/prisma";
import { IAppointment } from "@resources/appointment/dtos/Appointment";
import { Appointment, IAppointRepository } from "../entities/Appointment";

export class AppointmentRepository implements IAppointRepository {
  public async create({
    barber_id,
    customer_id,
    price,
    time,
    type,
  }: IAppointment): Promise<Appointment> {
    const appointment = (await prisma.appointment.create({
      data: {
        customer_id,
        barber_id,
        price,
        time,
        type,
      },
    })) as Appointment;

    return appointment;
  }

  public async find(): Promise<Appointment[]> {
    const appointments = (await prisma.appointment.findMany({
      include: {
        barber: true,
        user: true,
      },
    })) as Appointment[];

    return appointments;
  }

  public async findById(
    appointmentId: string
  ): Promise<Appointment | undefined> {
    const appointment = (await prisma.appointment.findFirst({
      where: { id: appointmentId },
    })) as Appointment | undefined;

    return appointment;
  }

  public async save({
    barber_id,
    id,
    price,
    time,
    type,
    deleted_at,
  }: Appointment): Promise<Appointment> {
    const appointment = (await prisma.appointment.update({
      where: { id },
      data: {
        barber_id,
        price,
        time,
        type,
        deleted_at,
      },
    })) as Appointment;

    return appointment;
  }
}
