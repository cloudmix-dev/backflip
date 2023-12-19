export interface ServerContext<
  C extends Record<string, unknown>,
  I extends Record<string, unknown> | null = null,
> {
  readonly req: Request;
  readonly resHeaders: Headers;
  readonly ctx: C;
  readonly input: I;
}
