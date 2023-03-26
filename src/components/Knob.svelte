<script lang="ts">
	export let degree = 0;
</script>

<div class="circle-with-line" style="transform: rotate({degree}deg);" />

<style>
	.circle-with-line {
		width: 20px;
		height: 20px;
		border-radius: 50%;
		border: 2px solid black;
		position: relative;
	}

	.circle-with-line::before {
		content: '';
		position: absolute;
		top: 0;
		left: 50%;
		width: 2px;
		height: 50%;
		background-color: black;
		transform: translateX(-50%);
	}
</style>
