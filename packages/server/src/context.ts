import { SuperJSONObject } from "./types";

export interface ServerContext<C extends Record<string, unknown>> {
  readonly req: Request;
  readonly resHeaders: Headers;
  readonly ctx: C;
  readonly input: SuperJSONObject | null;
}
