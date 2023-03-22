# 🕉 @sensethenlove/svelte-turnstile


### 🙏 Description
Helper functions & component to integrate Svelte w/ an invisible Cloudflare Turnstile form validator

### ☯️ Install
```bash
pnpm add @sensethenlove/svelte-turnstile
```

### 💛 Instructions
1. Get Cloudflare account & in dashboard setup Turnstile
1. From Turnstile dashboard find Secret key
1. Add Secret key to `.env` file (CLOUDFLARE_TURNSTILE_PRIVATE_KEY)

### Add turnstile script to app.html
```html
<script src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"></script> <!-- https://developers.cloudflare.com/turnstile/get-started/client-side-rendering/#disable-implicit-rendering -->
```

### 🧡 Example: Client side
* If wondering how PUBLIC_ENVIRONMENT is set => [@sensethenlove/env-write](https://www.npmjs.com/package/@sensethenlove/env-write)
* If wondering where showToast comes from => [@sensethenlove/toast](https://www.npmjs.com/package/@sensethenlove/toast)
```svelte
<script lang="ts">
  import showToast from '@sensethenlove/toast'
  import { PUBLIC_ENVIRONMENT } from '$env/static/public'
  import { Turnstile, PUBLIC_KEY_ALWAYS_PASSES } from '@sensethenlove/svelte-turnstile'

  const PUBLIC_KEY = 'get-from-cloudflare-turnstile-dashboard'

  function getTurnstileState (e: CustomEvent) { // if form is submitted before this callback no token will be passed in the form (aka) token validation will fail, typically takes less then 3 seconds after page load
    if (e.detail.status === 'success') isLoading = false // status options => [ 'success', 'error', 'expired', 'timeout' ] https://developers.cloudflare.com/turnstile/get-started/client-side-rendering/#configurations
    else showToast({ type: 'info', items: [ e.detail.message ] }) // message options => [ 'All good!', 'Network error', 'Token expired', 'Challenge expired' ] https://developers.cloudflare.com/turnstile/get-started/client-side-rendering/#configurations
  }
</script>


<Turnstile on:state={ getTurnstileState } sitekey={ PUBLIC_ENVIRONMENT === 'local' ? PUBLIC_KEY_ALWAYS_PASSES : PUBLIC_KEY } />
```

### 💙 Example: Server side
* If wondering how PUBLIC_ENVIRONMENT is set => [@sensethenlove/env-write](https://www.npmjs.com/package/@sensethenlove/env-write)
```ts
import { PUBLIC_ENVIRONMENT } from '$env/static/public'
import { CLOUDFLARE_TURNSTILE_PRIVATE_KEY } from '$env/static/private'
import { validate, CLOUDFLARE_TURNSTILE_PRIVATE_KEY_ALWAYS_PASSES } from '@sensethenlove/svelte-turnstile'

const fields = Object.fromEntries((await request.formData()).entries())
const secret = (PUBLIC_ENVIRONMENT === 'local') ? CLOUDFLARE_TURNSTILE_PRIVATE_KEY_ALWAYS_PASSES : CLOUDFLARE_TURNSTILE_PRIVATE_KEY

await validate(fields['cf-turnstile-response'], secret)
```

### 💖 Our helpful packages!
* [@sensethenlove/jwt](https://www.npmjs.com/package/@sensethenlove/jwt)
* [@sensethenlove/toast](https://www.npmjs.com/package/@sensethenlove/toast)
* [@sensethenlove/env-write](https://www.npmjs.com/package/@sensethenlove/env-write)
* [@sensethenlove/global-style](https://www.npmjs.com/package/@sensethenlove/global-style)
* [@sensethenlove/svelte-modal](https://www.npmjs.com/package/@sensethenlove/svelte-modal)
* [@sensethenlove/loop-backwards](https://www.npmjs.com/package/@sensethenlove/loop-backwards)
