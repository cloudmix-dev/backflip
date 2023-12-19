import { ClientError } from "./errors";

export interface ComponentDefinition {
  name: string;
}

// biome-ignore lint/suspicious/noExplicitAny: the component type could be from any framework
export class Registry<C = any> {
  readonly #componentMap = new Map<
    string,
    { component: C; def: ComponentDefinition }
  >();

  #devMode = false;

  public registerComponent(component: C, def: ComponentDefinition) {
    if (this.#componentMap.has(def.name)) {
      throw new ClientError(`Component '${def.name}' already registered`);
    }

    this.#componentMap.set(def.name, { component, def });
  }

  public get(name: string) {
    const component = this.#componentMap.get(name)?.component;

    if (!component && this.#devMode) {
      console.warn(
        `Component '${name}' not found in registry - this will result in a null render`,
      );
    }

    return component ?? null;
  }

  public setDevMode(devMode: boolean) {
    this.#devMode = devMode;
  }
}
