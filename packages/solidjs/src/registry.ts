import { Registry as BaseRegistry } from "@backflipjs/client";
import { type JSX } from "solid-js";

// biome-ignore lint/suspicious/noExplicitAny: the component type could have any props
type Component<P = any> = (props: P) => JSX.Element;

export class Registry extends BaseRegistry<Component> {}
