import { BadRequestError, NotFoundError } from "@lib/errors";
import { inject, injectable } from "tsyringe";
import { IAppointRepository } from "../infra/database/entities/Appointment";

@injectable()
export class SoftDeleteAppointmentService {
  constructor(
    @inject("AppointmentRepository")
    private appointmentsRepository: IAppointRepository
  ) {}

  public async execute(appointmentId: string): Promise<void> {
    if (!appointmentId) {
      throw new BadRequestError("Appointment id is required for this action.");
    }

    const appointment = await this.appointmentsRepository.findById(
      appointmentId
    );

    if (!appointment || appointment.deleted_at !== null) {
      throw new NotFoundError("Appointment not found or already deleted.");
    }

    appointment.deleted_at = new Date();

    await this.appointmentsRepository.save(appointment);
  }
}
