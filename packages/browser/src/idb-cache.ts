import {
  Cache as BaseCache,
  type RenderedComponentConfig,
} from "@backflipjs/client";
import { type IDBPDatabase, openDB } from "idb";

export class IDBCache extends BaseCache {
  readonly #dbName = "backflip";

  readonly #storeName = "cache";

  readonly #ttlStoreName = "ttl";

  #idb: IDBPDatabase | null = null;

  async #getDb() {
    if (this.#idb) {
      return this.#idb;
    }

    this.#idb = await openDB(this.#dbName, 1, {
      upgrade: (database, _, newVersion) => {
        if (newVersion === 1) {
          database.createObjectStore(this.#storeName);
          database.createObjectStore(this.#ttlStoreName);
        }
      },
    });

    return this.#idb;
  }

  async get(key: string) {
    const memoryValue = super.get(key);

    if (memoryValue) {
      return memoryValue;
    }

    const db = await this.#getDb();
    const tx = db.transaction(
      [this.#storeName, this.#ttlStoreName],
      "readonly",
    );
    const store = tx.objectStore(this.#storeName);
    const value = await store.get(key);

    console.log("CACHED", key, value);

    if (value) {
      const ttlStore = tx.objectStore(this.#ttlStoreName);
      const ttl = await ttlStore.get(key);

      if (ttl && ttl <= Date.now()) {
        await this.delete(key);

        return null;
      }
    }

    await tx.done;

    return (value as RenderedComponentConfig | null) ?? null;
  }

  async set(key: string, value: RenderedComponentConfig, ttl?: number) {
    await super.set(key, value, ttl);

    const db = await this.#getDb();
    const tx = db.transaction(
      [this.#storeName, this.#ttlStoreName],
      "readwrite",
    );
    const store = tx.objectStore(this.#storeName);

    await store.put(value, key);

    if (ttl) {
      const ttlStore = tx.objectStore(this.#ttlStoreName);

      await ttlStore.put(Date.now() + ttl * 1000, key);
    }

    await tx.done;
  }

  async delete(key: string) {
    await super.delete(key);

    const db = await this.#getDb();
    const tx = db.transaction(
      [this.#storeName, this.#ttlStoreName],
      "readwrite",
    );
    const store = tx.objectStore(this.#storeName);
    const ttlStore = tx.objectStore(this.#ttlStoreName);

    await store.delete(key);
    await ttlStore.delete(key);
    await tx.done;
  }
}
