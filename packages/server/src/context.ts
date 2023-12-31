import { SuperJSONObject } from "./types";

export interface ServerContext<
  C extends SuperJSONObject = SuperJSONObject,
  I extends SuperJSONObject = SuperJSONObject,
> {
  readonly req: Request;
  readonly resHeaders: Headers;
  readonly ctx: C;
  readonly input: I;
}
