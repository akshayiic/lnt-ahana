<script>
  import { zoomable } from "$lib/zoomable.js";
  // Placeholder for master plan image source. Feel free to update this URL.
  let masterPlanImg =
    "https://assets.vestate.io/webtool/narang/valora/brochure/floorPlan/assets/valora_site.jpeg";
</script>

<svelte:head>
  <title>Master Plan - V-Estate</title>
</svelte:head>

<div class="overview-image-wrapper">
  {#if masterPlanImg}
    <img
      src={masterPlanImg}
      alt="Master Plan"
      class="overview-static-image"
      use:zoomable
    />
  {:else}
    <div
      class="flex items-center justify-center text-white h-screen text-2xl font-bold bg-black"
    >
      Master Plan (Placeholder)
    </div>
  {/if}
</div>
