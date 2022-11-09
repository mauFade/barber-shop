import { IUsersRepository } from "../../resources/user/infra/database/entities/User";
import { UsersRepository } from "../../resources/user/infra/database/repositories/User";
import { container } from "tsyringe";
import { IBarberRepository } from "@resources/barber/infra/database/entities/Barber";
import { BarberRepository } from "@resources/barber/infra/database/repositories/Barber";
import { IEncryptAdapter } from "./models/IEncryptAdapter";
import { BCryptAdapter } from "./models/implementations/BCryptAdapter";
import { IAppointRepository } from "@resources/appointment/infra/database/entities/Appointment";
import { AppointmentRepository } from "@resources/appointment/infra/database/repositories/Appointment";

container.registerSingleton<IEncryptAdapter>("EncryptAdapter", BCryptAdapter);

container.registerSingleton<IUsersRepository>(
  "UsersRepository",
  UsersRepository
);

container.registerSingleton<IBarberRepository>(
  "BarberRepository",
  BarberRepository
);

container.registerSingleton<IAppointRepository>(
  "AppointmentRepository",
  AppointmentRepository
);
