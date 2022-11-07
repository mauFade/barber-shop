import "reflect-metadata";
import { Users } from "../../../src/resources/user/infra/database/entities/User";
import { CreateUserService } from "../../../src/resources/user/services/CreateUserService";
import { container } from "tsyringe";
import { test, expect, describe } from "vitest";

test("users", () => {
  describe("Create users", async () => {
    const userService = await container.resolve(CreateUserService);

    const user = await userService.execute({
      name: "Test",
      email: "test@email.com",
      cellphone: "4199999999",
      password: "test123",
      instagram: "test",
    });

    expect(user.name).toEqual("Test");
    expect(user).toBeInstanceOf(Users);
  });
});
