<script lang="ts">
	export let url = '';
	export let text = '';
	export let initPaused = false;

	let player: HTMLVideoElement | null = null;

	let paused = false;
	let duration = 0;
	let time = 0;

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
	<button type="button" on:click={toggle}>{paused ? '▶︎' : '■'}</button>

	<video
		bind:this={player}
		bind:paused
		bind:duration
		currentTime={time}
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
