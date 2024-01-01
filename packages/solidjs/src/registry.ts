import { Registry as BaseRegistry } from "@backflipjs/client";
import { type JSX } from "solid-js";

type Component<P = { children?: JSX.Element }> = (props: P) => JSX.Element;

export class Registry extends BaseRegistry<Component> {}
