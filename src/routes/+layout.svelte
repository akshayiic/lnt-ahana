<script>
  import { goto } from "$app/navigation";
  import { page } from "$app/stores";
  import { onMount, setContext } from "svelte";
  import { writable } from "svelte/store";
  import "../app.pcss";
  import "./styles.css";
  import sublogo from "$lib/images/ahana.jpeg";
  import mainLogo from "$lib/images/lntlogo.png";

  const navSlide = writable();
  setContext("navSlide", navSlide);

  const hotspotName = writable(0, () => {
    return () => console.log("remove sub");
  });
  const UIPanel = writable();
  $: UIPanel.set("loading");
  const walkthroughDisabled = writable();
  $: walkthroughDisabled.set(false);

  $: hotspotName.set("Exterior");
  setContext("hotspotName", hotspotName);
  setContext("UIPanel", UIPanel);

  const show = (ui) => {
    $currentUI = {
      interiors: false,
      amenities: false,
      interiorsDollhouse: false,
      highlights: false,
    };
    $currentUI[ui] = true;
    console.log("second", $currentUI);
  };
  const vicinityImg = writable();
  $: vicinityImg.set("-");
  setContext("vicinityImg", vicinityImg);

  // check for the iframe window
  function inIframe() {
    try {
      return window.self !== window.top;
    } catch (e) {
      return true;
    }
  }
  let isIframe = inIframe();

  let currentUI = writable({
    Exterior: false,
    interiors: false,
    amenities: false,
    highlights: false,
  });

  setContext("currentUI", currentUI);
  const switchChecker = () => {
    // eslint-disable-next-line svelte/valid-compile
    switch ($page.url.searchParams.get("panel")) {
      case "interiors":
        show("interiors");
        UIPanel.set("loaded");
        break;
      case "contact-us":
        show("contact");
        UIPanel.set("contact");
        break;
      case "brochure":
        show("Brochure");
        UIPanel.set("Brochure");
        break;
      case "amenities":
        show("amenities");
        UIPanel.set("loaded");
        break;
      case "vicinity":
        show("vicinity");
        UIPanel.set("loaded");
        break;
      case "overview":
        show("Exterior");
        UIPanel.set("loaded");
        break;
      case "highlights":
        show("highlights");
        UIPanel.set("loaded");
        break;
      default:
        break;
    }
  };
  onMount(() => {
    console.log("page changed", $page.url);
    if ($page.url.href.includes("brochure")) {
      show("Brochure");
      UIPanel.set("Brochure");
      // CI360.
    }
    if ($page.url.href.includes("amenities")) {
      show("amenities");
      UIPanel.set("loaded");
    }
    // wait till this shit is ready
    //
    // return;
  });
</script>

<div class="app">
  <slot />

  <div class="rotate-to-view">
    <svg
      width="594"
      height="641"
      viewBox="0 0 594 641"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clip-path="url(#clip0_323_2301)">
        <path
          d="M251.999 151H341.999"
          stroke="#fff"
          stroke-width="12"
          stroke-linecap="round"
        />
        <circle cx="296.999" cy="457" r="12" fill="#fff" />
      </g>
      <rect
        x="203.999"
        y="147"
        width="186"
        height="352"
        rx="12"
        stroke="#fff"
        stroke-width="8"
      />
      <path
        d="M343.449 618.795C341.64 617.527 341.2 615.033 342.467 613.224L363.116 583.734C364.383 581.925 366.877 581.485 368.687 582.752C370.496 584.019 370.936 586.513 369.669 588.323L351.314 614.536L377.527 632.89C379.337 634.157 379.777 636.651 378.51 638.461C377.243 640.271 374.748 640.71 372.939 639.443L343.449 618.795ZM581.096 274.468C580.713 272.292 582.165 270.218 584.341 269.834C586.517 269.451 588.591 270.903 588.975 273.079L581.096 274.468ZM345.049 611.579C421.054 598.177 488.623 555.131 532.891 491.91L539.444 496.499C493.959 561.458 424.533 605.687 346.438 619.457L346.438 619.457ZM532.891 491.91C577.158 428.69 594.498 350.474 581.096 274.468L588.975 273.079C602.745 351.174 584.928 431.54 539.444 496.499L532.891 491.91Z"
        fill="white"
      />
      <path
        d="M349.021 32.1887C350.288 33.9983 349.848 36.4925 348.038 37.7596L318.549 58.4083C316.739 59.6754 314.245 59.2356 312.978 57.426C311.711 55.6164 312.151 53.1222 313.96 51.8551L340.173 33.5007L321.819 7.28779C320.552 5.47817 320.991 2.98399 322.801 1.71688C324.611 0.449769 327.105 0.88956 328.372 2.69918L349.021 32.1887ZM125.313 83.3514L127.607 86.628L125.313 83.3514ZM7.93895 274.47C7.55531 276.645 5.4807 278.098 3.30513 277.714C1.12953 277.331 -0.323135 275.256 0.0604705 273.08L7.93895 274.47ZM345.05 38.4222C269.044 25.0204 190.828 42.3605 127.607 86.628L123.019 80.0748C187.977 34.5903 268.344 16.7735 346.439 30.5437L345.05 38.4222ZM127.607 86.628C64.3868 130.895 21.3408 198.464 7.93895 274.47L0.0604705 273.08C13.8308 194.985 58.0601 125.559 123.019 80.0748L127.607 86.628Z"
        fill="white"
      />
      <defs>
        <clipPath id="clip0_323_2301">
          <rect
            x="203.999"
            y="147"
            width="186"
            height="352"
            rx="12"
            fill="white"
          />
        </clipPath>
      </defs>
    </svg>
    <p class="mt-8 text-xl font-bold px-6 tracking-wide leading-relaxed">
      Please rotate your device to landscape mode to access the website.
    </p>
  </div>

   <img
    src={mainLogo}
    alt=""
    id="lntahanalogo"
    class="absolute left-3 lg:left-5  top-3 lg:top-5 z-[200] rounded-lg  shadow-sm"
  />

  <img
    src={sublogo}
    alt=""
    id="lntahanasublogo"
    class="absolute right-3 lg:right-5  top-3 lg:top-5 z-[200] rounded-lg  shadow-sm"
  />

  <div class={"nav-wrapper " + ($navSlide ? "active-drop-wrapper" : "")}>
    <nav class="z-[999]">
      {#if $UIPanel == "instructions-nav"}
        <div class="tooltip-text relative">
          <strong> Navigation Panel</strong>
          <p>You can navigate to various options available here</p>

          <button
            on:click={() => {
              UIPanel.set("instructions-color-mode");
              !isIframe && localStorage.setItem("instructions-view-count", "2");
            }}
            class=" ghost-btn next-btn absolute bottom-[-1px] right-[-1px] border-0 !px-0 !py-0"
          >
            <svg
              width="40"
              height="40"
              viewBox="0 0 51 50"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0.00390625 12.0128C0.00390625 5.42948 5.34075 0.0926514 11.9241 0.0926514H50.0687V37.6226C50.0687 44.206 44.7318 49.5428 38.1485 49.5428H0.00390625V12.0128Z"
                fill="url(#paint0_linear_75_2649)"
              />
              <path
                d="M33.5968 24.9588C34.2895 25.3152 34.2895 26.3054 33.5968 26.6617L20.9503 33.1676C20.1422 33.5833 19.2637 32.745 19.6413 31.9184L22.2492 26.2081C22.3646 25.9554 22.3646 25.6651 22.2492 25.4125L19.6413 19.7022C19.2637 18.8756 20.1422 18.0372 20.9503 18.4529L33.5968 24.9588Z"
                fill="white"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_75_2649"
                  x1="0.394398"
                  y1="42.7963"
                  x2="42.8438"
                  y2="25.5106"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="#630a38" />
                  <stop offset="1" stop-color="#630a38" />
                </linearGradient>
              </defs>
            </svg>
          </button>
        </div>
      {/if}

      <svg
        on:click={() => navSlide.set(!$navSlide)}
        type="button"
        role="button"
        tabindex="0"
        on:keydown={(e) =>
          (e.key === "Enter" || e.key === " ") && navSlide.set(!$navSlide)}
        width="135"
        height="38"
        viewBox="0 0 135 38"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        class="pointer mx-auto block cursor-pointer outline-0"
      >
        <g clip-path="url(#clip0_688_470)">
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M98.7523 13.3744C114.818 26.5965 131.663 44 152.47 44H680.754C702.293 44 719.754 61.4609 719.754 83C719.754 104.539 702.293 122 680.754 122H-492C-513.539 122 -531 104.539 -531 83C-531 61.4609 -513.539 44 -492 44H-18.4702C2.33679 44 19.1821 26.5965 35.2477 13.3744C43.8831 6.26749 54.9431 2 67 2C79.0569 2 90.117 6.26749 98.7523 13.3744Z"
            fill="url(#paint0_linear_688_470)"
          />
          <path
            class={!$navSlide ? "active-drop" : ""}
            d="M60.3076 24L59 22.6615L66.1266 15.3708C66.2408 15.2533 66.3766 15.1601 66.5262 15.0964C66.6757 15.0328 66.8361 15 66.9981 15C67.1602 15 67.3206 15.0328 67.4701 15.0964C67.6197 15.1601 67.7555 15.2533 67.8697 15.3708L75 22.6615L73.6924 23.9987L67 17.156L60.3076 24Z"
            fill="white"
            fill-opacity="0.7"
          >
            <animate
              attributeName="fill-opacity"
              values="0.7;1;0.7"
              dur="1s"
              repeatCount="indefinite"
            />
          </path>
          <path
            class={!$navSlide ? "active-drop" : ""}
            d="M60.3076 31L59 29.6615L66.1266 22.3708C66.2408 22.2533 66.3766 22.1601 66.5262 22.0964C66.6757 22.0328 66.8361 22 66.9981 22C67.1602 22 67.3206 22.0328 67.4701 22.0964C67.6197 22.1601 67.7555 22.2533 67.8697 22.3708L75 29.6615L73.6924 30.9987L67 24.156L60.3076 31Z"
            fill="white"
            fill-opacity="0.2"
          >
            <animate
              attributeName="fill-opacity"
              values="0.2;0.4;0.2"
              dur="1s"
              repeatCount="indefinite"
              begin="0.5s"
            />
          </path>
        </g>
        <defs>
          <linearGradient
            id="paint0_linear_688_470"
            x1="-521.244"
            y1="95.6284"
            x2="-435.661"
            y2="-263.156"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="#630a38" />
            <stop offset="1" stop-color="#630a38" />
          </linearGradient>
          <clipPath id="clip0_688_470">
            <rect width="135" height="38" fill="white" />
          </clipPath>
        </defs>
      </svg>

      <div class="btn-group">
        <div class="inner-btn-wrapper">
          <button
            class={$page.url.pathname === "/renders"
              ? "transparent-btn active"
              : "transparent-btn"}
            id="amenities"
            on:click={() => {
              show("amenities");
              UIPanel.set("loaded");
              hotspotName.set("amenities");
              goto("/renders");
            }}
          >
            <svg
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
            Project Overview
          </button>
        </div>
        <div class="inner-btn-wrapper">
          <button
            class={$page.url.pathname === "/layout"
              ? "transparent-btn active"
              : "transparent-btn"}
            id="intcm"
            on:click={() => {
              setTimeout(() => {
                switchChecker();
                show("interiors");
                UIPanel.set("loaded");
                goto("/layout");
              }, 100);
            }}
          >
            <svg
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
          </button>
        </div>
        <!-- <div class="inner-btn-wrapper">
          <button
            class={$page.url.pathname === "/techbook"
              ? "transparent-btn active"
              : "transparent-btn"}
            id="intcmbroc"
            on:click={() => {
              UIPanel.set("Brochure");
              show("brochure");
              goto("/techbook");
            }}
          >
            <svg
              width="17"
              height="17"
              viewBox="0 0 15 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8.77946 3.83378C8.77946 4.79841 8.78543 5.76304 8.7735 6.73358C8.76753 6.96438 8.84509 7.01173 9.05988 7.00581C9.56701 6.98806 10.0741 7.00581 10.5813 6.99989C10.8199 6.99989 11.0108 7.05907 11.1182 7.28396C11.2256 7.52067 11.1242 7.69821 10.9691 7.87575C9.90111 9.08302 8.83913 10.2962 7.77117 11.5035C7.48479 11.829 7.21035 11.823 6.918 11.4975C5.85005 10.2903 4.78209 9.0771 3.72011 7.86983C3.56498 7.69821 3.46952 7.50884 3.58288 7.27804C3.69624 7.05315 3.89313 6.99397 4.12581 6.99989C4.63294 7.00581 5.14007 6.98806 5.6472 7.00581C5.87988 7.01173 5.92164 6.94071 5.92164 6.72175C5.91568 4.828 5.91568 2.93425 5.91568 1.04642C5.91568 0.507884 6.0529 0.371771 6.60776 0.371771C7.14472 0.371771 7.68168 0.365853 8.21864 0.371771C8.60644 0.377689 8.77946 0.54931 8.77946 0.933978C8.77946 1.90452 8.77946 2.86915 8.77946 3.83378Z"
                fill="#630a38"
              />
              <path
                d="M7.31128 15.5257C5.31259 15.5257 3.31391 15.5257 1.32119 15.5257C0.551547 15.5257 0.187607 15.1706 0.187607 14.4072C0.187607 13.2828 0.193573 12.1584 0.181641 11.034C0.181641 10.8446 0.223404 10.7736 0.426256 10.7854C0.903554 10.7973 1.38085 10.7973 1.85815 10.7854C2.061 10.7795 2.10276 10.8505 2.10276 11.034C2.09083 11.8152 2.10873 12.5904 2.0968 13.3716C2.09083 13.5787 2.15049 13.632 2.35931 13.632C5.68847 13.6261 9.01762 13.6261 12.3468 13.632C12.5675 13.632 12.6033 13.561 12.6033 13.3657C12.5914 12.5845 12.6033 11.8092 12.5974 11.0281C12.5974 10.8328 12.657 10.7795 12.8479 10.7854C13.3372 10.7973 13.8204 10.7973 14.3097 10.7854C14.4588 10.7854 14.5185 10.8209 14.5185 10.9807C14.5125 12.1821 14.5244 13.3834 14.5125 14.5907C14.5065 15.1588 14.0829 15.5257 13.4684 15.5257C11.4101 15.5257 9.36366 15.5257 7.31128 15.5257Z"
                fill="#630a38"
              />
            </svg>
            Tech Book
          </button>
        </div> -->
        <div class="inner-btn-wrapper">
          <button
            class={$page.url.pathname === "/master-plan"
              ? "transparent-btn active"
              : "transparent-btn"}
            id="master-plan-btn"
            on:click={() => {
              UIPanel.set("loaded");
              goto("/master-plan");
            }}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11.99 18.54l-7.37-5.73L3 14.07l9 7 9-7-1.63-1.27zM12 16l7.36-5.73L21 9l-9-7-9 7 1.63 1.27L12 16z"
                fill="#630a38"
              />
            </svg>
            Master Plan
          </button>
        </div>
        <div class="inner-btn-wrapper">
          <button
            class={$page.url.pathname === "/location"
              ? "transparent-btn active"
              : "transparent-btn"}
            id="location-btn"
            on:click={() => {
              UIPanel.set("loaded");
              goto("/location");
            }}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"
                fill="#630a38"
              />
            </svg>
            Location
          </button>
        </div>
      </div>
    </nav>
  </div>
</div>

<style>
  #mainlogo {
    width: 4rem;
    height: 4rem;
  }
  #lntahanalogo {
    width: 4rem;
    height: auto;
  }
  #lntahanasublogo {
    width: 5rem;
    height: auto;
  }

  @media (min-width: 1024px) {
    #lntahanalogo {
      width: auto;
      height: auto;
    }

    #lntahanasublogo {
      width: 10%;
      height: auto;
    }
  }
</style>
