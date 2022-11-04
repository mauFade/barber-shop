import { Appointment } from "@resources/appointment/infra/database/entities/Appointment";
import { IBarber } from "@resources/barber/dtos/Barber";

export class Barber {
  public id: string;
  public name: string;
  public email: string;
  public cellphone: string;
  public password: string;
  public instagram: string | null;

  public appointments: Appointment[];

  public created_at: Date;
  public updated_at: Date | null;
  public deleted_at: Date | null;
  public deleted_count: number | null;
}

export interface IBarberRepository {
  create(data: IBarber): Promise<Barber>;
}
