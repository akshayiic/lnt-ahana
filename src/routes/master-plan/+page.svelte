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
    "https://assets.vestate.io/lnt-ahana/interior/tower-a/2.jpg";

  let isLoaded = true;
  let activeSrc = "";
  let prevSrc = "";
  let imgEl;
  $: {
    if (masterPlanImg && masterPlanImg !== activeSrc) {
      prevSrc = activeSrc;
      activeSrc = masterPlanImg;
      isLoaded = false;
    }
  }

  onMount(() => {
    // On a hard refresh the prerendered <img> may finish loading before
    // hydration attaches on:load, so the event is missed and the image
    // stays at opacity-0 — check .complete to recover.
    if (imgEl && imgEl.complete && imgEl.naturalWidth > 0) {
      isLoaded = true;
    }
  });
</script>

<svelte:head>
  <title>Master Plan - L&T Ahana</title>
</svelte:head>

<div class="overview-image-wrapper">
  {#if !isLoaded && prevSrc}
    <img
      src={prevSrc}
      alt="Master Plan Previous"
      class="overview-static-image absolute inset-0 filter blur-[8px] scale-105 pointer-events-none"
    />
  {/if}

  {#if activeSrc}
    <img
      bind:this={imgEl}
      src={activeSrc}
      alt="Master Plan"
      class="overview-static-image transition-opacity duration-300 {isLoaded ? 'opacity-100' : 'opacity-0'}"
      on:load={() => { isLoaded = true; }}
      on:error={() => { isLoaded = true; }}
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
