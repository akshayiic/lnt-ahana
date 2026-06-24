import * as universal from '../entries/pages/_layout.ts.js';

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/+layout.ts";
export const imports = ["_app/immutable/nodes/0.Da6yfhEf.js","_app/immutable/chunks/disclose-version.0pbw4HjO.js","_app/immutable/chunks/runtime.G7h84x8p.js","_app/immutable/chunks/if.CBatPikC.js","_app/immutable/chunks/attributes.CheHKa_F.js","_app/immutable/chunks/class.X5aJZYMU.js","_app/immutable/chunks/store.B673lYNu.js","_app/immutable/chunks/index.BAlRm3pH.js","_app/immutable/chunks/entry.ceyYID61.js","_app/immutable/chunks/stores.C3IFc29N.js","_app/immutable/chunks/index-client.ClYPF2XV.js"];
export const stylesheets = ["_app/immutable/assets/0.CwH0KXIE.css"];
export const fonts = [];
