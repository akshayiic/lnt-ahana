<script>
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

	onMount(() => {
		goto('/amenities', { replaceState: true });
	});
</script>

<svelte:head>
	<title>V-Estate</title>
	<meta name="description" content="v-estate" />
</svelte:head>
