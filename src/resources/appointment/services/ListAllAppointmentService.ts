import { inject, injectable } from "tsyringe";
import {
  Appointment,
  IAppointRepository,
} from "../infra/database/entities/Appointment";

@injectable()
export class ListAllAppointmentService {
  constructor(
    @inject("AppointmentRepository")
    private appointmentsRepository: IAppointRepository
  ) {}

  public async execute(): Promise<Appointment[]> {
    const appointments = await this.appointmentsRepository.find();

    return appointments;
  }
}
