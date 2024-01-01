<script>
  import { setClient, setRegistry } from "@backflipjs/svelte";

  import { client, registry } from "../backflip/client.js";
  import "../global.css";

  setClient(client);
  setRegistry(registry);
</script>

<slot />
