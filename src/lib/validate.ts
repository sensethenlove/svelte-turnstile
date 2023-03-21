import { CHALLENGE_URL, ERROR_MESSAGE } from './variables'
import type { TurnstileTokenValidateResponse } from '$lib/index.d'


export default async (turnstileResponse: FormDataEntryValue, secret: string) => {
  const response = await fetch(CHALLENGE_URL, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ secret, response: turnstileResponse }),
  })

  const validationResponse: TurnstileTokenValidateResponse = await response.json()

  // The timeout-or-duplicate error code can happen @ UpdateUser.svelte where the file changes but the other form fields do not change
  // This is not a scary error so lets just bypass it, all errors may be found here
  // https://developers.cloudflare.com/turnstile/get-started/server-side-validation/#error-codes
  if (!validationResponse.success && validationResponse['error-codes'].length === 1 && validationResponse['error-codes'][0] === 'timeout-or-duplicate') {
    validationResponse.success = true
  }

  if (!validationResponse.success) throw new Error(ERROR_MESSAGE)
}
