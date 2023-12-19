import {
  Cache as BaseCache,
  type RenderedComponentConfig,
} from "@backflipjs/client";

export class LocalStorageCache extends BaseCache {
  public async get(key: string) {
    const memoryValue = super.get(key);

    if (memoryValue) {
      return memoryValue;
    }

    const value = window.localStorage.getItem(key) ?? null;

    if (value) {
      const { value: cacheValue, ttl } = JSON.parse(value) as {
        value: RenderedComponentConfig;
        ttl: number | null;
      };

      if (ttl && ttl <= Date.now()) {
        window.localStorage.removeItem(key);

        return null;
      }

      return cacheValue;
    }

    return null;
  }

  public async set(key: string, value: RenderedComponentConfig, ttl?: number) {
    await super.set(key, value, ttl);

    window.localStorage.setItem(
      key,
      JSON.stringify({
        value,
        ttl: ttl ? Date.now() + ttl * 1000 : null,
      }),
    );
  }

  public async delete(key: string) {
    await super.delete(key);

    window.localStorage.removeItem(key);
  }
}
