<script>
  import { getContext, onMount } from "svelte";
  import { zoomable } from "$lib/zoomable.js";

  // Retrieve the navSlide store from context to control navbar visibility
  const navSlide = getContext("navSlide");

  onMount(() => {
    if (navSlide) {
      navSlide.set(true); // Hide the navbar by default on this page
      return () => {
        navSlide.set(false); // Show the navbar again when leaving this page
      };
    }
  });

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

<style>
  .overview-image-wrapper {
    background: #fff;
  }

  .overview-static-image {
    max-width: 100%;
    max-height: 100%;
    width: auto;
    height: auto;
    object-fit: contain;
  }
</style>
