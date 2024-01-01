import {
  Client,
  ClientError,
  type ClientOptions,
  type ClientSendOptions,
  type RenderedComponentConfig,
} from "@backflipjs/client";

import RenderComponent from "./components/render-component.svelte";
import { setClient } from "./utils/client.js";
import { Registry } from "./utils/registry.js";
import { setRegistry } from "./utils/registry.js";

export {
  Client,
  ClientError,
  Registry,
  RenderComponent,
  setClient,
  setRegistry,
  type ClientOptions,
  type ClientSendOptions,
  type RenderedComponentConfig,
};
