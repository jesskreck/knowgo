<script lang="ts">
	import { goto } from '$app/navigation';
	import Heading from '../components/Heading.svelte';

	function navigateForward() {
		goto('/checkin/about');
	}
</script>

<div class="max-w-4xl m-auto flex flex-col items-center justify-center py-12 text-center">
	<p>Eigentlich wolltest du schon weg sein 👋💨</p>
	<p>... und dann steht wieder jemand vor dir:</p>

	<div class="bg-accent shadow-lg rounded-2xl p-6 m-10">
		<h1 class="text-4xl">🥺</h1>
		<h1 class="mb-2 text-xl">👉👈</h1>
		<Heading level="h2" color="accent-content">Wie hast du das damals nochmal gelöst?</Heading>
		<Heading level="h2" color="accent-content">Was genau muss ich da machen?</Heading>
	</div>

	<div class="mb-8">
		<p>Du weißt:</p>

		<Heading level="h3">Selbst machen würde am schnellsten gehen.</Heading>
		<Heading level="h3">
			Aber das löst das Problem nicht.</Heading
		>
		<p class="m-10">Dann fragen sie dich morgen wieder. 😒 Und übermorgen...😤 Und
			nächste Woche...😫</p>
	</div>

	<button class="btn btn-primary btn-xl" onclick={navigateForward}>Rette meinen Feierabend!</button
	>
</div>
