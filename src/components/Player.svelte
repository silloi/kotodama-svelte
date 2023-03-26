<script lang="ts">
	import Knob from './Knob.svelte';

	export let url = '';
	export let text = '';
	export let initPaused = false;

	let player: HTMLVideoElement | null = null;

	let paused = false;
	let duration = 0;
	let time = 0;

	$: degree = duration ? Math.round(((time / duration) * 360) % 360) : 0;

	const convertVttToBase64 = (vtt: string) => {
		const base64 = btoa(unescape(encodeURIComponent(vtt)));
		return 'data:text/vtt;base64,' + base64;
	};

	const toggle = () => {
		if (!player) return;

		if (paused) {
			player.play();
		} else {
			player.pause();
		}
	};
</script>

<article>
	<button
		type="button"
		on:click={toggle}
		style="background-color: {paused ? '#ccc' : 'transparent'};"
	>
		<Knob {degree} />
	</button>

	<video
		bind:this={player}
		bind:paused
		bind:duration
		bind:currentTime={time}
		width="1000"
		height="60"
		autoplay={!initPaused}
		muted
		loop
	>
		<source src={url} type="audio/mp3" />
		<track src={convertVttToBase64(text)} kind="captions" default />
	</video>
</article>

<style>
	button {
		width: 40px;
		height: 40px;
		border-radius: 50%;
		cursor: pointer;
	}

	article {
		display: flex;
		align-items: center;
	}

	video::cue {
		font-size: 16px;
		color: black;
		text-shadow: none;
	}
</style>
