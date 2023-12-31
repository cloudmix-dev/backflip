import superjson from "superjson";

import { type ServerContext } from "./context";
import { NotFoundError, NotPermittedError, ServerError } from "./errors";
import { type RenderedComponentConfig, type SuperJSONObject } from "./types";

export interface ServerOptions<
  C extends Record<string, unknown> = Record<string, unknown>,
  RC extends Record<string, unknown> = Record<string, unknown>,
> {
  context?: C | ((req: Request, reqCtx: RC) => C | Promise<C>);
  permitRequest?: (req: Request) => boolean | Promise<boolean>;
  onError?: (error: Error) => Response | Promise<Response>;
}

export type ScreenRequestHandler<
  C extends Record<string, unknown> = Record<string, unknown>,
> = (
  ctx: ServerContext<C>,
) => RenderedComponentConfig | Promise<RenderedComponentConfig>;

export class Server<
  C extends Record<string, unknown> = Record<string, unknown>,
> {
  readonly #componentMap = new Map<string, ScreenRequestHandler<C>>();

  readonly #options: ServerOptions<C>;

  constructor(readonly options: ServerOptions<C> = {}) {
    this.#options = options;
  }

  component(path: string, handler: ScreenRequestHandler<C>) {
    if (this.#componentMap.has(path)) {
      throw new ServerError(`Component '${path}' already registered`);
    }

    this.#componentMap.set(path, handler);

    return this;
  }

  async fetch(req: Request) {
    try {
      if (typeof this.#options.permitRequest === "function") {
        const permit = this.#options.permitRequest(req);

        if (!permit) {
          throw new NotPermittedError();
        }
      }

      const url = new URL(req.url);
      const parts = url.pathname.split("/").filter(Boolean);
      const component = parts[parts.length - 1];

      if (!component || !this.#componentMap.has(component)) {
        throw new NotFoundError();
      }

      // biome-ignore lint/style/noNonNullAssertion: we know this will be defined
      const handler = this.#componentMap.get(component)!;
      let reqCtx = {};

      if (url.searchParams.has("context")) {
        reqCtx = superjson.parse<SuperJSONObject>(
          // biome-ignore lint/style/noNonNullAssertion: we know this will be defined
          url.searchParams.get("context")!,
        );
      }

      const ctx =
        typeof this.#options.context === "function"
          ? await this.#options.context(req, reqCtx)
          : this.#options.context ?? (reqCtx as C);
      const resHeaders = new Headers();
      let input = null;

      if (url.searchParams.has("data")) {
        // biome-ignore lint/style/noNonNullAssertion: we know this will be defined
        input = superjson.parse<SuperJSONObject>(url.searchParams.get("data")!);
      }

      const rendered = await handler({
        ctx,
        req,
        resHeaders,
        input,
      });

      resHeaders.set("Content-Type", "application/json");

      return new Response(superjson.stringify(rendered), {
        headers: resHeaders,
      });
    } catch (error) {
      if (typeof this.#options.onError === "function") {
        const res = this.#options.onError(error as Error);

        if (res instanceof Response) {
          return res;
        }
      }

      if (error instanceof ServerError) {
        if (error instanceof NotFoundError) {
          return new Response(superjson.stringify({ error: "Not found" }), {
            status: 404,
            headers: {
              "Content-Type": "application/json",
            },
          });
        }

        if (error instanceof NotPermittedError) {
          return new Response(superjson.stringify({ error: "Forbidden" }), {
            status: 403,
            headers: {
              "Content-Type": "application/json",
            },
          });
        }
      }

      return new Response(
        superjson.stringify({ error: "Internal server error" }),
        {
          status: 500,
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
    }
  }
}
