<script lang="ts">
	import { goto } from '$app/navigation';
	import Heading from '../components/Heading.svelte';
	import meme from "$lib/assets/urlaub.gif"

	function navigateForward() {
		goto('/knowgo/start');
	}
</script>
<div class="relative w-full max-w-full sm:max-w-xl m-auto">
	<img src={meme} alt="Mann mit Laptop im Wasser" class="w-full" />
	<div class="absolute top-4 left-0 w-full text-center">
		<p class="text-white text-3xl font-bold uppercase drop-shadow-lg sm:text-5xl">
		Wenn du denkst, du bist im Urlaub:
	  </p>
	</div>
  </div>

<div class="max-w-xl m-auto flex flex-col items-center justify-center py-12 text-center">
	

	
		<Heading level="h1" color="primary" short>KnowGo</Heading>
		<Heading level="h2">Übergabe in 2 Minuten</Heading>
		<Heading level="h3">Abschalten. Nicht nur das Hintergrundbild wechseln.</Heading>


	<button class="mt-8 btn btn-primary btn-xl" onclick={navigateForward}>Rette meinen Urlaub!</button
	>
</div>
