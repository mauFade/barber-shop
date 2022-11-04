import { NotAuthorizedError } from "@lib/errors";
import { UsersRepository } from "@resources/user/infra/database/repositories/User";
import { NextFunction, Request, Response } from "express";

export default async function ensureAllowed(
  request: Request,
  _response: Response,
  next: NextFunction
): Promise<void> {
  const { id } = request.user;

  const usersRepository = new UsersRepository();

  const user = await usersRepository.findbyId(id);

  if (!user) {
    throw new NotAuthorizedError(
      "This user is not allowed to access areas that require login."
    );
  }

  return next();
}
