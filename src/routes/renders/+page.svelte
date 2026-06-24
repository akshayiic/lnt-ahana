<script>
  import { getContext, onDestroy } from "svelte";
  import { zoomable } from "$lib/zoomable.js";
  import minimizeBtn from "$lib/images/minimize-icon.svg";
  import maximizeBtn from "$lib/images/maximize-icon.svg";
  import { page } from "$app/stores";
  import { setContext } from "svelte";
  import { writable } from "svelte/store";
  let hotspotName = getContext("hotspotName");
  import { goto } from "$app/navigation";
  let unsubscribeHotSpot;
  import { onMount } from "svelte";
  const isAmenitiesMinimized = writable();
  const ishighlights = writable();
  setContext("isAmenitiesMinimized", isAmenitiesMinimized);
  $: isAmenitiesMinimized.set(false);
  $ishighlights = false;

  // Static images mapping for amenities - using remote images
  const amenityImages = {
    "Badminton_Piclkleball court":
      "https://assets.vestate.io/webtool/narang/valora/brochure/amenities/Badminton_Piclkleball%20court.webp",
    "Banquet 300 01":
      "https://assets.vestate.io/webtool/narang/valora/brochure/amenities/Banquet%20300%2001.webp",
    "Bussines Center":
      "https://assets.vestate.io/webtool/narang/valora/brochure/amenities/Bussines%20Center.webp",
    "Gym 300 01":
      "https://assets.vestate.io/webtool/narang/valora/brochure/amenities/Gym%20300%2001.webp",
    "Indoor Games 300 01":
      "https://assets.vestate.io/webtool/narang/valora/brochure/amenities/Indoor%20Games%20300%2001.webp",
    "Kids Creche":
      "https://assets.vestate.io/webtool/narang/valora/brochure/amenities/Kids%20Creche.webp",
    "Lobby 300 01":
      "https://assets.vestate.io/webtool/narang/valora/brochure/amenities/Lobby%20300%2001.webp",
    "Lounge 300 01":
      "https://assets.vestate.io/webtool/narang/valora/brochure/amenities/Lounge%20300%2001.webp",
    "Lounge 300 02":
      "https://assets.vestate.io/webtool/narang/valora/brochure/amenities/Lounge%20300%2002.webp",
    "Yoga 300 01":
      "https://assets.vestate.io/webtool/narang/valora/brochure/amenities/Yoga%20300%2001.webp",
    salon:
      "https://assets.vestate.io/webtool/narang/valora/brochure/amenities/salon.webp",
    outdoor_lawn:
      "https://assets.vestate.io/webtool/narang/valora/brochure/amenities/outdoor_lawn.webp",
    balcony1:
      "https://assets.vestate.io/webtool/narang/valora/brochure/amenities/balcony1.webp",
    balcony2:
      "https://assets.vestate.io/webtool/narang/valora/brochure/amenities/balcony2.webp",
    balcony3:
      "https://assets.vestate.io/webtool/narang/valora/brochure/amenities/balcony3.webp",
    bedroom:
      "https://assets.vestate.io/webtool/narang/valora/brochure/amenities/bedroom.webp",
    living1:
      "https://assets.vestate.io/webtool/narang/valora/brochure/amenities/living1.webp",
    living2:
      "https://assets.vestate.io/webtool/narang/valora/brochure/amenities/living2.webp",
    overview:
      "https://assets.vestate.io/webtool/narang/valora/brochure/overview/FRONT%20FACEING.webp",
  };

  // Simple flat list of amenities
  const amenitiesList = [
    { id: "overview", label: "Overview" },
    { id: "outdoor_lawn", label: "Outdoor Lawn" },
    { id: "Badminton_Piclkleball court", label: "Badminton/Pickleball Court" },
    { id: "Banquet 300 01", label: "Banquet" },
    { id: "Bussines Center", label: "Business Center" },
    { id: "Gym 300 01", label: "Gym" },
    { id: "Indoor Games 300 01", label: "Indoor Games" },
    { id: "Kids Creche", label: "Kids Creche" },
    { id: "Lobby 300 01", label: "Lobby" },
    { id: "Lounge 300 01", label: "Lounge 1" },
    { id: "Lounge 300 02", label: "Lounge 2" },
    { id: "Yoga 300 01", label: "Yoga" },
    { id: "salon", label: "Salon" },
    { id: "balcony1", label: "Balcony 1" },
    { id: "balcony2", label: "Balcony 2" },
    { id: "balcony3", label: "Balcony 3" },
    { id: "bedroom", label: "Bedroom" },
    { id: "living1", label: "Living 1" },
    { id: "living2", label: "Living 2" },
  ];

  let currentImage = writable();

  onMount(() => {
    $hotspotName = amenitiesList[0].id;
    console.log("Static images mode enabled");

    // Subscribe to hotspot changes to update the displayed image
    unsubscribeHotSpot = hotspotName.subscribe((changedHotspot) => {
      console.log("Current hotspot:", changedHotspot);
      if (changedHotspot != "Exterior" && changedHotspot != "ExteriorImg") {
        const imagePath = amenityImages[changedHotspot];
        if (imagePath) {
          currentImage.set(imagePath);
          console.log("Displaying image:", imagePath);
        }
      }
    });

    // Set initial image
    const initialImage = amenityImages[$hotspotName];
    if (initialImage) {
      currentImage.set(initialImage);
    }
  });

  onDestroy(() => {
    if (unsubscribeHotSpot) unsubscribeHotSpot();
  });
</script>

{#if !$ishighlights}
  <div class="left-panel-wrapper">
    <div class="left-panel p-2">
      <div class="left-panel--header flex justify-between gap-[5rem]">
        <div class="left-title flex items-center font-bold">
          <svg
            class="mr-2"
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2.59299 12.6487C2.67866 12.2716 2.78039 11.8043 2.88747 11.3422C3.06951 10.5403 3.25155 9.73834 3.4443 8.94171C3.48178 8.78239 3.44966 8.68148 3.32651 8.57527C2.41095 7.78395 1.50075 6.98732 0.585185 6.20132C0.322831 5.97295 0.172915 5.71272 0.290706 5.36221C0.408498 5.017 0.670851 4.87892 1.02423 4.85236C2.17001 4.75677 3.3158 4.63993 4.46159 4.54965C4.75072 4.5284 4.91134 4.44343 5.02913 4.15664C5.45747 3.09979 5.92863 2.05886 6.37303 1.00731C6.51223 0.67804 6.71034 0.444362 7.09584 0.439052C7.49204 0.433741 7.70086 0.672729 7.84542 1.01262C8.29517 2.0801 8.76633 3.13696 9.21073 4.20975C9.31246 4.45936 9.46773 4.52309 9.70866 4.53902C10.8919 4.63993 12.0698 4.75146 13.2531 4.85236C13.5904 4.88423 13.826 5.03824 13.9331 5.36221C14.0402 5.68617 13.9224 5.95171 13.6707 6.16414C12.7659 6.95015 11.861 7.74146 10.9508 8.52216C10.7956 8.65493 10.7367 8.77708 10.7902 8.99482C11.0686 10.1526 11.331 11.321 11.5933 12.484C11.6683 12.8133 11.6201 13.1054 11.331 13.3125C11.0472 13.5197 10.7527 13.4931 10.4582 13.3125C9.41954 12.6912 8.37548 12.0804 7.34213 11.4537C7.17079 11.3528 7.053 11.3581 6.88702 11.4591C5.84296 12.091 4.7989 12.7124 3.74414 13.3232C3.19801 13.6365 2.6037 13.3232 2.59299 12.6487Z"
              fill="#2596be"
            />
          </svg>
          Renders
        </div>
        <button
          on:click={() => {
            $isAmenitiesMinimized = !$isAmenitiesMinimized;
          }}
          class="ghost-btn close-btn border border-transparent !px-0 !py-0"
          id="minimize-toggle-amenities"
        >
          {#if !$isAmenitiesMinimized}
            <img id="ams-mm" src={minimizeBtn} alt="minimize" />
          {/if}
          {#if $isAmenitiesMinimized}
            <img id="ams-mx" src={maximizeBtn} alt="maximize" />
          {/if}
        </button>
      </div>

      <div class={!$isAmenitiesMinimized ? "block" : "hidden"}>
        <div class="pt-3">
          <div class="inner-btn-group">
            {#each amenitiesList as amenity}
              <button
                class={$hotspotName == amenity.id
                  ? "active inner-modal-btn "
                  : "inner-modal-btn "}
                id={amenity.id + "-am"}
                on:click={() => ($hotspotName = amenity.id)}
              >
                {amenity.label}
              </button>
            {/each}
          </div>
        </div>
      </div>
    </div>
  </div>
{/if}

<!-- Static Image Container -->
<div id="amenities-image-container" class="amenities-image-wrapper">
  {#if $currentImage}
    <img
      src={$currentImage}
      alt="Amenity"
      class="amenities-static-image"
      use:zoomable
    />
  {:else}
    <img
      src={amenityImages[amenitiesList[0].id]}
      alt="Amenity"
      class="amenities-static-image"
      use:zoomable
    />
  {/if}
</div>

<style>
  .amenities-image-wrapper {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #000;
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
  }

  .amenities-static-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .left-panel-wrapper {
    position: fixed;
    bottom: 20px;
    left: 20px;
    z-index: 2000000001;
    max-height: 90vh;
  }

  @media (max-width: 768px) {
    .left-panel-wrapper {
      bottom: 75px;
      top: auto;
      left: 10px;
      right: auto;
      width: calc(100% - 20px);
      max-width: 220px;
      transform: none;
      max-height: 80vh;
    }

    .amenities-image-wrapper {
      top: 0;
    }
  }
</style>
