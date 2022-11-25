import auth from "@configs/auth";
import { IEncryptAdapter } from "@lib/adapters/models/IEncryptAdapter";
import { AuthenticateError, NotFoundError } from "@lib/errors";
import jwt from "jsonwebtoken";
import { inject, injectable } from "tsyringe";
import { IUsersRepository } from "../infra/database/entities/User";

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  name: string;
  email: string;
  phone: string;
  id: string;
  token: string;
}

@injectable()
export class AuthenticateService {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
    @inject("EncryptAdapter")
    private encryptAdapter: IEncryptAdapter
  ) {}

  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new NotFoundError("User not found.");
    }

    if (password !== user.password) {
      throw new AuthenticateError("Invalid password.");
    }

    user.last_login = new Date();

    await this.usersRepository.save(user);

    const tokenValidator = await this.encryptAdapter.create(
      auth.users.token_validator
    );

    const output = {
      name: user.name,
      email: user.email,
      phone: user.cellphone,
      id: user.id,
      token: jwt.sign(
        {
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
          },
          tokenValidator,
        },
        auth.users.secretKey,
        {
          expiresIn: auth.users.expiresIn,
        }
      ),
    } as IResponse;

    return output;
  }
}
