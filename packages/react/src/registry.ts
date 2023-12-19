import { Registry as BaseRegistry } from "@backflipjs/client";

// biome-ignore lint/suspicious/noExplicitAny: the props for a component can be any shape
export class Registry extends BaseRegistry<React.ComponentType<any>> {}
