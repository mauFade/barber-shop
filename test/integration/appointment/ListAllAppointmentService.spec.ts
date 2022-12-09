import { AppointmentRepository } from "@resources/appointment/infra/database/repositories/Appointment";
import { ListAllAppointmentService } from "@resources/appointment/services/ListAllAppointmentService";
import { BarberRepository } from "@resources/barber/infra/database/repositories/Barber";
import { UsersRepository } from "@resources/user/infra/database/repositories/User";

let usersRepository: UsersRepository;
let barbersRepository: BarberRepository;
let appointmentsRepository: AppointmentRepository;

let listAppointmentsService: ListAllAppointmentService;

describe("ListAllAppointmentService", () => {
  beforeEach(async () => {
    usersRepository = new UsersRepository();
    barbersRepository = new BarberRepository();
    appointmentsRepository = new AppointmentRepository();

    listAppointmentsService = new ListAllAppointmentService(
      appointmentsRepository,
      usersRepository,
      barbersRepository
    );
  });

  it("Should list all appointments", async () => {
    const data = await listAppointmentsService.execute();

    expect(data).not.toBeUndefined();
    expect(data.length).toBeGreaterThanOrEqual(0);
  });
});
