import "reflect-metadata";
import { IUsersRepository } from "../../../src/resources/user/infra/database/entities/User";
import { CreateUserService } from "../../../src/resources/user/services/CreateUserService";
import { UsersRepository } from "../../../src/resources/user/infra/database/repositories/User";

let createUserService: CreateUserService;
let usersRepository: IUsersRepository;

describe("CreateUserService", () => {
  beforeEach(async () => {
    usersRepository = new UsersRepository();

    createUserService = new CreateUserService(usersRepository);
  });

  it("Should create a user", async () => {
    const user = await createUserService.execute({
      name: "Test",
      email: "testtest@email.com",
      cellphone: "4199999992",
      password: "test123",
      instagram: "test123",
    });

    expect(user.id).not.toBeUndefined();
    expect(user.name).toEqual("Test");
  });
});
