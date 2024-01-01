<script lang="ts">
  import {
    RenderComponent,
    type RenderedComponentConfig,
  } from "@backflipjs/svelte";

  import Container from "../components/container.svelte";
  import TextSkeleton from "../components/text-skeleton.svelte";
  import ButtonSkeleton from "../components/button-skeleton.svelte";

  let DEFAULT: RenderedComponentConfig = {
    component: "Container",
    children: [
      {
        component: "Text",
        props: {
          content: "Below is a primary button",
        },
      },
      {
        component: "Button",
        props: {
          label: "Primary button",
          variant: "primary",
        },
      },
      {
        component: "DateTime",
        props: {
          date: new Date(),
          prefix: "It is now",
        },
      },
    ],
  };
</script>

<RenderComponent name="home" defaultConfig={DEFAULT}>
  <slot name="loading">
    <Container>
      <TextSkeleton />
      <ButtonSkeleton />
      <TextSkeleton />
    </Container>
  </slot>
</RenderComponent>
