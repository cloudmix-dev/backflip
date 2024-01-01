<script lang="ts">
  import Text from "./text.svelte";

  export let date: Date;
  export let prefix: string | undefined;

  let text = `${
    prefix ? `${prefix} ` : ""
  }${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
</script>

<Text content={text} />
