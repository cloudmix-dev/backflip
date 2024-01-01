<script lang="ts">
  import { type RenderedComponentConfig } from "@backflipjs/client";

  import { getRegistry } from "../utils/registry.js";

  const registry = getRegistry();

  export let config: RenderedComponentConfig;
  let component = registry.get(config.component);
</script>

{#if component}
  <svelte:component this={component} {...config.props}>
    {#if config.children}
      {#each config.children as child}
        <svelte:self config={child} />
      {/each}
    {/if}
  </svelte:component>
{/if}
