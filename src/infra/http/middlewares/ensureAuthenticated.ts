import auth from "@configs/auth";
import { InvalidTokenError } from "@lib/errors";
import { Users } from "@resources/user/infra/database/entities/User";
import { Joi, CelebrateError } from "celebrate";
import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";

interface ITokenDecodeProps {
  iat: number;
  exp: number;
  user: Users;
}

export default async function EnsureAuthenticated(
  request: Request,
  _response: Response,
  next: NextFunction
): Promise<void> {
  try {
    const { authorization } = request.headers;
    const { error } = Joi.object()
      .keys({
        authorization: Joi.string().required(),
      })
      .validate({ authorization });

    if (error) {
      throw new CelebrateError(error.message, { celebrated: true });
    }

    const [bearer, token] = authorization?.split(" ") as string[];

    if (
      bearer.toLowerCase() !== "bearer" ||
      !token ||
      token.split(".").length !== 3
    ) {
      throw new InvalidTokenError(
        "The current token format is invalid. Insert a valid token."
      );
    }

    const tokenDecoded = jwt.verify(
      token,
      auth.users.token_validator
    ) as ITokenDecodeProps;

    request.user = {
      id: tokenDecoded.user.id,
    };

    return next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      throw new InvalidTokenError("This token is expired, login again.");
    }

    throw error;
  }
}
