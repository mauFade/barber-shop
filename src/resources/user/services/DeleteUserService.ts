import { BadRequestError, NotFoundError } from "@lib/errors";
import { inject, injectable } from "tsyringe";
import { IUsersRepository } from "../infra/database/entities/User";

@injectable()
export class DeleteUserService {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  public async execute(userId: string): Promise<void> {
    if (!userId) {
      throw new BadRequestError("User id is required.");
    }

    const user = await this.usersRepository.findbyId(userId);

    if (!user) {
      throw new NotFoundError("User not found.");
    }

    await this.usersRepository.delete(user.id);
  }
}
