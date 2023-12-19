import { type SuperJSON } from "superjson";

export type ExtendedJSON = Parameters<SuperJSON["serialize"]>[0];

export interface RenderedComponentConfig {
  component: string;
  props?: ExtendedJSON;
  children?: RenderedComponentConfig[];
}
