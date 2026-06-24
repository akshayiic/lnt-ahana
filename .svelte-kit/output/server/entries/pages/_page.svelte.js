import { g as getContext, d as store_get, e as attr, h as stringify, u as unsubscribe_stores, b as pop, p as push, s as setContext, i as head } from "../../chunks/index2.js";
import { w as writable } from "../../chunks/index.js";
import "lazysizes";
import { m as minimizeBtn, a as maximizeBtn } from "../../chunks/minimize-icon.js";
import "lazysizes/plugins/parent-fit/ls.parent-fit.js";
import "../../chunks/client.js";
import "iconify-icon";
function Home($$payload, $$props) {
  push();
  var $$store_subs;
  const walkthroughDisabled = writable();
  const hotspotName = getContext("hotspotName");
  let currentUI = getContext("currentUI");
  getContext("UIPanel");
  const isDay = writable();
  const exteriorImagesSeq = writable();
  const isInteriorUnitDataMinimized = writable();
  walkthroughDisabled.set(false);
  isInteriorUnitDataMinimized.set(true);
  $$payload.out += `<button id="daynighmode" type="button" class="day-night-toggle" style="position: fixed; top: 3rem; right: 2rem; cursor: pointer; z-index: 1000001; background: white; padding: .4rem; border-radius: 50%;" aria-label="Toggle day and night mode"><!--[-->`;
  if (store_get($$store_subs ??= {}, "$isDay", isDay)) {
    $$payload.out += `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-sun" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`;
    $$payload.out += "<!--]-->";
  } else {
    $$payload.out += `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-moon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 0111.21 3 7 7 0 1012 21a9 9 0 009-8.21z"></path></svg>`;
    $$payload.out += "<!--]!-->";
  }
  $$payload.out += `</button> <div${attr("class", store_get($$store_subs ??= {}, "$hotspotName", hotspotName) == "Exterior" ? "cloudimage-360 exterior-cloudi !absolute left-0 top-0  z-[10]" : "cloudimage-360 invisible", false)} data-folder="https://assets.vestate.io/narang-kane/exterior/day/"${attr("data-filename", `${stringify("{")}index${stringify("}")}.webp`, false)} data-amount="24" data-keys="false" data-filters="blur:20" data-drag-speed="400" data-request-responsive-images="true" data-info="false" data-ratio=" 1"></div> <div${attr("class", store_get($$store_subs ??= {}, "$hotspotName", hotspotName) == "night" ? "cloudimage-360 exterior-cloudi !absolute left-0 top-0  z-[10]" : "cloudimage-360 invisible", false)} data-folder="https://assets.vestate.io/narang-kane/exterior/night/"${attr("data-filename", `${stringify("night{")}index${stringify("}")}.webp`, false)} data-amount="24" data-keys="false" data-filters="blur:20" data-drag-speed="400" data-request-responsive-images="true" data-info="false" data-ratio="1"></div> <!--[-->`;
  if (store_get($$store_subs ??= {}, "$currentUI", currentUI).highlights) {
    $$payload.out += `<div class="left-panel-wrapper"><div class="left-panel p-2"><div class="left-panel--header flex justify-between"><div class="left-title flex items-center font-bold"><svg width="25" height="25" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" class="mr-2"><path d="M8.90798 13.3021C8.90798 10.1749 8.89311 7.0624 8.90798 3.93517C8.92285 2.07654 10.2613 0.527682 12.031 0.262163C13.9196 -0.0328582 15.6596 0.984965 16.2395 2.74034C16.3436 3.06486 16.418 3.40414 16.4477 3.74341C16.5072 4.46621 16.0462 5.02675 15.377 5.11526C14.7375 5.18901 14.2022 4.73173 14.0832 3.99418C13.9345 3.03536 13.414 2.53382 12.5961 2.57808C11.7633 2.62233 11.2874 3.21237 11.2874 4.21544C11.2874 4.76123 11.2725 5.29227 11.2874 5.83806C11.3171 6.47236 11.0197 7.28366 11.4064 7.68194C11.8079 8.09497 12.6258 7.8147 13.2653 7.8147C15.9124 7.82945 18.5743 7.8147 21.2214 7.82945C21.6973 7.82945 21.8758 7.72619 21.8609 7.22466C21.8312 6.11833 21.8312 5.012 21.8609 3.90567C21.9055 1.88478 23.4373 0.321167 25.4598 0.203159C27.4228 0.0999013 29.1033 1.4865 29.3858 3.47789C29.5048 4.33345 29.1033 4.9825 28.3894 5.10051C27.8392 5.18901 27.051 4.70223 27.0064 3.87617C26.9618 3.00586 26.3223 2.50432 25.5341 2.56333C24.7311 2.62233 24.2403 3.21237 24.2403 4.15644C24.2403 10.2781 24.2403 16.3998 24.2403 22.5067C24.2403 22.728 24.2552 22.9493 24.2255 23.1705C24.166 23.8196 23.6901 24.2769 23.0655 24.2916C22.4558 24.3064 21.9501 23.8491 21.8609 23.2148C21.846 23.0968 21.846 22.964 21.846 22.846C21.8312 21.6364 21.8312 21.6364 20.582 21.6364C17.7564 21.6364 14.9309 21.6512 12.1053 21.6217C11.4807 21.6217 11.1684 21.7249 11.2874 22.4182C11.332 22.6543 11.3023 22.905 11.2874 23.1558C11.2428 23.8048 10.7669 24.2769 10.1423 24.2916C9.50283 24.3064 8.96746 23.8343 8.92285 23.1558C8.89311 22.5658 8.90798 21.9757 8.90798 21.3857C8.90798 18.7157 8.90798 16.0015 8.90798 13.3021ZM16.6113 13.8184C18.1431 13.8184 19.6748 13.8036 21.2214 13.8331C21.7568 13.8479 21.9055 13.6709 21.8758 13.1693C21.8312 12.358 21.8609 11.5467 21.8758 10.7354C21.8907 10.3814 21.8014 10.2044 21.385 10.2044C18.1877 10.2191 15.0052 10.2191 11.8079 10.2044C11.4064 10.2044 11.3023 10.3519 11.3023 10.7207C11.3171 11.5615 11.332 12.3875 11.3023 13.2283C11.2725 13.7299 11.4807 13.8479 11.9417 13.8331C13.4883 13.8036 15.0498 13.8184 16.6113 13.8184ZM16.6113 19.3058C18.1728 19.3058 19.7343 19.291 21.2958 19.3205C21.7568 19.3353 21.8907 19.1878 21.8758 18.7452C21.846 18.0519 21.8609 17.3734 21.8758 16.6801C21.8758 16.3556 21.8163 16.1933 21.4296 16.1933C18.2174 16.208 14.9904 16.208 11.7781 16.1933C11.4212 16.1933 11.3023 16.3113 11.3171 16.6653C11.332 17.3586 11.3617 18.0372 11.3171 18.7305C11.2874 19.2468 11.4956 19.3353 11.9566 19.3353C13.4883 19.291 15.0498 19.3058 16.6113 19.3058Z" fill="#5A4DE3"></path><path d="M25.8935 31.0057C24.6808 31.0057 23.661 30.5336 22.8204 29.6043C22.4483 29.206 22.1038 28.7635 21.5664 28.6013C20.6568 28.3357 19.954 28.7193 19.3615 29.4421C18.5208 30.4451 17.4873 30.9909 16.2195 31.0057C14.9792 31.0204 13.9594 30.5041 13.0913 29.5748C11.7683 28.144 10.9001 28.144 9.59098 29.5601C7.77193 31.522 5.20873 31.5367 3.40347 29.5748C2.87981 28.9995 2.32858 28.5423 1.5293 28.4832C0.867833 28.439 0.481975 27.849 0.550878 27.2147C0.619782 26.5656 1.08832 26.1378 1.74979 26.1673C2.93493 26.2116 3.92714 26.7131 4.74019 27.6129C5.15361 28.0702 5.55325 28.5275 6.21472 28.616C7.09668 28.734 7.68925 28.2472 8.24048 27.6129C9.27402 26.4329 10.5556 25.9756 12.0439 26.2263C12.981 26.3886 13.7665 26.8754 14.4142 27.5982C14.8414 28.0702 15.2686 28.5423 15.9576 28.616C16.8258 28.7045 17.377 28.2177 17.9145 27.6129C19.1685 26.2263 20.6706 25.8281 22.3794 26.3886C23.096 26.6246 23.661 27.1114 24.1847 27.6867C25.3836 28.9995 26.3345 28.9995 27.5334 27.6719C28.3464 26.7574 29.3249 26.2263 30.4962 26.1526C31.2128 26.1083 31.7089 26.5214 31.7778 27.1852C31.8467 27.8785 31.4609 28.4242 30.758 28.4832C30.0139 28.5423 29.4764 28.9405 28.9941 29.5011C28.1673 30.4894 27.1337 30.9909 25.8935 31.0057Z" fill="#5A4DE3"></path></svg> Exterior Highlights</div> <button id="minimize-interior-data-amenities" class="ghost-btn close-btn !px-0 !py-0"><!--[-->`;
    if (!store_get($$store_subs ??= {}, "$isInteriorUnitDataMinimized", isInteriorUnitDataMinimized)) {
      $$payload.out += `<img id="un-mm"${attr("src", minimizeBtn, false)} alt="minimize">`;
      $$payload.out += "<!--]-->";
    } else {
      $$payload.out += "<!--]!-->";
    }
    $$payload.out += ` <!--[-->`;
    if (store_get($$store_subs ??= {}, "$isInteriorUnitDataMinimized", isInteriorUnitDataMinimized)) {
      $$payload.out += `<img id="un-mx"${attr("src", maximizeBtn, false)} alt="maximize">`;
      $$payload.out += "<!--]-->";
    } else {
      $$payload.out += "<!--]!-->";
    }
    $$payload.out += `</button></div> <div${attr("class", !store_get($$store_subs ??= {}, "$isInteriorUnitDataMinimized", isInteriorUnitDataMinimized) ? "block" : "hidden", false)}><div class="no-hovers pt-3"><div class="inner-btn-group"><button${attr("class", `${stringify(`inner-modal-btn ${store_get($$store_subs ??= {}, "$exteriorImagesSeq", exteriorImagesSeq) == "narang-valora" ? "active" : ""}`)} svelte-fcgvip`, false)} id="master-brochure-download">Narang Valora</button> <button${attr("class", `${stringify(`inner-modal-btn ${store_get($$store_subs ??= {}, "$exteriorImagesSeq", exteriorImagesSeq) == "crown-view" ? "active" : ""}`)} svelte-fcgvip`, false)} id="crown-view-btn">Crown View</button> <button${attr("class", `${stringify(`inner-modal-btn ${store_get($$store_subs ??= {}, "$exteriorImagesSeq", exteriorImagesSeq) == "the-elevation" ? "active" : ""}`)} svelte-fcgvip`, false)} id="the-elevation-btn">The Elevation</button></div></div></div></div></div>`;
    $$payload.out += "<!--]-->";
  } else {
    $$payload.out += "<!--]!-->";
  }
  if ($$store_subs)
    unsubscribe_stores($$store_subs);
  pop();
}
const poweredByVretail = "data:image/png;base64,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";
const instructionIcon = "/_app/immutable/assets/instruction-icon.CKx1OzW8.svg";
function _page($$payload, $$props) {
  push();
  var $$store_subs;
  const currentUI = getContext("currentUI");
  const walkthroughDisabled = getContext("walkthroughDisabled");
  const UIPanel = getContext("UIPanel");
  const instructionPano = writable();
  function inIframe() {
    try {
      return window.self !== window.top;
    } catch (e) {
      return true;
    }
  }
  inIframe();
  setContext("currentUI", currentUI);
  instructionPano.set(true);
  head($$payload, ($$payload2) => {
    $$payload2.title = "<title>";
    $$payload2.title += `V-Estate</title>`;
    $$payload2.out += `<meta name="description" content="v-estate">`;
  });
  $$payload.out += `<!--[-->`;
  Home($$payload);
  $$payload.out += `<!--]--> <div class="rotate-to-view"><svg width="594" height="641" viewBox="0 0 594 641" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_323_2301)"><path d="M251.999 151H341.999" stroke="#fff" stroke-width="12" stroke-linecap="round"></path><circle cx="296.999" cy="457" r="12" fill="#fff"></circle></g><rect x="203.999" y="147" width="186" height="352" rx="12" stroke="#fff" stroke-width="8"></rect><path d="M343.449 618.795C341.64 617.527 341.2 615.033 342.467 613.224L363.116 583.734C364.383 581.925 366.877 581.485 368.687 582.752C370.496 584.019 370.936 586.513 369.669 588.323L351.314 614.536L377.527 632.89C379.337 634.157 379.777 636.651 378.51 638.461C377.243 640.271 374.748 640.71 372.939 639.443L343.449 618.795ZM581.096 274.468C580.713 272.292 582.165 270.218 584.341 269.834C586.517 269.451 588.591 270.903 588.975 273.079L581.096 274.468ZM345.049 611.579C421.054 598.177 488.623 555.131 532.891 491.91L539.444 496.499C493.959 561.458 424.533 605.687 346.438 619.457L345.049 611.579ZM532.891 491.91C577.158 428.69 594.498 350.474 581.096 274.468L588.975 273.079C602.745 351.174 584.928 431.54 539.444 496.499L532.891 491.91Z" fill="white"></path><path d="M349.021 32.1887C350.288 33.9983 349.848 36.4925 348.038 37.7596L318.549 58.4083C316.739 59.6754 314.245 59.2356 312.978 57.426C311.711 55.6164 312.151 53.1222 313.96 51.8551L340.173 33.5007L321.819 7.28779C320.552 5.47817 320.991 2.98399 322.801 1.71688C324.611 0.449769 327.105 0.88956 328.372 2.69918L349.021 32.1887ZM125.313 83.3514L127.607 86.628L125.313 83.3514ZM7.93895 274.47C7.55531 276.645 5.4807 278.098 3.30513 277.714C1.12953 277.331 -0.323135 275.256 0.0604705 273.08L7.93895 274.47ZM345.05 38.4222C269.044 25.0204 190.828 42.3605 127.607 86.628L123.019 80.0748C187.977 34.5903 268.344 16.7735 346.439 30.5437L345.05 38.4222ZM127.607 86.628C64.3868 130.895 21.3408 198.464 7.93895 274.47L0.0604705 273.08C13.8308 194.985 58.0601 125.559 123.019 80.0748L127.607 86.628Z" fill="white"></path><defs><clipPath id="clip0_323_2301"><rect x="203.999" y="147" width="186" height="352" rx="12" fill="white"></rect></clipPath></defs></svg> Please rotate your device for better experience</div> <!--[-->`;
  if (store_get($$store_subs ??= {}, "$UIPanel", UIPanel) == "loading") {
    $$payload.out += `<div class="absolute left-0 top-0 z-[2000000000] h-screen w-screen rounded bg-cover bg-center bg-no-repeat"><div class="z-[2000000002] h-screen w-screen bg-gradient-to-t from-black"><div class="intro center absolute bottom-10 flex w-full flex-col items-center justify-center text-center font-semibold uppercase text-white"><button id="v-start-btn" class="bg-all-none !w-fit p-0 svelte-1c2hmon"><img id="v-start-img" style="width: 100px;" src="/start-btn.png" alt=""></button> <div class="title text-2xl">virtual tour experience</div> <div class="subtitle">by Narang</div></div></div></div> <img${attr("src", poweredByVretail, false)} alt="powered by vretail" class="absolute bottom-5 right-6 z-[2000000002]">`;
    $$payload.out += "<!--]-->";
  } else {
    $$payload.out += "<!--]!-->";
  }
  $$payload.out += ` <!--[-->`;
  if (store_get($$store_subs ??= {}, "$UIPanel", UIPanel) == "instructions-exterior" && store_get($$store_subs ??= {}, "$currentUI", currentUI).Exterior && store_get($$store_subs ??= {}, "$walkthroughDisabled", walkthroughDisabled)) {
    $$payload.out += `<div class="centered-panel instruction-screen p-4 svelte-1c2hmon"><div class="left-panel--header mb-3 flex justify-between"><div class="left-title flex flex-col gap-1 text-left"><div class="text-2xl font-bold">Instructions</div> See how to explore V-estate</div> <button id="instruction-close" class="ghost-btn close-btn !px-0 !pt-0 svelte-1c2hmon"><svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="0.363281" y="0.319336" width="41.5884" height="41.5884" rx="9.50592" fill="#ECECEC"></rect><path d="M15.9062 15.8613L26.4104 26.3655" stroke="black" stroke-width="2.06369" stroke-linecap="round"></path><path d="M26.4102 15.8613L15.906 26.3655" stroke="black" stroke-width="2.06369" stroke-linecap="round"></path></svg></button></div> <div class="mb-4 mt-3 grid grid-cols-3 gap-2"><div class="col-span-1">Navigate and explore around with your mouse. Click on a touchpoint to interact</div> <div class="col-span-1"><img${attr("src", instructionIcon, false)} alt=""></div> <div class="col-span-1"><div class="mt-[2.75rem]">Use your mouse scroller to zoom an object.</div></div></div> <button class="primary-btn mx-auto block w-80 svelte-1c2hmon" id="contact-submit">Okay</button></div>`;
    $$payload.out += "<!--]-->";
  } else {
    $$payload.out += "<!--]!-->";
  }
  if ($$store_subs)
    unsubscribe_stores($$store_subs);
  pop();
}
export {
  _page as default
};
