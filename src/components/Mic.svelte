<script lang="ts">
	export let player: HTMLAudioElement | null = null;
	export let stopButton: HTMLButtonElement | null = null;
	export let downloadLink: HTMLAnchorElement | null = null;

	let mediaRecorder: MediaRecorder | null = null;

	const handleSuccess = async (stream: MediaStream) => {
		if (!player) return;

		const options = { mimeType: 'audio/webm' };
		const recordedChunks: Blob[] = [];
		mediaRecorder = new MediaRecorder(stream, options);

		mediaRecorder.addEventListener('dataavailable', function (e) {
			if (e.data.size > 0) recordedChunks.push(e.data);
		});

		mediaRecorder.addEventListener('stop', function () {
			if (player && window.URL) {
				player.src = URL.createObjectURL(new Blob(recordedChunks));
			}

			if (downloadLink) {
				downloadLink.href = URL.createObjectURL(new Blob(recordedChunks));
				downloadLink.download = 'acetest.wav';
			}
		});

		stopButton &&
			stopButton.addEventListener('click', function () {
				mediaRecorder && mediaRecorder.stop();
			});

		mediaRecorder.start();
	};

	const startRecording = () => {
		navigator.mediaDevices.getUserMedia({ audio: true, video: false }).then(handleSuccess);
	};
</script>

<audio bind:this={player} controls />
<div>
	<button type="button" on:click={startRecording}>Start</button>
	<button type="button" bind:this={stopButton}>STOP</button>
</div>

<a bind:this={downloadLink}>Download</a>
