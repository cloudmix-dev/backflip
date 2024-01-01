import { Registry as BaseRegistry } from "@backflipjs/client";
import { type ComponentType, getContext, setContext } from "svelte";

export class Registry extends BaseRegistry<ComponentType> {}

const REGISTRY =
  typeof Symbol !== "undefined" ? Symbol("registry") : "@@registry";

export function getRegistry(): Registry {
  const registry = getContext<Registry | null>(REGISTRY);

  if (!registry) {
    throw new Error(
      "Registry has not been set - call setRegistry(new Registry({ ... })) to define it",
    );
  }

  return registry as Registry;
}

export function setRegistry(registry: Registry): void {
  setContext(REGISTRY, registry);
}
