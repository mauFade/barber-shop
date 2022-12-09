import "reflect-metadata";
import {
  IUsersRepository,
  Users,
} from "@resources/user/infra/database/entities/User";
import { CreateUserService } from "@resources/user/services/CreateUserService";
import { UsersRepository } from "@resources/user/infra/database/repositories/User";
import { DeleteUserService } from "@resources/user/services/DeleteUserService";
import { AuthenticateService } from "@resources/user/services/AuthenticateService";
import { IEncryptAdapter } from "@lib/adapters/models/IEncryptAdapter";
import { BCryptAdapter } from "@lib/adapters/models/implementations/BCryptAdapter";

let createUserService: CreateUserService;
let deleteUsersService: DeleteUserService;
let authenticateUserService: AuthenticateService;
let encryptAdapter: IEncryptAdapter;

let usersRepository: IUsersRepository;

let user: Users;

describe("AuthenticateUserService", () => {
  beforeAll(async () => {
    usersRepository = new UsersRepository();

    createUserService = new CreateUserService(usersRepository, encryptAdapter);

    user = await createUserService.execute({
      name: "Test",
      email: "test@email.com",
      cellphone: "4199999992",
      password: "test123",
      instagram: "test123",
    });
  });

  beforeEach(async () => {
    usersRepository = new UsersRepository();
    encryptAdapter = new BCryptAdapter();

    createUserService = new CreateUserService(usersRepository, encryptAdapter);
    authenticateUserService = new AuthenticateService(
      usersRepository,
      encryptAdapter
    );
  });

  afterAll(async () => {
    usersRepository = new UsersRepository();

    deleteUsersService = new DeleteUserService(usersRepository);

    await deleteUsersService.execute(user.id);
  });

  it("Should resolve authentication", async () => {
    const data = await authenticateUserService.execute({
      email: "test@email.com",
      password: "test123",
    });

    expect(data.token).not.toBeUndefined();
    expect(data.token.length).toBeGreaterThan(5);
    expect(data.email).toEqual("test@email.com");
  });

  it("Should throw error due to invalid email", async () => {
    await expect(
      authenticateUserService.execute({
        email: "tes@email.com",
        password: "test123",
      })
    ).rejects.toBeInstanceOf(Error);
  });

  it("Should throw error due to invalid password", async () => {
    await expect(
      authenticateUserService.execute({
        email: "test@email.com",
        password: "test",
      })
    ).rejects.toBeInstanceOf(Error);
  });
});
