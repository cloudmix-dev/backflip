<script lang="ts">
  import {
    type SuperJSONObject,
    type RenderedComponentConfig,
  } from "@backflipjs/client";
  import { onMount } from "svelte";

  import { getComponentData } from "../utils/component-data.js";
  import RenderBlock from "./render-block.svelte";

  export let name: string;
  export let input: SuperJSONObject | undefined = undefined;
  export let defaultConfig: RenderedComponentConfig | undefined = undefined;
  let promise: Promise<RenderedComponentConfig | Error | null>;

  onMount(() => {
    if (typeof window !== "undefined") {
      promise = getComponentData(name, input);
    }
  });
</script>

{#await promise}
  <slot name="loading" />
{:then result}
  {#if result instanceof Error}
    <slot name="error" />
  {:else if result === null}
    {#if defaultConfig}
      <RenderBlock config={defaultConfig} />
    {:else}
      <slot name="fallback" />
    {/if}
    <slot name="fallback" />
  {:else}
    <RenderBlock config={result} />
  {/if}
{:catch}
  <slot name="error" />
{/await}
