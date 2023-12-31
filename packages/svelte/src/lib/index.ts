import {
  Client,
  ClientError,
  type ClientOptions,
  type ClientSendOptions,
  type RenderedComponentConfig,
} from "@backflipjs/client";

import { getClient, setClient } from "./client.js";
import { Registry, getRegistry, setRegistry } from "./registry.js";

export {
  Client,
  ClientError,
  Registry,
  getClient,
  getRegistry,
  setClient,
  setRegistry,
  type ClientOptions,
  type ClientSendOptions,
  type RenderedComponentConfig,
};
