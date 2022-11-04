import { IUsersRepository } from "../../resources/user/infra/database/entities/User";
import { UsersRepository } from "../../resources/user/infra/database/repositories/User";
import { container } from "tsyringe";
import { IBarberRepository } from "@resources/barber/infra/database/entities/Barber";
import { BarberRepository } from "@resources/barber/infra/database/repositories/Barber";

container.registerSingleton<IUsersRepository>(
  "UsersRepository",
  UsersRepository
);

container.registerSingleton<IBarberRepository>(
  "BarberRepository",
  BarberRepository
);
