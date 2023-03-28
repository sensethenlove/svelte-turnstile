<script>import { onMount, createEventDispatcher } from "svelte";
export let sitekey;
let div;
const maxAttemptCount = 9;
let readyAttemptCounter = 0;
const dispatch = createEventDispatcher();
onMount(() => {
  let id;
  let timer;
  function onReady() {
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
  }
  function attempt() {
    if (window.turnstile) {
      onReady();
    } else if (readyAttemptCounter < maxAttemptCount) {
      readyAttemptCounter++;
      timer = setTimeout(attempt, 81);
    }
  }
  attempt();
  return () => {
    if (id)
      window.turnstile.remove(id);
    if (timer)
      window.clearTimeout(timer);
  };
});
</script>


<div bind:this={ div }></div>
