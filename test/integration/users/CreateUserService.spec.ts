import "reflect-metadata";
import {
  IUsersRepository,
  Users,
} from "@resources/user/infra/database/entities/User";
import { CreateUserService } from "@resources/user/services/CreateUserService";
import { UsersRepository } from "@resources/user/infra/database/repositories/User";
import { DeleteUserService } from "@resources/user/services/DeleteUserService";
import { IEncryptAdapter } from "@lib/adapters/models/IEncryptAdapter";
import { BCryptAdapter } from "@lib/adapters/models/implementations/BCryptAdapter";

let createUserService: CreateUserService;
let deleteUsersService: DeleteUserService;
let encryptAdapter: IEncryptAdapter;

let usersRepository: IUsersRepository;

let user: Users;

describe("CreateUserService", () => {
  beforeEach(async () => {
    usersRepository = new UsersRepository();
    encryptAdapter = new BCryptAdapter();

    createUserService = new CreateUserService(usersRepository, encryptAdapter);
  });

  afterEach(async () => {
    usersRepository = new UsersRepository();

    deleteUsersService = new DeleteUserService(usersRepository);

    await deleteUsersService.execute(user.id);
  });

  it("Should create a user", async () => {
    user = await createUserService.execute({
      name: "Test",
      email: "test@email.com",
      cellphone: "4199999992",
      password: "test123",
      instagram: "test123",
    });

    expect(user.id).not.toBeUndefined();
    expect(user.name).toEqual("Test");
    expect(user.email).toEqual("test@email.com");
  });

  it("Should throw error if try to use a email witch is already in use", async () => {
    user = await createUserService.execute({
      name: "Test",
      email: "test@email.com",
      cellphone: "4199999992",
      password: "test123",
      instagram: "test123",
    });

    await expect(
      createUserService.execute({
        name: "Test",
        email: "test@email.com",
        cellphone: "4199999992",
        password: "test123",
        instagram: "test123",
      })
    ).rejects.toBeInstanceOf(Error);
  });

  it("Should throw error if try to use a cellphone witch is already in use", async () => {
    user = await createUserService.execute({
      name: "Test",
      email: "test@email.com",
      cellphone: "4199999992",
      password: "test123",
      instagram: "test123",
    });

    await expect(
      createUserService.execute({
        name: "Test",
        email: "test123@email.com",
        cellphone: "4199999992",
        password: "test123",
        instagram: "test123",
      })
    ).rejects.toBeInstanceOf(Error);
  });

  it("Should throw error if try to use a instagram witch is already in use", async () => {
    user = await createUserService.execute({
      name: "Test",
      email: "test@email.com",
      cellphone: "4199999992",
      password: "test123",
      instagram: "test123",
    });

    await expect(
      createUserService.execute({
        name: "Test",
        email: "test123@email.com",
        cellphone: "4199999991",
        password: "test123",
        instagram: "test123",
      })
    ).rejects.toBeInstanceOf(Error);
  });
});
