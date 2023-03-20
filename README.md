# @sensethenlove/svelte-turnstile


### Description
Helper functions & component to integrate svelte w/ an invisible cloudflare turnstile form validator


### Install
```bash
pnpm add @sensethenlove/svelte-turnstile
```

### Prerequisites
1. Svelte(kit) Typescript Project
1. Cloudflare account
1. From Cloudflare dashboard setup Turnstile

### Instructions
1. From Cloudflare dashboard find Secret key
1. Add Secret key to `.env` file (CLOUDFLARE_TURNSTILE_PRIVATE_KEY)
1. In `app.html` add turnstile script

### Client side example
```svelte
<script lang="ts">
  import { onMount } from 'svelte' 
  import { PUBLIC_ENVIRONMENT } from '$env/static/public'
  import Turnstile from '@sensethenlove/svelte-turnstile/src/Turnstile.svelte'
  import { PUBLIC_KEY_ALWAYS_PASSES } from '@sensethenlove/svelte-turnstile/src/variables'

  const PUBLIC_KEY = 'get-from-cloudflare-dashboard'
</script>


<Turnstile { onMount } sitekey={ PUBLIC_ENVIRONMENT === 'local' ? PUBLIC_KEY_ALWAYS_PASSES : PUBLIC_KEY } />
```

### Server side example
```ts
import { PUBLIC_ENVIRONMENT } from '$env/static/public'
import validate from '@sensethenlove/svelte-turnstile/src/validate'
import { CLOUDFLARE_TURNSTILE_PRIVATE_KEY } from '$env/static/private'
import { ERROR_MESSAGE, CLOUDFLARE_TURNSTILE_PRIVATE_KEY_ALWAYS_PASSES } from '@sensethenlove/svelte-turnstile/src/variables'


const fields = Object.fromEntries((await request.formData()).entries())
const secret = (PUBLIC_ENVIRONMENT === 'local') ? CLOUDFLARE_TURNSTILE_PRIVATE_KEY_ALWAYS_PASSES : CLOUDFLARE_TURNSTILE_PRIVATE_KEY

if (!fields['cf-turnstile-response']) throw new Error(ERROR_MESSAGE)
else await validate(fields['cf-turnstile-response'], secret)
```
