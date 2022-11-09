import { IAppointment } from "@resources/appointment/dtos/Appointment";
// import { Barber } from "@resources/barber/infra/database/entities/Barber";
// import { Users } from "@resources/user/infra/database/entities/User";

export class Appointment {
  public id: string;
  public customer_id: string;
  public barber_id: string;
  public time: Date;
  public price: number;
  public type: string;

  // public barber: Barber;
  // public user: Users;

  public created_at: Date;
  public deleted_at: Date | null;
}

export interface IAppointRepository {
  create(data: IAppointment): Promise<Appointment>;
}
