import { NotFoundError, UnnavailableOperationError } from "@lib/errors";
import { IBarberRepository } from "@resources/barber/infra/database/entities/Barber";
import { inject, injectable } from "tsyringe";
import {
  Appointment,
  IAppointRepository,
} from "../infra/database/entities/Appointment";

interface IRequest {
  barberId: string;
  userId: string;
  time: string;
  price: number;
  type: string;
}

@injectable()
export class CreateAppointmentService {
  constructor(
    @inject("BarberRepository")
    private barbersRepository: IBarberRepository,
    @inject("AppointmentRepository")
    private appointmentsRepository: IAppointRepository
  ) {}

  public async execute({
    barberId,
    price,
    time,
    type,
    userId,
  }: IRequest): Promise<Appointment> {
    const barber = await this.barbersRepository.findById(barberId);

    if (!barber) {
      throw new NotFoundError("Barber not found.");
    }

    if (!barber.specialty.includes(type)) {
      throw new UnnavailableOperationError(
        "This barber does not have this specialty. Select another haircut type or barber."
      );
    }

    const appointment = await this.appointmentsRepository.create({
      barber_id: barberId,
      customer_id: userId,
      price,
      time: new Date(time),
      type,
    });

    return appointment;
  }
}
