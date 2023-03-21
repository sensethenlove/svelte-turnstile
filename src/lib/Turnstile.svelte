<script lang="ts">
  import { onMount } from 'svelte'

  let div: HTMLDivElement
  export let sitekey: string

  onMount(() => {
    const id = window.turnstile.render(div, { sitekey })

    return () => { // on unmount
      window.turnstile.remove(id)
    }
  })
</script>


<div bind:this={ div }></div>
