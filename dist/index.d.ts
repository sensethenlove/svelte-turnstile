import validate from './validate';
import SvelteTurnstileError from './error';
import Turnstile from './Turnstile.svelte';
export * from './variables';
export { Turnstile, validate, SvelteTurnstileError };
declare global {
    interface Window {
        turnstile: {
            render: (element: string | HTMLElement, options: TurnstileOptions) => string;
            remove: (widgetId: string) => void;
            ready: any;
        };
    }
}
interface TurnstileOptions {
    sitekey: string;
    callback: (token: string) => void;
    'error-callback': () => void;
    'expired-callback': () => void;
    'timeout-callback': () => void;
}
export type TurnstileTokenValidateResponse = {
    'error-codes': string[];
    success: boolean;
    action: string;
    cdata: string;
};
