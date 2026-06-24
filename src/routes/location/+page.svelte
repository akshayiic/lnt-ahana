<script>
  import { zoomable } from "$lib/zoomable.js";
  // Placeholder for location image source. Feel free to update this URL.
  let locationImg =
    "https://assets.vestate.io/webtool/narang/valora/brochure/floorPlan/assets/valora-map.jpg";
</script>

<svelte:head>
  <title>Location - V-Estate</title>
</svelte:head>

<div class="overview-image-wrapper">
  {#if locationImg}
    <img
      src={locationImg}
      alt="Location"
      class="overview-static-image"
      use:zoomable
    />
  {:else}
    <div
      class="flex items-center justify-center text-white h-screen text-2xl font-bold bg-black"
    >
      Location Map (Placeholder)
    </div>
  {/if}
</div>
