import {
  Barber,
  IBarberRepository,
} from "@resources/barber/infra/database/entities/Barber";
import { IUsersRepository } from "@resources/user/infra/database/entities/User";
import { inject, injectable } from "tsyringe";
import { IAppointRepository } from "../infra/database/entities/Appointment";

interface IBarber {
  id: string;
  name: string;
  instagram: string | null;
  cellphone: string;
}

interface IUser {
  id: string;
  name: string;
  email: string;
  instagram: string | null;
  cellphone: string;
}

interface IResponse {
  id: string;
  time: Date;
  price: number;
  type: string;
  created_at: Date;
  user: IUser;
  barber: IBarber;
}
@injectable()
export class ListAllAppointmentService {
  constructor(
    @inject("AppointmentRepository")
    private appointmentsRepository: IAppointRepository,
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
    @inject("BarberRepository")
    private barbersRepository: IBarberRepository
  ) {}

  public async execute(): Promise<Array<IResponse>> {
    const appointments = await this.appointmentsRepository.find();

    const filteredAppointments = appointments.filter((appointment) => {
      return appointment.deleted_at === null;
    });

    const output = await Promise.all(
      filteredAppointments.map(async (item) => {
        const user = await this.usersRepository.findbyId(item.customer_id);
        const barber = (await this.barbersRepository.findById(
          item.barber_id
        )) as Barber;

        return {
          id: item.id,
          price: item.price,
          time: item.time,
          type: item.type,
          created_at: item.created_at,
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
            cellphone: user.cellphone,
            instagram: user.instagram,
          },
          barber: {
            id: barber.id,
            name: barber.name,
            instagram: barber.instagram,
            cellphone: barber.cellphone,
          },
        };
      })
    );

    return output;
  }
}
