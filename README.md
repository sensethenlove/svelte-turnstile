# 🕉 @sensethenlove/svelte-turnstile


### 🙏 Description
Helper functions & component to integrate svelte w/ an invisible cloudflare turnstile form validator

### ☯️ Install
```bash
pnpm add @sensethenlove/svelte-turnstile
```

### 💛 Instructions
1. From Cloudflare dashboard find Secret key
1. Add Secret key to `.env` file (CLOUDFLARE_TURNSTILE_PRIVATE_KEY)
1. In `app.html` add turnstile script

### 🧡 Example: Client side
```svelte
<script lang="ts">
  import { PUBLIC_ENVIRONMENT } from '$env/static/public'
  import { Turnstile, PUBLIC_KEY_ALWAYS_PASSES } from '@sensethenlove/svelte-turnstile'

  const PUBLIC_KEY = 'get-from-cloudflare-dashboard'
</script>


<Turnstile sitekey={ PUBLIC_ENVIRONMENT === 'local' ? PUBLIC_KEY_ALWAYS_PASSES : PUBLIC_KEY } />
```

### 💙 Example: Server side
```ts
import { PUBLIC_ENVIRONMENT } from '$env/static/public'
import { CLOUDFLARE_TURNSTILE_PRIVATE_KEY } from '$env/static/private'
import { validate, ERROR_MESSAGE, CLOUDFLARE_TURNSTILE_PRIVATE_KEY_ALWAYS_PASSES } from '@sensethenlove/svelte-turnstile'


const fields = Object.fromEntries((await request.formData()).entries())
const secret = (PUBLIC_ENVIRONMENT === 'local') ? CLOUDFLARE_TURNSTILE_PRIVATE_KEY_ALWAYS_PASSES : CLOUDFLARE_TURNSTILE_PRIVATE_KEY

if (!fields['cf-turnstile-response']) throw new Error(ERROR_MESSAGE)
else await validate(fields['cf-turnstile-response'], secret)
```

### 💖 Our helpful packages!
* [@sensethenlove/jwt](https://www.npmjs.com/package/@sensethenlove/jwt)
* [@sensethenlove/toast](https://www.npmjs.com/package/@sensethenlove/toast)
* [@sensethenlove/env-write](https://www.npmjs.com/package/@sensethenlove/env-write)
* [@sensethenlove/global-style](https://www.npmjs.com/package/@sensethenlove/global-style)
* [@sensethenlove/loop-backwards](https://www.npmjs.com/package/@sensethenlove/loop-backwards)
