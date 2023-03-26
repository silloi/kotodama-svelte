<script lang="ts">
	import { goto } from '$app/navigation';

	export let query = '';

	const search = () => {
		goto(`/search/${query}`);
	};
</script>

<form on:submit|preventDefault={search}>
	<input type="text" bind:value={query} placeholder="Search voices with query" />
</form>

<style>
	input[type='text'] {
		width: 100%;
		text-align: center;
	}
</style>
