<script lang="ts">
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import Heading from '../../../components/Heading.svelte';
	import AudioRecorder from '../../../components/AudioRecorder.svelte';
	import { knowgoState, clearError } from '../../../lib/knowgo-state.svelte';
	import PrivacyTooltip from '../../../components/PrivacyTooltip.svelte';

	// Beim Laden der Seite prüfen, ob eine Beschreibung existiert
	onMount(() => {
		if (!knowgoState.taskDescription) {
			// Zurück zur Drop-Seite, wenn keine Beschreibung vorhanden ist
			goto('/knowgo');
			return;
		}

		clearError();
	});

	function goToStart() {
		goto('/knowgo/start');
	}
</script>

<div class="m-auto flex max-w-4xl flex-col items-center justify-center py-12">
	<Heading level="h1">Was hat deine Vertretung zu tun?</Heading>
	<p class="prose max-w-xl text-center mb-6">
		🎙️ Einfach drauflosreden – egal ob unstrukturiert, müde oder genervt.
	</p>

	{#if knowgoState.taskDescription}
		<div class="bg-base-200 p-4 rounded-lg mb-6 max-w-xl w-full">
			<h3 class="font-bold">Aufgabenkontext:</h3>
			<p>{knowgoState.taskDescription}</p>
			<button class="btn btn-outline btn-xs mt-6" onclick={goToStart}>
				ändern
			</button>
		</div>
	{/if}

	<div class="max-w-xl w-full mb-8">
		<AudioRecorder />
	</div>

	<PrivacyTooltip
		note="Deine Audioaufnahme wird nicht gespeichert.
Sie wird einmalig an OpenAI geschickt, um daraus einen Text zu machen.
Danach ist die Aufnahme weg – auch bei uns.
Hinweis: OpenAI kann laut ihren Nutzungsbedingungen Audiodaten zu Trainingszwecken speichern."
	/>

	{#if knowgoState.error}
		<div class="alert alert-error mt-4 max-w-xl w-full">
			<p>{knowgoState.error}</p>
		</div>
	{/if}

</div>