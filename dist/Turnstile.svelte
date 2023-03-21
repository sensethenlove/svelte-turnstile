<script>import { onMount } from "svelte";
let div;
export let sitekey;
onMount(() => {
  const id = window.turnstile.render(div, { sitekey });
  return () => {
    window.turnstile.remove(id);
  };
});
</script>


<div bind:this={ div }></div>
