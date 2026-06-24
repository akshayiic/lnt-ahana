<script>
  import { setContext, getContext } from "svelte";
  import { writable } from "svelte/store";
  import minimizeBtn from "$lib/images/minimize-icon.svg";
  import maximizeBtn from "$lib/images/maximize-icon.svg";
  import { slide } from "svelte/transition";
  const pdfName = writable("t2");
  const pageNumber = writable(1);
  setContext("pageNumber", pageNumber);
  setContext("pdfName", pdfName);
  const isAmenitiesMinimized = getContext("isAmenitiesMinimized");

  function nextPage() {
    if ($pageNumber < 51) {
      pageNumber.set($pageNumber + 1);
    }
  }
  function prevPage() {
    if ($pageNumber > 1) {
      pageNumber.set($pageNumber - 1);
    }
  }
</script>

<div
  class="user-select-none fixed left-0 right-0 top-5 z-[999] mb-2 flex items-center justify-center gap-4"
  style="background: white;
       width: fit-content;
       margin: auto;
       padding: .6rem 1rem;
       border-radius: 1rem;
       box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);"
>
  <button
    on:click={() => prevPage()}
    class="primary-btn px-5 py-1.5 text-sm font-semibold min-w-[100px] text-center"
    disabled={$pageNumber == 1 ? true : false}>Previous</button
  >
  <span class="flex items-center gap-1.5 text-lg font-bold text-gray-800"
    ><span id="page_num">{$pageNumber}</span>
    <span class="text-gray-400">/</span>
    <span id="page_count"> 51 </span>
  </span>
  <button
    on:click={() => nextPage()}
    class="primary-btn px-5 py-1.5 text-sm font-semibold min-w-[100px] text-center"
    disabled={$pageNumber == 51 ? true : false}>Next</button
  >
</div>

<div
  class={!$pdfName
    ? "hidden"
    : "centered-panel brochure-panel my-0 !h-screen !w-screen !bg-[#000000a6] backdrop-blur-md"}
>
  <div id="brochure-img-wrapper">
    <img
      class="mx-auto"
      style="width: auto; height: 100vh;"
      src={"https://assets.vestate.io/webtool/narang/valora/brochure/brochure/assets/VTB-" +
        String($pageNumber).padStart(2, "0") +
        ".webp"}
      alt=""
    />
  </div>
</div>
