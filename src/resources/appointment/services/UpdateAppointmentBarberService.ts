import { BadRequestError, NotFoundError } from "@lib/errors";
import { IBarberRepository } from "@resources/barber/infra/database/entities/Barber";
import { inject, injectable } from "tsyringe";
import {
  Appointment,
  IAppointRepository,
} from "../infra/database/entities/Appointment";

interface IRequest {
  appointmentId: string;
  newBarberId: string;
}

@injectable()
export class UpdateAppointmentBarberService {
  constructor(
    @inject("BarberRepository")
    private barbersRepository: IBarberRepository,
    @inject("AppointmentRepository")
    private appointmentsRepository: IAppointRepository
  ) {}

  public async execute({
    appointmentId,
    newBarberId,
  }: IRequest): Promise<Appointment> {
    if (!appointmentId || !newBarberId) {
      throw new BadRequestError("Missing appointment or barber id.");
    }

    const appointment = await this.appointmentsRepository.findById(
      appointmentId
    );

    if (!appointment) {
      throw new NotFoundError("Appointment not found.");
    }

    const newBarber = await this.barbersRepository.findById(newBarberId);

    if (!newBarber) {
      throw new NotFoundError("Barber not found.");
    }

    appointment.barber_id = newBarber.id;

    await this.appointmentsRepository.save(appointment);

    return appointment;
  }
}
