export class ClientError extends Error {
  constructor(
    message?: string | undefined,
    options?: ErrorOptions | undefined,
  ) {
    super(message, options);

    this.name = "ClientError";
  }
}
