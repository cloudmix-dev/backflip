import {
  Client,
  ClientError,
  type ClientOptions,
  type ClientSendOptions,
  type RenderedComponentConfig,
} from "@backflipjs/client";

import { Provider, type ProviderProps } from "./components/provider";
import {
  RenderComponent,
  type RenderContentProps,
} from "./components/render-component";
import { Slot, type SlotProps } from "./components/slot";
import { Registry } from "./registry";

export {
  Client,
  ClientError,
  Provider,
  Registry,
  RenderComponent,
  Slot,
  type ClientOptions,
  type ClientSendOptions,
  type RenderedComponentConfig,
  type RenderContentProps,
  type ProviderProps,
  type SlotProps,
};
