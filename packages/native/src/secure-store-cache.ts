import {
  Cache as BaseCache,
  type RenderedComponentConfig,
} from "@backflipjs/client";
import * as SecureStore from "expo-secure-store";

export class SecureStoreCache extends BaseCache {
  #sanitizeKey(key: string) {
    return key.replace(/(#|,|"|\[|\])/g, "_");
  }

  public async get(key: string) {
    const memoryValue = super.get(key);

    if (memoryValue) {
      return memoryValue;
    }

    const value =
      (await SecureStore.getItemAsync(this.#sanitizeKey(key))) ?? null;

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

    await SecureStore.setItemAsync(
      this.#sanitizeKey(key),
      JSON.stringify({
        value,
        ttl: ttl ? Date.now() + ttl * 1000 : null,
      }),
    );
  }

  public async delete(key: string) {
    await super.delete(key);

    await SecureStore.deleteItemAsync(this.#sanitizeKey(key));
  }
}
