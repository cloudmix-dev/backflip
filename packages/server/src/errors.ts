export class ServerError extends Error {
  constructor(
    message?: string | undefined,
    options?: ErrorOptions | undefined,
  ) {
    super(message, options);

    this.name = "ServerError";
  }
}

export class NotFoundError extends ServerError {
  constructor(
    message?: string | undefined,
    options?: ErrorOptions | undefined,
  ) {
    super(message, options);

    this.name = "NotFoundError";
  }
}

export class NotPermittedError extends ServerError {
  constructor(
    message?: string | undefined,
    options?: ErrorOptions | undefined,
  ) {
    super(message, options);

    this.name = "NotPermittedError";
  }
}
