<script>
	import Home from './Home.svelte';
	import { setContext, getContext } from 'svelte';
	import { writable } from 'svelte/store';
	import 'iconify-icon';
	import poweredByVretail from '$lib/images/powered-vretail.png';
	import instructionIcon from '$lib/images/instruction-icon.svg';
	import { onMount } from 'svelte';
	const currentUI = getContext('currentUI');
	const walkthroughDisabled = getContext('walkthroughDisabled');

	const UIPanel = getContext('UIPanel');

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
			document.documentElement.style.setProperty('--vh', `${vh}px`);
		}
		setElementHeight();
		// Update the height on resize
		window.addEventListener('resize', setElementHeight);
		let lastClickTime = 0;
		const clickTimeout = 300; // Timeout in milliseconds (adjustable)
		if (!(window.self !== window.top) && window.innerWidth < 1200) {
			window.addEventListener('click', () => {
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

		localStorage.getItem('instructions-view-count') == 4 && instructionPano.set(false);
	});
	setContext('currentUI', currentUI);
	//
</script>

<svelte:head>
	<title>V-Estate</title>
	<meta name="description" content="v-estate" />
</svelte:head>

<Home />
<div class="rotate-to-view">
	<svg
		width="594"
		height="641"
		viewBox="0 0 594 641"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		<g clip-path="url(#clip0_323_2301)">
			<path d="M251.999 151H341.999" stroke="#fff" stroke-width="12" stroke-linecap="round" />
			<circle cx="296.999" cy="457" r="12" fill="#fff" />
		</g>
		<rect x="203.999" y="147" width="186" height="352" rx="12" stroke="#fff" stroke-width="8" />
		<path
			d="M343.449 618.795C341.64 617.527 341.2 615.033 342.467 613.224L363.116 583.734C364.383 581.925 366.877 581.485 368.687 582.752C370.496 584.019 370.936 586.513 369.669 588.323L351.314 614.536L377.527 632.89C379.337 634.157 379.777 636.651 378.51 638.461C377.243 640.271 374.748 640.71 372.939 639.443L343.449 618.795ZM581.096 274.468C580.713 272.292 582.165 270.218 584.341 269.834C586.517 269.451 588.591 270.903 588.975 273.079L581.096 274.468ZM345.049 611.579C421.054 598.177 488.623 555.131 532.891 491.91L539.444 496.499C493.959 561.458 424.533 605.687 346.438 619.457L345.049 611.579ZM532.891 491.91C577.158 428.69 594.498 350.474 581.096 274.468L588.975 273.079C602.745 351.174 584.928 431.54 539.444 496.499L532.891 491.91Z"
			fill="white"
		/>
		<path
			d="M349.021 32.1887C350.288 33.9983 349.848 36.4925 348.038 37.7596L318.549 58.4083C316.739 59.6754 314.245 59.2356 312.978 57.426C311.711 55.6164 312.151 53.1222 313.96 51.8551L340.173 33.5007L321.819 7.28779C320.552 5.47817 320.991 2.98399 322.801 1.71688C324.611 0.449769 327.105 0.88956 328.372 2.69918L349.021 32.1887ZM125.313 83.3514L127.607 86.628L125.313 83.3514ZM7.93895 274.47C7.55531 276.645 5.4807 278.098 3.30513 277.714C1.12953 277.331 -0.323135 275.256 0.0604705 273.08L7.93895 274.47ZM345.05 38.4222C269.044 25.0204 190.828 42.3605 127.607 86.628L123.019 80.0748C187.977 34.5903 268.344 16.7735 346.439 30.5437L345.05 38.4222ZM127.607 86.628C64.3868 130.895 21.3408 198.464 7.93895 274.47L0.0604705 273.08C13.8308 194.985 58.0601 125.559 123.019 80.0748L127.607 86.628Z"
			fill="white"
		/>
		<defs>
			<clipPath id="clip0_323_2301">
				<rect x="203.999" y="147" width="186" height="352" rx="12" fill="white" />
			</clipPath>
		</defs>
	</svg>
	Please rotate your device for better experience
</div>

{#if $UIPanel == 'loading'}
	<div
		class="absolute left-0 top-0 z-[2000000000] h-screen w-screen rounded bg-cover bg-center bg-no-repeat"
	>
		<div class="z-[2000000002] h-screen w-screen bg-gradient-to-t from-black">
			<div
				class="intro center absolute bottom-10 flex w-full flex-col items-center justify-center text-center font-semibold uppercase text-white"
			>
				<button
					id="v-start-btn"
					on:click={() => {
						UIPanel.set('sign-up');
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

						console.log('go fullscreen');
					}}
					class="bg-all-none !w-fit p-0"
				>
					<img id="v-start-img" style="width: 100px;" src="/start-btn.png" alt="" />
				</button>

				<div class="title text-2xl">virtual tour experience</div>
				<div class="subtitle">by Narang</div>
			</div>
		</div>
	</div>
	<img
		src={poweredByVretail}
		alt="powered by vretail"
		class="absolute bottom-5 right-6 z-[2000000002]"
	/>
{/if}
{#if $UIPanel == 'instructions-exterior' && $currentUI.Exterior && $walkthroughDisabled}
	<div class="centered-panel instruction-screen p-4">
		<div class="left-panel--header mb-3 flex justify-between">
			<div class="left-title flex flex-col gap-1 text-left">
				<div class="text-2xl font-bold">Instructions</div>
				See how to explore V-estate
			</div>
			<button
				on:click={() => {
					UIPanel.set('loaded');
					!isIframe && localStorage.setItem('instructions-view-count', '4');
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
				Navigate and explore around with your mouse. Click on a touchpoint to interact
			</div>
			<div class="col-span-1"><img src={instructionIcon} alt="" /></div>
			<div class="col-span-1">
				<div class="mt-[2.75rem]">Use your mouse scroller to zoom an object.</div>
			</div>
		</div>
		<button
			on:click={() => {
				UIPanel.set('instructions-nav');
				!isIframe && localStorage.setItem('instructions-view-count', '1');
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
