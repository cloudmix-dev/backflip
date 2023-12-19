import { type RenderedComponentConfig } from "@backflipjs/server";

export class Cache {
  readonly #cache = new Map<string, RenderedComponentConfig>();

  readonly #ttl = new Map<string, number>();

  public async get(key: string) {
    const value = this.#cache.get(key) ?? null;

    if (value && this.#ttl.has(key)) {
      const ttl = this.#ttl.get(key);

      if (ttl && ttl <= Date.now()) {
        this.#cache.delete(key);
        this.#ttl.delete(key);

        return null;
      }
    }

    return value;
  }

  public async set(key: string, value: RenderedComponentConfig, ttl?: number) {
    this.#cache.set(key, value);

    if (ttl) {
      this.#ttl.set(key, Date.now() + ttl * 1000);
    }
  }

  public async delete(key: string) {
    this.#cache.delete(key);
    this.#ttl.delete(key);
  }
}
