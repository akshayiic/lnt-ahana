<script lang="js">
	import { getContext } from 'svelte';
	import { writable } from 'svelte/store';
	import 'lazysizes';
	import maximizeBtn from '$lib/images/maximize-icon.svg';
	import minimizeBtn from '$lib/images/minimize-icon.svg';
	import 'lazysizes/plugins/parent-fit/ls.parent-fit';
	import touchPoint1 from '$lib/images/touchPoint1.svg';
	const walkthroughDisabled = writable();
	$: walkthroughDisabled.set(false);
	// Note: Never import/require the *.min.js files from the npm package.
	// Retrieve hostName store from context
	const hotspotName = getContext('hotspotName');
	let currentUI = getContext('currentUI');
	import { goto } from '$app/navigation';
	const UIPanel = getContext('UIPanel');
	import { onMount } from 'svelte';

	const isDay = writable();
	const exteriorImagesSeq = writable();
	function toggleDayNight() {
		isDay.update((value) => !value);
		isDay.subscribe((value) => {
			hotspotName.set(value ? 'night' : 'Exterior');
		});
	}

	const isInteriorUnitDataMinimized = writable();
	$: isInteriorUnitDataMinimized.set(true);
	onMount(async () => {
		console.log(
			'%c[Hotspot Info]%c Current hotspotName:',
			'background: #222; color: #fff; padding: 2px 4px; border-radius: 2px;',
			'color: #00bfae; font-weight: bold;',
			$hotspotName
		);
		if ($hotspotName == 'Exterior') {
			// show('Exterior');
		}
		try {
			if (!document.querySelector('.exterior-cloudi')?.id) {
				console.log('init cloud');
				window.CI360.init();
			}
			// setTimeout(() => {
			// 	window.CI360.init();
			// }, 2000);
		} catch (error) {
			console.error('Error initializing cloud:', error);
		}
	});
</script>

<button
	id="daynighmode"
	type="button"
	class="day-night-toggle"
	on:click={toggleDayNight}
	style="position: fixed; top: 3rem; right: 2rem; cursor: pointer; z-index: 1000001; background: white; padding: .4rem; border-radius: 50%;"
	aria-label="Toggle day and night mode"
>
	{#if $isDay}
		<!-- Replace with lucide Sun icon -->
		<svg
			xmlns="http://www.w3.org/2000/svg"
			class="icon icon-sun"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
		>
			<circle cx="12" cy="12" r="5"></circle>
			<line x1="12" y1="1" x2="12" y2="3"></line>
			<line x1="12" y1="21" x2="12" y2="23"></line>
			<line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
			<line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
			<line x1="1" y1="12" x2="3" y2="12"></line>
			<line x1="21" y1="12" x2="23" y2="12"></line>
			<line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
			<line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
		</svg>
	{:else}
		<!-- Replace with lucide Moon icon -->
		<svg
			xmlns="http://www.w3.org/2000/svg"
			class="icon icon-moon"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
		>
			<path d="M21 12.79A9 9 0 0111.21 3 7 7 0 1012 21a9 9 0 009-8.21z"></path>
		</svg>
	{/if}
</button>
<div
	class={$hotspotName == 'Exterior'
		? 'cloudimage-360 exterior-cloudi !absolute left-0 top-0  z-[10]'
		: 'cloudimage-360 invisible'}
	data-folder="https://assets.vestate.io/narang-kane/exterior/day/"
	data-filename="{'{'}index{'}'}.webp"
	data-amount="24"
	data-keys="false"
	data-filters="blur:20"
	data-drag-speed="400"
	data-request-responsive-images="true"
	data-info="false"
	data-ratio=" 1"
></div>

<div
	class={$hotspotName == 'night'
		? 'cloudimage-360 exterior-cloudi !absolute left-0 top-0  z-[10]'
		: 'cloudimage-360 invisible'}
	data-folder="https://assets.vestate.io/narang-kane/exterior/night/"
	data-filename="{'night{'}index{'}'}.webp"
	data-amount="24"
	data-keys="false"
	data-filters="blur:20"
	data-drag-speed="400"
	data-request-responsive-images="true"
	data-info="false"
	data-ratio="1"
></div>

{#if $currentUI.highlights}
	<div class="left-panel-wrapper">
		<div class="left-panel p-2">
			<div class="left-panel--header flex justify-between">
				<div class="left-title flex items-center font-bold">
					<svg
						width="25"
						height="25"
						viewBox="0 0 32 32"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
						class="mr-2"
					>
						<path
							d="M8.90798 13.3021C8.90798 10.1749 8.89311 7.0624 8.90798 3.93517C8.92285 2.07654 10.2613 0.527682 12.031 0.262163C13.9196 -0.0328582 15.6596 0.984965 16.2395 2.74034C16.3436 3.06486 16.418 3.40414 16.4477 3.74341C16.5072 4.46621 16.0462 5.02675 15.377 5.11526C14.7375 5.18901 14.2022 4.73173 14.0832 3.99418C13.9345 3.03536 13.414 2.53382 12.5961 2.57808C11.7633 2.62233 11.2874 3.21237 11.2874 4.21544C11.2874 4.76123 11.2725 5.29227 11.2874 5.83806C11.3171 6.47236 11.0197 7.28366 11.4064 7.68194C11.8079 8.09497 12.6258 7.8147 13.2653 7.8147C15.9124 7.82945 18.5743 7.8147 21.2214 7.82945C21.6973 7.82945 21.8758 7.72619 21.8609 7.22466C21.8312 6.11833 21.8312 5.012 21.8609 3.90567C21.9055 1.88478 23.4373 0.321167 25.4598 0.203159C27.4228 0.0999013 29.1033 1.4865 29.3858 3.47789C29.5048 4.33345 29.1033 4.9825 28.3894 5.10051C27.8392 5.18901 27.051 4.70223 27.0064 3.87617C26.9618 3.00586 26.3223 2.50432 25.5341 2.56333C24.7311 2.62233 24.2403 3.21237 24.2403 4.15644C24.2403 10.2781 24.2403 16.3998 24.2403 22.5067C24.2403 22.728 24.2552 22.9493 24.2255 23.1705C24.166 23.8196 23.6901 24.2769 23.0655 24.2916C22.4558 24.3064 21.9501 23.8491 21.8609 23.2148C21.846 23.0968 21.846 22.964 21.846 22.846C21.8312 21.6364 21.8312 21.6364 20.582 21.6364C17.7564 21.6364 14.9309 21.6512 12.1053 21.6217C11.4807 21.6217 11.1684 21.7249 11.2874 22.4182C11.332 22.6543 11.3023 22.905 11.2874 23.1558C11.2428 23.8048 10.7669 24.2769 10.1423 24.2916C9.50283 24.3064 8.96746 23.8343 8.92285 23.1558C8.89311 22.5658 8.90798 21.9757 8.90798 21.3857C8.90798 18.7157 8.90798 16.0015 8.90798 13.3021ZM16.6113 13.8184C18.1431 13.8184 19.6748 13.8036 21.2214 13.8331C21.7568 13.8479 21.9055 13.6709 21.8758 13.1693C21.8312 12.358 21.8609 11.5467 21.8758 10.7354C21.8907 10.3814 21.8014 10.2044 21.385 10.2044C18.1877 10.2191 15.0052 10.2191 11.8079 10.2044C11.4064 10.2044 11.3023 10.3519 11.3023 10.7207C11.3171 11.5615 11.332 12.3875 11.3023 13.2283C11.2725 13.7299 11.4807 13.8479 11.9417 13.8331C13.4883 13.8036 15.0498 13.8184 16.6113 13.8184ZM16.6113 19.3058C18.1728 19.3058 19.7343 19.291 21.2958 19.3205C21.7568 19.3353 21.8907 19.1878 21.8758 18.7452C21.846 18.0519 21.8609 17.3734 21.8758 16.6801C21.8758 16.3556 21.8163 16.1933 21.4296 16.1933C18.2174 16.208 14.9904 16.208 11.7781 16.1933C11.4212 16.1933 11.3023 16.3113 11.3171 16.6653C11.332 17.3586 11.3617 18.0372 11.3171 18.7305C11.2874 19.2468 11.4956 19.3353 11.9566 19.3353C13.4883 19.291 15.0498 19.3058 16.6113 19.3058Z"
							fill="#5A4DE3"
						/>
						<path
							d="M25.8935 31.0057C24.6808 31.0057 23.661 30.5336 22.8204 29.6043C22.4483 29.206 22.1038 28.7635 21.5664 28.6013C20.6568 28.3357 19.954 28.7193 19.3615 29.4421C18.5208 30.4451 17.4873 30.9909 16.2195 31.0057C14.9792 31.0204 13.9594 30.5041 13.0913 29.5748C11.7683 28.144 10.9001 28.144 9.59098 29.5601C7.77193 31.522 5.20873 31.5367 3.40347 29.5748C2.87981 28.9995 2.32858 28.5423 1.5293 28.4832C0.867833 28.439 0.481975 27.849 0.550878 27.2147C0.619782 26.5656 1.08832 26.1378 1.74979 26.1673C2.93493 26.2116 3.92714 26.7131 4.74019 27.6129C5.15361 28.0702 5.55325 28.5275 6.21472 28.616C7.09668 28.734 7.68925 28.2472 8.24048 27.6129C9.27402 26.4329 10.5556 25.9756 12.0439 26.2263C12.981 26.3886 13.7665 26.8754 14.4142 27.5982C14.8414 28.0702 15.2686 28.5423 15.9576 28.616C16.8258 28.7045 17.377 28.2177 17.9145 27.6129C19.1685 26.2263 20.6706 25.8281 22.3794 26.3886C23.096 26.6246 23.661 27.1114 24.1847 27.6867C25.3836 28.9995 26.3345 28.9995 27.5334 27.6719C28.3464 26.7574 29.3249 26.2263 30.4962 26.1526C31.2128 26.1083 31.7089 26.5214 31.7778 27.1852C31.8467 27.8785 31.4609 28.4242 30.758 28.4832C30.0139 28.5423 29.4764 28.9405 28.9941 29.5011C28.1673 30.4894 27.1337 30.9909 25.8935 31.0057Z"
							fill="#5A4DE3"
						/>
					</svg>
					Exterior Highlights
				</div>
				<button
					on:click={() => {
						$isInteriorUnitDataMinimized = !$isInteriorUnitDataMinimized;
					}}
					id="minimize-interior-data-amenities"
					class="ghost-btn close-btn !px-0 !py-0"
				>
					{#if !$isInteriorUnitDataMinimized}
						<img id="un-mm" src={minimizeBtn} alt="minimize" />
					{/if}
					{#if $isInteriorUnitDataMinimized}
						<img id="un-mx" src={maximizeBtn} alt="maximize" />
					{/if}
				</button>
			</div>

			<div class={!$isInteriorUnitDataMinimized ? 'block' : 'hidden'}>
				<div class="no-hovers pt-3">
					<div class="inner-btn-group">
						<button
							on:click={() => {
								exteriorImagesSeq.set('narang-valora');
								pageNumber.set(1);
							}}
							class={`inner-modal-btn ${$exteriorImagesSeq == 'narang-valora' ? 'active' : ''}`}
							id="master-brochure-download">Narang Valora</button
						>
						<button
							on:click={() => {
								exteriorImagesSeq.set('crown-view');
								pageNumber.set(1);
							}}
							class={`inner-modal-btn ${$exteriorImagesSeq == 'crown-view' ? 'active' : ''}`}
							id="crown-view-btn">Crown View</button
						>
						<button
							on:click={() => {
								exteriorImagesSeq.set('the-elevation');
								pageNumber.set(1);
							}}
							class={`inner-modal-btn ${$exteriorImagesSeq == 'the-elevation' ? 'active' : ''}`}
							id="the-elevation-btn">The Elevation</button
						>
					</div>
				</div>
			</div>
		</div>
	</div>
{/if}

<style>
	@keyframes fadeIn {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
	@keyframes fadeOut {
		from {
			opacity: 1;
		}
		to {
			opacity: 0;
		}
	}
	.touch-point-content {
		transition: all 1s ease-in-out;
		animation: fadeOut 0.7s forwards;
		visibility: hidden;
	}
	.touch-point-wrapper {
		position: absolute;
		top: 65%;
		z-index: 99999;
		right: 51%;
		cursor: pointer;
		display: flex;
		align-items: center;
	}

	.touch-point-wrapper-3 {
		position: absolute;
		bottom: 18%;
		right: 56.3%;
		display: flex;
		cursor: pointer;
		align-content: center;
		align-items: center;
		gap: 0.6rem;
	}
</style>
