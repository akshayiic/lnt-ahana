import * as universal from '../entries/pages/_page.ts.js';

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/+page.ts";
export const imports = ["_app/immutable/nodes/2.CYP2GtVe.js","_app/immutable/chunks/disclose-version.0pbw4HjO.js","_app/immutable/chunks/runtime.G7h84x8p.js","_app/immutable/chunks/if.CBatPikC.js","_app/immutable/chunks/attributes.CheHKa_F.js","_app/immutable/chunks/store.B673lYNu.js","_app/immutable/chunks/index.BAlRm3pH.js","_app/immutable/chunks/class.X5aJZYMU.js","_app/immutable/chunks/index-client.ClYPF2XV.js","_app/immutable/chunks/minimize-icon.BrSCFa0i.js","_app/immutable/chunks/entry.ceyYID61.js"];
export const stylesheets = ["_app/immutable/assets/2._BbzeoRX.css"];
export const fonts = [];
