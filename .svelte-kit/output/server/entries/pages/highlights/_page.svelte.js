import { f as escape_html, e as attr, b as pop, p as push } from "../../../chunks/index2.js";
function _page($$payload, $$props) {
  push();
  let count = 0;
  let name = "world";
  $$payload.out += `<main class="svelte-1qf7dha"><h1 class="svelte-1qf7dha">Hello ${escape_html(name)}!</h1> <div class="counter svelte-1qf7dha"><button class="svelte-1qf7dha">-</button> <span class="count svelte-1qf7dha">${escape_html(count)}</span> <button class="svelte-1qf7dha">+</button></div> <p class="svelte-1qf7dha">You've clicked the counter ${escape_html(count)} time${escape_html("s")}.</p> <div class="input-section svelte-1qf7dha"><label for="name-input" class="svelte-1qf7dha">Change the greeting:</label> <input id="name-input"${attr("value", name, false)} placeholder="Enter a name" class="svelte-1qf7dha"></div></main>`;
  pop();
}
export {
  _page as default
};
