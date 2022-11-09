import { IAppointment } from "@resources/appointment/dtos/Appointment";

export class Appointment {
  public id: string;
  public customer_id: string;
  public barber_id: string;
  public time: Date;
  public price: number;
  public type: string;

  public created_at: Date;
  public deleted_at: Date | null;
}

export interface IAppointRepository {
  create(data: IAppointment): Promise<Appointment>;
  find(): Promise<Appointment[]>;
}
