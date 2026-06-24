import { g as getContext, m as mutate_store, d as store_get, e as attr, u as unsubscribe_stores, b as pop, p as push } from "../../../chunks/index2.js";
import "clsx";
import { w as writable } from "../../../chunks/index.js";
function _page($$payload, $$props) {
  push();
  var $$store_subs;
  let currentUI = getContext("currentUI");
  let navSlide = getContext("navSlide");
  navSlide.set(true);
  mutate_store($$store_subs ??= {}, "$currentUI", currentUI, store_get($$store_subs ??= {}, "$currentUI", currentUI)["access"] = true);
  const isInteriorUnitDataMinimized = writable();
  const accessRoad = writable();
  isInteriorUnitDataMinimized.set(true);
  accessRoad.set("video");
  $$payload.out += `<!--[-->`;
  if (store_get($$store_subs ??= {}, "$accessRoad", accessRoad) == "video") {
    $$payload.out += `<video src="https://framer-assets.vestate.iiclab.com/evara/access-roads/evara-comp.mp4 " autoplay class="video absolute top-0 h-full w-full bg-black" muted loop></video>`;
    $$payload.out += "<!--]-->";
  } else {
    $$payload.out += `<img${attr("src", "https://framer-assets.vestate.iiclab.com/evara/" + store_get($$store_subs ??= {}, "$accessRoad", accessRoad), false)} alt="Vicinity" class="absolute top-0 h-full w-full">`;
    $$payload.out += "<!--]!-->";
  }
  if ($$store_subs)
    unsubscribe_stores($$store_subs);
  pop();
}
export {
  _page as default
};
