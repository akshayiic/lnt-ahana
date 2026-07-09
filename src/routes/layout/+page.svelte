<script>
  import { getContext, onDestroy } from "svelte";
  import { zoomable } from "$lib/zoomable.js";
  import { writable } from "svelte/store";
  import minimizeBtn from "$lib/images/minimize-icon.svg";
  import maximizeBtn from "$lib/images/maximize-icon.svg";
  let hotspotName = getContext("hotspotName");
  let unsubscribeHotSpot;
  import { onMount } from "svelte";
  const isInteriorsMinimized = writable(false);
  const ishighlights = writable();
  $ishighlights = false;

  // Static images mapping for floor plans - using remote images
  const floorPlanImages = {
    // Tower 1 (Tower A)
    "tower-a-1": "https://assets.vestate.io/lnt-ahana/interior/tower-a/1.jpg",
    "tower-a-2": "https://assets.vestate.io/lnt-ahana/interior/tower-a/2.jpg",
    "tower-a-3": "https://assets.vestate.io/lnt-ahana/interior/tower-a/3.jpg",
    "tower-a-4": "https://assets.vestate.io/lnt-ahana/interior/tower-a/4.jpg",
    "tower-a-5": "https://assets.vestate.io/lnt-ahana/interior/tower-a/5.jpg",
    "tower-a-6": "https://assets.vestate.io/lnt-ahana/interior/tower-a/6.jpg",
    "tower-a-7": "https://assets.vestate.io/lnt-ahana/interior/tower-a/7.jpg",
    "tower-a-8": "https://assets.vestate.io/lnt-ahana/interior/tower-a/8.jpg",
    "tower-a-9": "https://assets.vestate.io/lnt-ahana/interior/tower-a/9.jpg",
    "tower-a-10": "https://assets.vestate.io/lnt-ahana/interior/tower-a/10.jpg",
    "tower-a-11": "https://assets.vestate.io/lnt-ahana/interior/tower-a/11.jpg",
    "tower-a-12": "https://assets.vestate.io/lnt-ahana/interior/tower-a/12.jpg",
    "tower-a-13": "https://assets.vestate.io/lnt-ahana/interior/tower-a/13.jpg",
    "tower-a-14": "https://assets.vestate.io/lnt-ahana/interior/tower-a/14.jpg",
    "tower-a-15": "https://assets.vestate.io/lnt-ahana/interior/tower-a/15.jpg",
    "tower-a-16": "https://assets.vestate.io/lnt-ahana/interior/tower-a/16.jpg",

    // Tower 2 (Tower B)
    "tower-b-1": "https://assets.vestate.io/lnt-ahana/interior/tower-b/1.jpg",
    "tower-b-2": "https://assets.vestate.io/lnt-ahana/interior/tower-b/2.jpg",
    "tower-b-3": "https://assets.vestate.io/lnt-ahana/interior/tower-b/3.jpg",
    "tower-b-4": "https://assets.vestate.io/lnt-ahana/interior/tower-b/4.jpg",
    "tower-b-5": "https://assets.vestate.io/lnt-ahana/interior/tower-b/5.jpg",
    "tower-b-6": "https://assets.vestate.io/lnt-ahana/interior/tower-b/6.jpg",
    "tower-b-7": "https://assets.vestate.io/lnt-ahana/interior/tower-b/7.jpg",
    "tower-b-8": "https://assets.vestate.io/lnt-ahana/interior/tower-b/8.jpg",
    "tower-b-9": "https://assets.vestate.io/lnt-ahana/interior/tower-b/9.jpg",
    "tower-b-10": "https://assets.vestate.io/lnt-ahana/interior/tower-b/10.jpg",
    "tower-b-11": "https://assets.vestate.io/lnt-ahana/interior/tower-b/11.jpg",
  };

  // Simple flat list of floor plans
  const floorPlansList = [
    // Tower 1 (Tower A)
    { id: "tower-a-1", label: "1", tower: "tower-a" },
    // { id: "tower-a-2", label: "Plan 2", tower: "tower-a" },
    // { id: "tower-a-3", label: "Plan 3", tower: "tower-a" },
    { id: "tower-a-4", label: "2", tower: "tower-a" },
    { id: "tower-a-5", label: "3", tower: "tower-a" },
    { id: "tower-a-6", label: "4", tower: "tower-a" },
    { id: "tower-a-7", label: "5", tower: "tower-a" },
    { id: "tower-a-8", label: "6", tower: "tower-a" },
    { id: "tower-a-9", label: "7", tower: "tower-a" },
    { id: "tower-a-10", label: "8", tower: "tower-a" },
    { id: "tower-a-11", label: "9", tower: "tower-a" },
    { id: "tower-a-12", label: "10", tower: "tower-a" },
    { id: "tower-a-13", label: "11", tower: "tower-a" },
    { id: "tower-a-14", label: "12", tower: "tower-a" },
    { id: "tower-a-15", label: "13", tower: "tower-a" },
    { id: "tower-a-16", label: "14", tower: "tower-a" },

    // Tower 2 (Tower B)
    { id: "tower-b-1", label: "1", tower: "tower-b" },
    { id: "tower-b-4", label: "2", tower: "tower-b" },
    { id: "tower-b-5", label: "3", tower: "tower-b" },
    { id: "tower-b-6", label: "4", tower: "tower-b" },
    { id: "tower-b-7", label: "5", tower: "tower-b" },
    { id: "tower-b-8", label: "6", tower: "tower-b" },
    { id: "tower-b-9", label: "7", tower: "tower-b" },
    { id: "tower-b-10", label: "8", tower: "tower-b" },
    { id: "tower-b-11", label: "9", tower: "tower-b" },
  ];

  let selectedTower = "tower-a";
  let currentImage = writable();
  let isLoaded = true;
  let activeSrc = "";
  let prevSrc = "";
  let pageNumber = 1;

  $: displaySrc = $currentImage || floorPlanImages[floorPlansList[0].id];
  $: {
    if (displaySrc && displaySrc !== activeSrc) {
      prevSrc = activeSrc;
      activeSrc = displaySrc;
      if (prevSrc) {
        isLoaded = false;
      } else {
        isLoaded = true;
      }
    }
  }

  $: filteredFloorPlans = floorPlansList.filter((fp) => fp.tower === selectedTower);

  // Sync selectedTower and pageNumber with $hotspotName
  $: {
    const currentPlanId = $hotspotName;
    const matchedPlan = floorPlansList.find((fp) => fp.id === currentPlanId);
    if (matchedPlan) {
      if (selectedTower !== matchedPlan.tower) {
        selectedTower = matchedPlan.tower;
      }
      const index = floorPlansList
        .filter((fp) => fp.tower === matchedPlan.tower)
        .findIndex((fp) => fp.id === currentPlanId);
      if (index !== -1) {
        pageNumber = index + 1;
      }
    }
  }

  function handleTowerChange() {
    const firstPlan = floorPlansList.find((fp) => fp.tower === selectedTower);
    if (firstPlan) {
      $hotspotName = firstPlan.id;
      pageNumber = 1;
    }
  }

  function nextPage() {
    if (pageNumber < filteredFloorPlans.length) {
      const nextPlan = filteredFloorPlans[pageNumber];
      if (nextPlan) {
        $hotspotName = nextPlan.id;
      }
    }
  }

  function prevPage() {
    if (pageNumber > 1) {
      const prevPlan = filteredFloorPlans[pageNumber - 2];
      if (prevPlan) {
        $hotspotName = prevPlan.id;
      }
    }
  }

  onMount(() => {
    // Determine initial tower based on hotspotName or default to tower-a
    const initialPlan = floorPlansList.find((fp) => fp.id === $hotspotName) || floorPlansList[0];
    selectedTower = initialPlan.tower;
    $hotspotName = initialPlan.id;

    // Subscribe to hotspot changes to update the displayed image
    unsubscribeHotSpot = hotspotName.subscribe((changedHotspot) => {
      console.log("Current hotspot:", changedHotspot);
      if (changedHotspot != "Exterior" && changedHotspot != "ExteriorImg") {
        const imagePath = floorPlanImages[changedHotspot];
        if (imagePath) {
          currentImage.set(imagePath);
          console.log("Displaying image:", imagePath);
        }
      }
    });

    // Set initial image
    const initialImage = floorPlanImages[$hotspotName];
    if (initialImage) {
      currentImage.set(initialImage);
    }
  });

  onDestroy(() => {
    if (unsubscribeHotSpot) unsubscribeHotSpot();
  });
</script>

{#if !$ishighlights}
  <!-- Left Bottom Control Panel -->
  <div class="left-panel-wrapper">
    <div class="left-panel p-2">
      <div class="left-panel--header flex justify-between items-center gap-2">
        <div
          class="left-title-head flex items-center font-bold"
          style="white-space: nowrap;"
        >
          <svg
            class="mr-2"
            width="17"
            height="17"
            viewBox="0 0 17 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8.68982 16.9237C6.64273 16.9237 4.59877 16.9144 2.55168 16.9299C2.14038 16.9331 1.87036 16.6185 1.87036 16.2479C1.8735 14.426 1.8735 12.6042 1.8735 10.7823C1.8735 9.80127 1.8735 8.82026 1.8735 7.83925C1.8735 7.78319 1.90176 7.70845 1.85152 7.67731C1.80129 7.64616 1.75419 7.71468 1.7071 7.74271C1.40255 7.93891 1.09799 8.13823 0.790301 8.33443C0.755764 8.35623 0.708668 8.38737 0.680411 8.37803C0.627036 8.35934 0.649014 8.29706 0.649014 8.25346C0.649014 7.61502 0.649014 6.97659 0.645874 6.33815C0.645874 6.23538 0.683551 6.17621 0.765183 6.12326C1.87664 5.3914 2.9881 4.65953 4.1027 3.93078C4.74634 3.50723 5.38998 3.0868 6.03363 2.66637C6.86879 2.11825 7.70709 1.57636 8.53912 1.02512C8.65529 0.947263 8.74634 0.950378 8.86251 1.02824C9.60348 1.5203 10.3476 2.00613 11.0917 2.49197C12.4512 3.38578 13.8138 4.27958 15.1733 5.17028C15.6569 5.48794 16.1372 5.8056 16.6239 6.11703C16.7181 6.17621 16.7558 6.24472 16.7526 6.35684C16.7463 6.98593 16.7495 7.61191 16.7495 8.241C16.7495 8.28771 16.7683 8.35 16.7275 8.3718C16.6773 8.40294 16.6333 8.34689 16.5925 8.31886C16.2817 8.11954 15.974 7.91711 15.6631 7.71779C15.6286 7.69599 15.5878 7.63994 15.5438 7.67108C15.5218 7.68665 15.525 7.74894 15.525 7.78942C15.525 9.21578 15.525 10.6421 15.525 12.0716C15.525 13.4668 15.5187 14.862 15.5281 16.2604C15.5313 16.6247 15.211 16.9237 14.8562 16.9237C12.7997 16.9175 10.7432 16.9237 8.68982 16.9237ZM8.70238 15.6562C10.4795 15.6562 12.2597 15.6562 14.0368 15.6562C14.244 15.6562 14.244 15.6562 14.244 15.4506C14.244 12.6135 14.244 9.77324 14.2471 6.9361C14.2471 6.82087 14.2032 6.7617 14.1121 6.70253C13.3649 6.21981 12.6207 5.73397 11.8798 5.24502C10.8594 4.57545 9.83582 3.90275 8.81855 3.23006C8.73064 3.17089 8.66785 3.174 8.58307 3.23317C8.18119 3.50412 7.77617 3.76572 7.37114 4.03044C6.00537 4.92425 4.63959 5.82117 3.27382 6.71187C3.18276 6.77104 3.15451 6.83644 3.15765 6.94233C3.16079 9.77013 3.16079 12.5979 3.16079 15.4257C3.16079 15.6593 3.16079 15.6593 3.40254 15.6593C5.16392 15.6562 6.93158 15.6562 8.70238 15.6562Z"
              fill="#630a38"
            />
            <path
              d="M11.1368 15.0858C11.0897 15.0858 11.0426 15.0858 10.9955 15.0858C10.6125 15.0858 10.4994 14.9861 10.4838 14.6155C10.4775 14.4847 10.399 14.494 10.3142 14.494C9.61719 14.494 8.92331 14.494 8.2263 14.494C7.84325 14.494 7.46334 14.4972 7.0803 14.4909C6.95471 14.4878 6.91703 14.5314 6.92017 14.6529C6.92331 14.9425 6.77261 15.0858 6.47747 15.0858C6.31421 15.0858 6.15408 15.0889 5.99082 15.0858C5.7679 15.0826 5.59835 14.9207 5.58266 14.6996C5.58266 14.6778 5.57952 14.6591 5.58266 14.6373C5.62661 14.3041 5.5544 14.0269 5.30008 13.7715C5.08658 13.5566 5.00809 13.2545 4.98611 12.9462C4.97983 12.8434 4.96413 12.7407 4.95785 12.6379C4.95471 12.5818 4.91704 12.56 4.87308 12.5351C4.4712 12.3265 4.30479 12.0088 4.36131 11.5479C4.40212 11.2022 4.73179 10.8565 5.10228 10.7693C5.60463 10.6541 6.13211 10.9998 6.23572 11.5012C6.27339 11.6787 6.24827 11.8624 6.29537 12.04C6.40526 12.4542 6.58422 12.5974 7.02065 12.5974C8.13838 12.5974 9.25926 12.5974 10.377 12.5974C10.8762 12.5974 11.0803 12.4137 11.1368 11.8375C11.1619 11.5884 11.1776 11.3455 11.3409 11.1368C11.5732 10.8378 11.8746 10.7133 12.2451 10.7631C12.5874 10.8098 12.8323 11.0122 12.9704 11.3143C13.1588 11.7285 13.0552 12.3078 12.5277 12.532C12.4461 12.5663 12.4524 12.6317 12.4461 12.7002C12.4241 13.0801 12.355 13.4507 12.107 13.7591C12.0473 13.8307 12.0002 13.9241 11.9249 13.9708C11.7648 14.0705 11.7459 14.2106 11.7553 14.3726C11.7616 14.5034 11.7585 14.6311 11.7585 14.7619C11.7553 14.9612 11.6392 15.0764 11.4351 15.0826C11.3346 15.0889 11.2341 15.0889 11.1368 15.0858Z"
              fill="#630a38"
            />
            <path
              d="M8.7684 8.36811C9.39634 8.36811 10.0243 8.37434 10.6522 8.36811C11.5784 8.35565 12.445 9.14357 12.4795 10.0623C12.4795 10.0872 12.4827 10.1152 12.4921 10.1402C12.5204 10.2305 12.4984 10.2647 12.3948 10.2492C12.0149 10.1869 11.6538 10.2585 11.3304 10.4609C10.9191 10.7163 10.7056 11.0963 10.6585 11.5727C10.6522 11.6288 10.6459 11.6849 10.6365 11.7409C10.5832 12.0368 10.5832 12.0368 10.288 12.0368C9.21424 12.0368 8.14359 12.0368 7.06981 12.0368C6.85631 12.0368 6.85945 12.0368 6.83747 11.8281C6.80294 11.498 6.77154 11.1679 6.56118 10.8876C6.20325 10.4142 5.74485 10.162 5.13261 10.246C5.04469 10.2585 5.01958 10.2305 5.02272 10.1495C5.05097 9.6699 5.23308 9.25258 5.56903 8.91312C5.8987 8.57988 6.30372 8.38057 6.77782 8.37122C7.4403 8.35877 8.10592 8.36811 8.7684 8.36811Z"
              fill="#630a38"
            />
          </svg>
          Layout
        </div>
        <button
          on:click={() => {
            $isInteriorsMinimized = !$isInteriorsMinimized;
          }}
          class="ghost-btn close-btn border border-transparent !px-0 !py-0"
          id="minimize-toggle-interiors"
        >
          {#if !$isInteriorsMinimized}
            <img id="int-mm" src={minimizeBtn} alt="minimize" />
          {/if}
          {#if $isInteriorsMinimized}
            <img id="int-mx" src={maximizeBtn} alt="maximize" />
          {/if}
        </button>
      </div>

      <div class={!$isInteriorsMinimized ? "block" : "hidden"}>
        <div class="pt-3">
          <div class="inner-btn-group flex flex-col gap-1">
            <button
              class={selectedTower === "tower-a" ? "active inner-modal-btn" : "inner-modal-btn"}
              on:click={() => {
                selectedTower = "tower-a";
                handleTowerChange();
              }}
            >
              Tower A
            </button>
            <button
              class={selectedTower === "tower-b" ? "active inner-modal-btn" : "inner-modal-btn"}
              on:click={() => {
                selectedTower = "tower-b";
                handleTowerChange();
              }}
            >
              Tower B
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Top Image Changer -->
  <div
    class="user-select-none fixed left-2 right-auto lg:left-0 lg:right-0 mx-0 lg:mx-auto top-3 lg:top-5 z-[999] ml-0 lg:ml-[4rem] mb-2 flex items-center justify-center gap-1 lg:gap-4 py-1 px-1.5 lg:py-2.5 lg:px-4"
    style="background: white;
         width: fit-content;
         border-radius: 1rem;
         box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);"
  >
    <!-- Previous Button -->
    <button
      on:click={prevPage}
      class="primary-btn px-2 py-0.5 text-[10px] font-semibold min-w-[55px] lg:px-5 lg:py-1.5 lg:text-sm lg:min-w-[100px] flex items-center justify-center text-center disabled:opacity-50 disabled:pointer-events-none transition-all"
      disabled={pageNumber === 1}
    >
      <span class="hidden lg:inline">Previous</span>
      <span class="inline lg:hidden">Prev</span>
    </button>

    <!-- Page Indicator -->
    <span class="flex items-center gap-0.5 text-xs font-bold text-gray-800 min-w-[45px] lg:gap-1.5 lg:text-lg lg:min-w-[60px] justify-center"
      ><span id="page_num">{pageNumber}</span>
      <span class="text-gray-400">/</span>
      <span id="page_count"> {filteredFloorPlans.length} </span>
    </span>

    <!-- Next Button -->
    <button
      on:click={nextPage}
      class="primary-btn px-2 py-0.5 text-[10px] font-semibold min-w-[55px] lg:px-5 lg:py-1.5 lg:text-sm lg:min-w-[100px] flex items-center justify-center text-center disabled:opacity-50 disabled:pointer-events-none transition-all"
      disabled={pageNumber === filteredFloorPlans.length}
    >
      Next
    </button>
  </div>
{/if}

<!-- Static Image Container -->
<div id="floor-plans-image-container" class="floor-plans-image-wrapper">
  {#if !isLoaded && prevSrc}
    <img
      src={prevSrc}
      alt="Floor Plan Previous"
      class="floor-plans-static-image absolute inset-0 filter blur-[8px] scale-105 pointer-events-none"
    />
  {/if}

  <img
    src={activeSrc}
    alt="Floor Plan"
    class="floor-plans-static-image transition-opacity duration-300 mx-auto {isLoaded ? 'opacity-100' : 'opacity-0'}"
    style="width: auto; height: 100vh; max-width: 100%; max-height: 100vh; object-fit: contain;"
    on:load={() => { isLoaded = true; }}
    on:error={() => { isLoaded = true; }}
    use:zoomable
  />
</div>

<style>
  .floor-plans-image-wrapper {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #fff;
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    overflow: hidden;
  }

  .floor-plans-static-image {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
  }

  .left-panel-wrapper {
    position: fixed;
    bottom: 20px;
    left: 20px;
    z-index: 2000000001;
    max-height: 90vh;
    width: 200px;
  }

  @media (max-width: 1024px) {
    .left-panel-wrapper {
      bottom: 75px;
      top: auto;
      left: 10px;
      right: auto;
      width: calc(100% - 20px);
      max-width: 150px;
      transform: none;
      max-height: 80vh;
    }

    .floor-plans-image-wrapper {
      top: 0;
    }
  }
</style>
