import { injectable, inject } from "tsyringe";
import {
  IUsersRepository,
  Users,
} from "@resources/user/infra/database/entities/User";

interface IRequest {
  name: string;
  email: string;
  password: string;
  cellphone: string;
  instagram?: string;
}

@injectable()
export class CreateUserService {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  public async execute({
    name,
    email,
    cellphone,
    password,
    instagram,
  }: IRequest): Promise<Users> {
    const user = await this.usersRepository.create({
      name,
      email,
      cellphone,
      password,
      instagram,
    });

    return user;
  }
}
