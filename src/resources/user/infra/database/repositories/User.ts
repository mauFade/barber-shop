import { prisma } from "@configs/prisma";
import { IUser } from "@resources/user/dtos/User";
import { IUsersRepository, Users } from "../entities/User";

export class UsersRepository implements IUsersRepository {
  public async create({
    name,
    email,
    cellphone,
    password,
    instagram,
  }: IUser): Promise<Users> {
    const user = (await prisma.user.create({
      data: {
        name,
        email,
        password,
        cellphone,
        instagram,
      },
    })) as Users;

    return user;
  }
}
