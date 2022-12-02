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

  public async findbyId(id: string): Promise<Users> {
    const user = (await prisma.user.findFirst({
      where: {
        id,
      },
    })) as Users;

    return user;
  }

  public async findByEmail(email: string): Promise<Users | undefined> {
    const user = (await prisma.user.findFirst({
      where: {
        email,
      },
    })) as Users | undefined;

    return user;
  }

  public async findByCellphone(phone: string): Promise<Users | undefined> {
    const user = (await prisma.user.findFirst({
      where: {
        cellphone: phone,
      },
    })) as Users | undefined;

    return user;
  }

  public async findByInstagram(instagram: string): Promise<Users | undefined> {
    const user = (await prisma.user.findFirst({
      where: { instagram },
    })) as Users | undefined;

    return user;
  }

  public async save({
    cellphone,
    email,
    id,
    instagram,
    name,
    password,
    last_login,
  }: Users): Promise<Users> {
    const user = (await prisma.user.update({
      where: { id },
      data: {
        cellphone,
        email,
        id,
        instagram,
        name,
        password,
        last_login,
      },
    })) as Users;

    return user;
  }

  public async delete(userId: string): Promise<void> {
    await prisma.user.delete({ where: { id: userId } });
  }
}
