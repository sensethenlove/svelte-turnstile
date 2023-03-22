import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        sitekey: string;
    };
    events: {
        state: CustomEvent<any>;
    } & {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export type TurnstileProps = typeof __propDef.props;
export type TurnstileEvents = typeof __propDef.events;
export type TurnstileSlots = typeof __propDef.slots;
export default class Turnstile extends SvelteComponentTyped<TurnstileProps, TurnstileEvents, TurnstileSlots> {
}
export {};
