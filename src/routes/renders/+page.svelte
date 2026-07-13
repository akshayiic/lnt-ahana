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
    overview:
      "https://assets.vestate.io/lnt-ahana/amenities/main.png",
       exterior2:
      "https://assets.vestate.io/lnt-ahana/amenities/exterior2.webp",
          exterior3:
      "https://assets.vestate.io/lnt-ahana/amenities/exterior3.webp",
    "Main Entrance":
      "https://assets.vestate.io/lnt-ahana/amenities/Main%20Entrance.webp",
    "Main Entrance 2":
      "https://assets.vestate.io/lnt-ahana/amenities/Main%20Entrance%202.webp",
    "Pavilion 1":
      "https://assets.vestate.io/lnt-ahana/amenities/Cabana%20Seating.webp",
    "Pavilion 2":
      "https://assets.vestate.io/lnt-ahana/amenities/Cabana%20Seating%202.webp",
    "Pavilion 3":
      "https://assets.vestate.io/lnt-ahana/amenities/Cabana%20Seating%203.webp",
    "Community Lawn":
      "https://assets.vestate.io/lnt-ahana/amenities/Community%20Lawn.webp",
    "Dropoff":
      "https://assets.vestate.io/lnt-ahana/amenities/Dropoff%202.webp",
    "Dropoff 2":
      "https://assets.vestate.io/lnt-ahana/amenities/Dropoff%202.webp",
    "Kids Play Area":
      "https://assets.vestate.io/lnt-ahana/amenities/Kids%20Play%20Area%202.webp",
    "Multipurpose Court":
      "https://assets.vestate.io/lnt-ahana/amenities/Multipurpose%20Court.webp",
    "Pool Deck":
      "https://assets.vestate.io/lnt-ahana/amenities/Pool%20Deck.webp",
    "Swimming Pool":
      "https://assets.vestate.io/lnt-ahana/amenities/Swimming%20Pool%201.webp",
    "Retail Area":
      "https://assets.vestate.io/lnt-ahana/amenities/Retail%20Area.webp",
    "Senior Citizen Seating":
      "https://assets.vestate.io/lnt-ahana/amenities/Senior%20Citizen%20Seating.webp",
    // Interior Amenities
    "Arcade Room":
      "https://assets.vestate.io/lnt-ahana/amenities/Arcade%20Room%201.webp",
    "Arcade Room 2":
      "https://assets.vestate.io/lnt-ahana/amenities/Arcade%20Room%202.webp",
    "Arcade Room 3":
      "https://assets.vestate.io/lnt-ahana/amenities/Arcade%20Room%203.webp",
    "Co-Working Space":
      "https://assets.vestate.io/lnt-ahana/amenities/Co-Working%20Space.webp",
    "Gym":
      "https://assets.vestate.io/lnt-ahana/amenities/Gym%201.webp",
    "Gym 2":
      "https://assets.vestate.io/lnt-ahana/amenities/Gym%202.webp",
    "Gym 3":
      "https://assets.vestate.io/lnt-ahana/amenities/Gym%203.webp",
    "Gym 4":
      "https://assets.vestate.io/lnt-ahana/amenities/Gym%204.webp",
    "Health Cafe":
      "https://assets.vestate.io/lnt-ahana/amenities/Health%20Cafe.webp",
    "Kids Digital Room":
      "https://assets.vestate.io/lnt-ahana/amenities/Kids%20Digital%20Room.webp",
    "Kids Digital Room 2":
      "https://assets.vestate.io/lnt-ahana/amenities/Kids%20Digital%20Room%202.webp",
    "Kids Digital Room 3":
      "https://assets.vestate.io/lnt-ahana/amenities/Kids%20Digital%20Room%203.webp",
    "Meeting Rooms":
      "https://assets.vestate.io/lnt-ahana/amenities/Meeting%20Rooms.webp",
    "Multipurpose Hall":
      "https://assets.vestate.io/lnt-ahana/amenities/Multipurpose%20Hall.webp",
    "Pilate Room":
      "https://assets.vestate.io/lnt-ahana/amenities/Pilate%20Room.webp",
    "Reception Lobby":
      "https://assets.vestate.io/lnt-ahana/amenities/Reception%20Lobby.webp",
    "Senior Citizen Area":
      "https://assets.vestate.io/lnt-ahana/amenities/Senior%20Citizen%20Area.webp",
    "Senior Citizen Area 2":
      "https://assets.vestate.io/lnt-ahana/amenities/Senior%20Citizen%20Area%202.webp",
    "Sports Cafe":
      "https://assets.vestate.io/lnt-ahana/amenities/Sports%20Cafe.webp",
    "Sports Cafe 2":
      "https://assets.vestate.io/lnt-ahana/amenities/Sports%20Cafe%202.webp",
    "Yoga Room":
      "https://assets.vestate.io/lnt-ahana/amenities/Yoga%20Room.webp",
      "Community Lawn":
       "https://assets.vestate.io/lnt-ahana/amenities/Community%20Lawn.webp",
  };

  // Categories with expandable sections
  let amenityCategories = [
    {
      id: "exterior",
      name: "Exterior",
      expanded: true,
      items: [
        { id: "overview", label: "L&T Ahana" },
           { id: "exterior3", label: "Exterior 2" },
      ]
    },
    {
      id: "landscape",
      name: "Landscape Amenities",
      expanded: true,
      items: [
               { id: "exterior2", label: "Main Entrance" },
        { id: "Main Entrance 2", label: "Main Entrance 2" },
        { id: "Community Lawn", label: "Community Lawn" },
        { id: "Pavilion 1", label: "Pavilion 1" },
        { id: "Pavilion 2", label: "Pavilion 2" },
        { id: "Pavilion 3", label: "Pavilion 3" },
          { id: "Dropoff", label: "Dropoff" },
        { id: "Multipurpose Court", label: "Multipurpose Court" },
        { id: "Kids Play Area", label: "Kids Play Area" },
        { id: "Swimming Pool", label: "Swimming Pool" },
        { id: "Pool Deck", label: "Pool Deck" },
        { id: "Senior Citizen Seating", label: "Senior Citizen Seating" },
        { id: "Retail Area", label: "Retail Area" },
      ]
    },
    {
      id: "interior-amenities",
      name: "Interior Amenities",
      expanded: false,
      items: [
        { id: "Reception Lobby", label: "Reception Lobby" },
        { id: "Arcade Room", label: "Arcade Room 1" },
        { id: "Arcade Room 2", label: "Arcade Room 2" },
        { id: "Arcade Room 3", label: "Arcade Room 3" },
            { id: "Community Lawn", label: "Community Lawn" },
        { id: "Gym", label: "Gym 1" },
        { id: "Gym 2", label: "Gym 2" },
        { id: "Gym 3", label: "Gym 3" },
        { id: "Gym 4", label: "Gym 4" },
        { id: "Yoga Room", label: "Yoga Room" },
        { id: "Pilate Room", label: "Pilate Room" },
        { id: "Co-Working Space", label: "Co-Working Space" },
        { id: "Meeting Rooms", label: "Meeting Rooms" },
        { id: "Multipurpose Hall", label: "Multipurpose Hall" },
        { id: "Kids Digital Room", label: "Kids Digital Room 1" },
        { id: "Kids Digital Room 2", label: "Kids Digital Room 2" },
        { id: "Kids Digital Room 3", label: "Kids Digital Room 3" },
        { id: "Senior Citizen Area", label: "Senior Citizen Area 1" },
        { id: "Senior Citizen Area 2", label: "Senior Citizen Area 2" },
        { id: "Sports Cafe", label: "Sports Cafe 1" },
        { id: "Sports Cafe 2", label: "Sports Cafe 2" },
        { id: "Health Cafe", label: "Health Cafe" },
      ]
    },
  ];

  let currentImage = writable();
  let isLoaded = true;
  let activeSrc = "";
  let prevSrc = "";
  let imgEl;

  // Helper function to get all items as flat list
  const getAllItems = () => {
    return amenityCategories.flatMap(cat => cat.items);
  };

  // Toggle category expansion - only one can be open at a time
  const toggleCategory = (categoryId) => {
    const category = amenityCategories.find(c => c.id === categoryId);
    if (category) {
      // Close all other categories
      amenityCategories.forEach(cat => {
        if (cat.id !== categoryId) {
          cat.expanded = false;
        }
      });
      // Toggle the clicked category
      category.expanded = !category.expanded;
      amenityCategories = amenityCategories; // Trigger reactivity
    }
  };

  const SELECTED_RENDER_KEY = "renders-selected";

  const getSavedRender = () => {
    try {
      const saved = localStorage.getItem(SELECTED_RENDER_KEY);
      return saved && amenityImages[saved] ? saved : null;
    } catch (e) {
      return null;
    }
  };

  const saveRender = (id) => {
    try {
      localStorage.setItem(SELECTED_RENDER_KEY, id);
    } catch (e) {
      // storage unavailable (private mode / iframe restrictions)
    }
  };

  $: displaySrc = $currentImage || amenityImages[getAllItems()[0]?.id];
  $: {
    if (displaySrc && displaySrc !== activeSrc) {
      prevSrc = activeSrc;
      activeSrc = displaySrc;
      isLoaded = false;
    }
  }

  onMount(() => {
    // Restore the last selected render after a refresh, else start on the 1st
    const allItems = getAllItems();
    $hotspotName = getSavedRender() || allItems[0].id;
    console.log("Static images mode enabled");

    // Subscribe to hotspot changes to update the displayed image
    unsubscribeHotSpot = hotspotName.subscribe((changedHotspot) => {
      console.log("Current hotspot:", changedHotspot);
      if (changedHotspot != "Exterior" && changedHotspot != "ExteriorImg") {
        const imagePath = amenityImages[changedHotspot];
        if (imagePath) {
          currentImage.set(imagePath);
          saveRender(changedHotspot);
          console.log("Displaying image:", imagePath);
        }
      }
    });

    // Set initial image
    const initialImage = amenityImages[$hotspotName];
    if (initialImage) {
      currentImage.set(initialImage);
    }

    // On a hard refresh the prerendered <img> may finish loading before
    // hydration attaches on:load, so the event is missed and the image
    // stays at opacity-0 — check .complete to recover.
    if (imgEl && imgEl.complete && imgEl.naturalWidth > 0) {
      isLoaded = true;
    }
  });

  onDestroy(() => {
    if (unsubscribeHotSpot) unsubscribeHotSpot();
  });
</script>

{#if !$ishighlights}
  <div class="left-panel-wrapper">
    <div class="left-panel p-2">
      <div class="left-panel--header flex justify-between items-center gap-2">
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
              fill="#630a38"
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
          {#each amenityCategories as category}
            <div class="category-section">
              <button
                class="category-header flex items-center justify-between w-full py-2 px-3 text-left font-semibold text-sm"
                on:click={() => toggleCategory(category.id)}
              >
                <span>{category.name}</span>
                <svg
                  class="chevron {category.expanded ? 'rotate-0' : 'rotate-[-90deg]'}"
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2 4.5L6 8.5L10 4.5"
                    stroke="currentColor"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </button>
              {#if category.expanded}
                <div class="inner-btn-group">
                  {#if category.items.length > 0}
                    {#each category.items as amenity}
                      <button
                        class={$hotspotName == amenity.id
                          ? "active inner-modal-btn whitespace-normal text-left"
                          : "inner-modal-btn whitespace-normal text-left"}
                        id={amenity.id + "-am"}
                        on:click={() => ($hotspotName = amenity.id)}
                      >
                        {amenity.label}
                      </button>
                    {/each}
                  {:else}
                    <div class="px-3 py-2 text-xs text-gray-400 italic">
                      No items
                    </div>
                  {/if}
                </div>
              {/if}
            </div>
          {/each}
        </div>
      </div>
    </div>
  </div>
{/if}

<!-- Static Image Container -->
<div id="amenities-image-container" class="amenities-image-wrapper">
  {#if !isLoaded && prevSrc}
    <img
      src={prevSrc}
      alt="Amenity Previous"
      class="amenities-static-image absolute inset-0 filter blur-[8px] scale-105 pointer-events-none"
    />
  {/if}

  <img
    bind:this={imgEl}
    src={activeSrc}
    alt="Amenity"
    class="amenities-static-image transition-opacity duration-300 {isLoaded ? 'opacity-100' : 'opacity-0'}"
    on:load={() => { isLoaded = true; }}
    on:error={() => { isLoaded = true; }}
    use:zoomable
  />
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
    object-fit: contain;
  }

  .left-panel-wrapper {
    position: fixed;
    bottom: 20px;
    left: 20px;
    z-index: 2000000001;
    max-height: 90vh;
    width: 250px;
  }

  .category-section {
    margin-bottom: 0.5rem;
  }

  .category-header {
    background: rgba(99, 10, 56, 0.1);
    color: #630a38;
    border-radius: 0.375rem;
    transition: background 0.2s;
  }

  .category-header:hover {
    background: rgba(99, 10, 56, 0.15);
  }

  .chevron {
    transition: transform 0.2s ease;
  }

  @media (max-width: 1080px) {
    .left-panel-wrapper {
      bottom: 75px;
      top: auto;
      left: 10px;
      right: auto;
      width: calc(100% - 20px);
      max-width: 180px;
      transform: none;
      max-height: 80vh;
    }

    .amenities-image-wrapper {
      top: 0;
    }
  }
</style>
