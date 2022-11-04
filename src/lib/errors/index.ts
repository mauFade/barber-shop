export interface IError extends Error {
  type: string;
  message: string;
  status: number;
}

export class NotFoundError extends Error {
  public type: string;
  public status: number;
  constructor(message: string) {
    super(message);

    this.name = "NotFoundError";
    this.type = "NOT_FOUND";
    this.status = 404;
  }
}

export class NotAuthorizedError extends Error {
  public type: string;
  public status: number;
  constructor(message: string) {
    super(message);

    this.name = "NotAuthorizedError";
    this.type = "NOT_AUTHORIZED";
    this.status = 403;
  }
}

export class InvalidTokenError extends Error {
  public type: string;
  public status: number;
  constructor(message: string) {
    super(message);

    this.name = "InvalidTokenError";
    this.type = "INVALID_TOKEN";
    this.status = 401;
  }
}

export class AuthenticateError extends Error {
  public type: string;
  public status: number;
  constructor(message: string) {
    super(message);

    this.name = "AuthenticateError";
    this.type = "INVALID_CREDENTIAL";
    this.status = 401;
  }
}
