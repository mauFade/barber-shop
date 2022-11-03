import { IUser } from "../../../dtos/User";

export class Users {
  public id: string;
  public name: string;
  public email: string;
  public cellphone: string;
  public password: string;
  public instagram: string | null;

  public created_at: Date;
  public updated_at: Date | null;
  public deleted_at: Date | null;
  public deleted_count: number | null;
}

export interface IUsersRepository {
  create(user: IUser): Promise<Users>;
}
