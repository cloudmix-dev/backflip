import { IDBCache } from "@backflipjs/browser";
import { Client, Registry } from "@backflipjs/svelte";

import Button from "../components/button.svelte";
import Container from "../components/container.svelte";
import DateTime from "../components/date-time.svelte";
import Text from "../components/text.svelte";

const registry = new Registry();

registry.registerComponent(Button, { name: "Button" });
registry.registerComponent(Container, { name: "Container" });
registry.registerComponent(DateTime, { name: "DateTime" });
registry.registerComponent(Text, { name: "Text" });

const client = new Client({
  url: "/api/components",
  cache: new IDBCache(),
  context: () => ({
    locale: Intl.DateTimeFormat().resolvedOptions().locale,
  }),
});

export { registry, client };
