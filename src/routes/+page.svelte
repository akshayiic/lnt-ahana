<script>
  import Home from "./Home.svelte";
  import { setContext, getContext } from "svelte";
  import { writable } from "svelte/store";
  import "iconify-icon";
  import poweredByVretail from "$lib/images/powered-vretail.png";
  import instructionIcon from "$lib/images/instruction-icon.svg";
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";
  const currentUI = getContext("currentUI");
  const walkthroughDisabled = getContext("walkthroughDisabled");

  const UIPanel = getContext("UIPanel");

  const instructionPano = writable();
  $: instructionPano.set(true);

  function inIframe() {
    try {
      return window.self !== window.top;
    } catch (e) {
      return true;
    }
  }
  let isIframe = inIframe();

  onMount(async () => {
    function setElementHeight() {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    }
    setElementHeight();
    // Update the height on resize
    window.addEventListener("resize", setElementHeight);
    let lastClickTime = 0;
    const clickTimeout = 300; // Timeout in milliseconds (adjustable)
    if (!(window.self !== window.top) && window.innerWidth < 1200) {
      window.addEventListener("click", () => {
        const now = Date.now();
        if (now - lastClickTime < clickTimeout) {
          if (document.body.requestFullscreen) {
            document.body.requestFullscreen();
          } else if (document.body.webkitRequestFullscreen) {
            /* Safari */
            document.body.webkitRequestFullscreen();
          } else if (document.body.msRequestFullscreen) {
            /* IE11 */
            document.body.msRequestFullscreen();
          }
        }
        lastClickTime = now;
      });
    }

    localStorage.getItem("instructions-view-count") == 4 &&
      instructionPano.set(false);
  });
  setContext("currentUI", currentUI);
  //
</script>

<svelte:head>
  <title>L&T Ahana</title>
  <meta name="description" content="L&T Ahana" />
</svelte:head>

<Home />

{#if $UIPanel == "loading"}
  <div
    class="absolute left-0 top-0 z-[2000000000] h-screen w-screen rounded bg-cover bg-center bg-no-repeat"
    style="background-image: url('https://assets.vestate.io/lnt-ahana/brochure/overview/LOWANGLE%20HAVOC_1.webp');"
  >
    <div class="z-[2000000002] h-screen w-screen bg-gradient-to-t from-black">
      <div
        class="intro center absolute bottom-10 flex w-full flex-col items-center justify-center text-center font-semibold uppercase text-white"
      >
        <button
          id="v-start-btn"
          on:click={() => {
            const isFirstLoad = !localStorage.getItem("first_load_redirected");
            if (isFirstLoad) {
              localStorage.setItem("first_load_redirected", "true");
              goto("/renders");
            } else {
              goto("/renders");
              UIPanel.set("sign-up");
              if (!(window.self !== window.top) && window.innerWidth < 1200) {
                if (document.body.requestFullscreen) {
                  document.body.requestFullscreen();
                } else if (document.body.webkitRequestFullscreen) {
                  /* Safari */
                  document.body.webkitRequestFullscreen();
                } else if (document.body.msRequestFullscreen) {
                  /* IE11 */
                  document.body.msRequestFullscreen();
                }
              }
            }
          }}
          class="bg-all-none !w-fit p-0"
        >
          <img
            id="v-start-img"
            style="width: 100px;"
            src="/start-btn.png"
            alt=""
          />
        </button>

        <div class="title text-2xl">virtual tour experience</div>
        <div class="subtitle">by L&T</div>
      </div>
    </div>
  </div>
  <img
    src={poweredByVretail}
    alt="powered by vretail"
    class="absolute bottom-5 right-6 z-[2000000002]"
  />
{/if}
{#if $UIPanel == "instructions-exterior" && $currentUI.Exterior && $walkthroughDisabled}
  <div class="centered-panel instruction-screen p-4">
    <div class="left-panel--header mb-3 flex justify-between">
      <div class="left-title flex flex-col gap-1 text-left">
        <div class="text-2xl font-bold">Instructions</div>
        See how to explore L&T Ahana
      </div>
      <button
        on:click={() => {
          UIPanel.set("loaded");
          !isIframe && localStorage.setItem("instructions-view-count", "4");
        }}
        id="instruction-close"
        class="ghost-btn close-btn !px-0 !pt-0"
      >
        <svg
          width="42"
          height="42"
          viewBox="0 0 42 42"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            x="0.363281"
            y="0.319336"
            width="41.5884"
            height="41.5884"
            rx="9.50592"
            fill="#ECECEC"
          />
          <path
            d="M15.9062 15.8613L26.4104 26.3655"
            stroke="black"
            stroke-width="2.06369"
            stroke-linecap="round"
          />
          <path
            d="M26.4102 15.8613L15.906 26.3655"
            stroke="black"
            stroke-width="2.06369"
            stroke-linecap="round"
          />
        </svg>
      </button>
    </div>
    <div class="mb-4 mt-3 grid grid-cols-3 gap-2">
      <div class="col-span-1">
        Navigate and explore around with your mouse. Click on a touchpoint to
        interact
      </div>
      <div class="col-span-1"><img src={instructionIcon} alt="" /></div>
      <div class="col-span-1">
        <div class="mt-[2.75rem]">
          Use your mouse scroller to zoom an object.
        </div>
      </div>
    </div>
    <button
      on:click={() => {
        UIPanel.set("instructions-nav");
        !isIframe && localStorage.setItem("instructions-view-count", "1");
      }}
      class="primary-btn mx-auto block w-80"
      id="contact-submit">Okay</button
    >
  </div>
{/if}

<style>
  button {
    background-size: 100% 100%;
    background-repeat: no-repeat;
    padding: 1rem 0.5rem;
    font-size: 1rem;
    border: 0;
  }

  .centered-panel {
    border-radius: 0.8rem;
    position: absolute;
    bottom: 2rem;
    z-index: 99;
    transform-origin: center;
    top: 0;
    left: 0;
    width: 500px;
    height: fit-content;
    right: 0;
    bottom: 0;
    margin: auto;
    background-color: #fff;
    flex-wrap: wrap;
  }
  .instruction-screen {
    width: 600px;
  }
</style>
