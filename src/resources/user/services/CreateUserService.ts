import { injectable, inject } from "tsyringe";
import { IUsersRepository } from "@resources/user/infra/database/entities/User";
import { AlreadyExistsError } from "@lib/errors";
import { IEncryptAdapter } from "@lib/adapters/models/IEncryptAdapter";

interface IRequest {
  name: string;
  email: string;
  password: string;
  cellphone: string;
  instagram?: string;
}

interface IResponse {
  id: string;
  name: string;
  email: string;
  cellphone: string;
  instagram: string | null;
  created_at: Date;
}

@injectable()
export class CreateUserService {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
    @inject("EncryptAdapter")
    private encryptAdapter: IEncryptAdapter
  ) {}

  public async execute({
    name,
    email,
    cellphone,
    password,
    instagram,
  }: IRequest): Promise<IResponse> {
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

    const hash = await this.encryptAdapter.create(password);

    const user = await this.usersRepository.create({
      name,
      email,
      cellphone,
      password: hash,
      instagram,
    });

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      cellphone: user.cellphone,
      instagram: user.instagram,
      created_at: user.created_at,
    };
  }
}
