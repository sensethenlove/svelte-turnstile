import validate from './validate';
import Turnstile from './Turnstile.svelte';
export { Turnstile, validate };
export * from './variables';
declare global {
    interface Window {
        turnstile: {
            render: (element: string | HTMLElement, options: TurnstileOptions) => string;
            remove: (widgetId: string) => void;
        };
    }
}
interface TurnstileOptions {
    sitekey: string;
}
export type TurnstileTokenValidateResponse = {
    'error-codes': string[];
    success: boolean;
    action: string;
    cdata: string;
};
