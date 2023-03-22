<script lang="ts">
  import { onMount, createEventDispatcher } from 'svelte'

  export let sitekey: string

  let div: HTMLDivElement
  const dispatch = createEventDispatcher()

  onMount(() => {
    let id: string

    window.turnstile.ready(() => {
      id = window.turnstile.render(div, {
        sitekey,
        callback () {
          dispatch('state', { status: 'success', message: 'All good!' })
        },
        'error-callback' () {
          dispatch('state', { status: 'error', message: 'Network error' })
        },
        'expired-callback' () {
          dispatch('state', { status: 'expired', message: 'Token expired' })
        },
        'timeout-callback' () {
          dispatch('state', { status: 'timeout', message: 'Challenge expired' })
        },
      })
    })

    return () => { // on unmount
      if (id) window.turnstile.remove(id)
    }
  })
</script>


<div bind:this={ div }></div>
