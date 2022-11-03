import { IUsersRepository } from "../../resources/user/infra/database/entities/User";
import { UsersRepository } from "../../resources/user/infra/database/repositories/User";
import { container } from "tsyringe";

container.registerSingleton<IUsersRepository>(
  "UsersRepository",
  UsersRepository
);
