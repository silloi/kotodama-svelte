<script lang="ts">
	import type { PageData } from './$types';
	import Player from '../components/Player.svelte';
	import Search from '../components/Search.svelte';

	export let data: PageData;

	$: ({ voices } = data);
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<h1>Kotodama（言靈）: Speaking in Text</h1>

<Search />

<section>
	{#each voices as voice}
		<Player url={voice.url} text={voice.text} />
	{/each}
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 0.6;
	}
</style>
