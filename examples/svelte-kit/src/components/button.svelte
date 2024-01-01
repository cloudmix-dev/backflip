<script lang="ts">
  export let label: string;
  export let variant: "primary" | "secondary" = "primary";

  let classes =
    variant === "primary"
      ? "bg-indigo-600 hover:bg-indigo-500 focus-visible:outline-indigo-600"
      : "bg-emerald-600 hover:bg-emerald-500 focus-visible:outline-emerald-600";
</script>

<button
  type="button"
  class={`inline-flex justify-center items-center rounded-md px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${classes}`}
>
  {label}
</button>
