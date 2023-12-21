import { type RenderedComponentConfig } from "@backflipjs/server";
import superjson from "superjson";

import { Cache } from "./cache";
import { ClientError } from "./errors";
import { parseCacheControl } from "./utils";

type GlobalFetch = typeof globalThis.fetch;

export interface ClientSendOptions {
  signal?: AbortSignal;
}

export interface ClientOptions {
  cache?: boolean | Cache;
  context?:
    | Record<string, unknown>
    | (() => Record<string, unknown> | Promise<Record<string, unknown>>);
  fetch?: GlobalFetch;
  onBeforeRequest?: (req: Request) => Request | Promise<Request>;
  onAfterResponse?: (res: Response) => Response | Promise<Response>;
  url: string | URL;
}

export class Client {
  readonly #cache: Cache | null = null;

  readonly #fetch: GlobalFetch = globalThis.fetch.bind(globalThis);

  readonly #url: URL;

  readonly #options: ClientOptions;

  constructor(options: ClientOptions) {
    this.#fetch = options.fetch ?? this.#fetch;
    this.#url = this.#sanitizeUrl(options.url);
    this.#options = options;

    if (options.cache) {
      this.#cache =
        options.cache instanceof Cache ? options.cache : new Cache();
    }
  }

  #sanitizeUrl(url: string | URL) {
    if (
      typeof window !== "undefined" &&
      typeof url === "string" &&
      url.startsWith("/")
    ) {
      return new URL(url, window.location.origin);
    }

    return new URL(url);
  }

  #createCacheKey(path: string, data?: Record<string, unknown>) {
    const dataKey = data
      ? JSON.stringify(
          Object.entries(data).sort(([a], [b]) => a.localeCompare(b)),
        )
      : "null";

    return `${path}#${dataKey}`;
  }

  async send(
    path: string,
    data?: Record<string, unknown>,
    options?: ClientSendOptions,
  ) {
    const url = new URL(`${this.#url.pathname}/${path}`, this.#url);

    if (this.#cache) {
      const cached = await this.#cache.get(this.#createCacheKey(path, data));

      if (cached) {
        return cached;
      }
    }

    if (data) {
      url.searchParams.set("data", superjson.stringify(data));
    }

    if (this.#options.context) {
      let context = this.#options.context;

      if (typeof context === "function") {
        context = await context();
      }

      if (context) {
        url.searchParams.set("context", superjson.stringify(context));
      }
    }

    let req = new Request(url.toString(), {
      headers: {
        accept: "application/json",
        "content-type": "application/json",
      },
    });

    if (typeof this.#options.onBeforeRequest === "function") {
      req = await this.#options.onBeforeRequest(req);
    }

    let res = await this.#fetch(req, { signal: options?.signal });

    if (!res.ok) {
      throw new ClientError(
        `Failed to send to '${path}' - ${res.status} ${res.statusText}`,
      );
    }

    if (typeof this.#options.onAfterResponse === "function") {
      res = await this.#options.onAfterResponse(res);
    }

    const json = superjson.parse(await res.text()) as RenderedComponentConfig;

    if (this.#cache) {
      const cacheControl = res.headers.get("cache-control");
      const maxAge = cacheControl ? parseCacheControl(cacheControl) : 0;

      this.#cache.set(this.#createCacheKey(path, data), json, maxAge);
    }

    return json;
  }
}
