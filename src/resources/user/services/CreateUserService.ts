import { injectable, inject } from "tsyringe";
import {
  IUsersRepository,
  Users,
} from "@resources/user/infra/database/entities/User";
import { AlreadyExistsError } from "@lib/errors";

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
    const emailAlreadyExists = await this.usersRepository.findByEmail(email);

    const cellphoneAlreadyExists = await this.usersRepository.findByCellphone(
      cellphone
    );

    if (emailAlreadyExists) {
      throw new AlreadyExistsError("Email already exists.");
    }

    if (cellphoneAlreadyExists) {
      throw new AlreadyExistsError("Cellphone already exists.");
    }

    if (instagram) {
      const instaAlreadyExists = await this.usersRepository.findByInstagram(
        instagram
      );

      if (instaAlreadyExists) {
        throw new AlreadyExistsError("This instagram is already in use.");
      }
    }

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
