import { Appointment } from "@resources/appointment/infra/database/entities/Appointment";
import { IUser } from "@resources/user/dtos/User";

export class Users {
  public id: string;
  public name: string;
  public email: string;
  public cellphone: string;
  public password: string;
  public instagram: string | null;
  public last_login: Date | null;

  public appointments: Appointment[];

  public created_at: Date;
  public updated_at: Date | null;
  public deleted_at: Date | null;
  public deleted_count: number | null;
}

export interface IUsersRepository {
  create(user: IUser): Promise<Users>;
  findbyId(id: string): Promise<Users>;
  save(user: Users): Promise<Users>;
  findByEmail(email: string): Promise<Users | undefined>;
  findByCellphone(phone: string): Promise<Users | undefined>;
  findByInstagram(instagram: string): Promise<Users | undefined>;
}
