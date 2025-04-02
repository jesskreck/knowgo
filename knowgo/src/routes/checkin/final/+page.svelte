<script lang="ts">
	import { goto } from '$app/navigation';
	import Heading from '../../../components/Heading.svelte';

	function navigateForward() {
		goto('/knowgo');
	}
</script>

<div class="max-w-lg m-auto flex flex-col items-center justify-center py-12 text-center">
	<div class="mb-8">
		<Heading level="h1" color="primary" short>KnowGo</Heading>
		<Heading level="h3">Urlaubsübergabe mit KI</Heading>
	</div>
	<Heading level="h2" short>Damit es nie wieder heißt:</Heading>



	<div class="bg-accent shadow-lg rounded-4xl container p-6 m-10">
		<h1 class="text-4xl">😓</h1>
		<h1 class="mb-2 text-xl">✋👎</h1>
		<Heading level="h2" color="accent-content">Erklären dauert zu lange.</Heading>
		<Heading level="h2" color="accent-content">Ich mach's einfach selbst.</Heading>
	</div>

	<div class="mb-8">
		<p class="mb-4">Lass das Chaos in deinem Kopf heraussprudeln.</p>
        <p>KnowGo macht daraus eine <span class="font-bold">schriftliche Übergabe, die deine Kolleg*innen mit Kusshand</span> entgegen nehmen.</p>
	</div>

	<button class="btn btn-primary btn-xl shadow-lg" onclick={navigateForward}>Aufgabe abgeben 😘</button
	>
</div>
