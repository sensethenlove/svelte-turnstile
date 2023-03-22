<script>import { onMount, createEventDispatcher } from "svelte";
export let sitekey;
let div;
const dispatch = createEventDispatcher();
onMount(() => {
  let id;
  window.turnstile.ready(() => {
    id = window.turnstile.render(div, {
      sitekey,
      callback() {
        dispatch("state", { status: "success", message: "All good!" });
      },
      "error-callback"() {
        dispatch("state", { status: "error", message: "Network error" });
      },
      "expired-callback"() {
        dispatch("state", { status: "expired", message: "Token expired" });
      },
      "timeout-callback"() {
        dispatch("state", { status: "timeout", message: "Challenge expired" });
      }
    });
  });
  return () => {
    if (id)
      window.turnstile.remove(id);
  };
});
</script>


<div bind:this={ div }></div>
