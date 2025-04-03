<script lang="ts">
	import { goto } from '$app/navigation';
	import Heading from '../../../components/Heading.svelte';
	import PrivacyTooltip from '../../../components/PrivacyTooltip.svelte';
	import { knowgoState, updateTaskDescription, resetState } from '../../../lib/knowgo-state.svelte';
	import { onMount } from 'svelte';

	// Lokaler State für die Eingabe
	let taskDescription = $state('');

	// State bei Seitenaufruf zurücksetzen, falls nötig
	onMount(() => {
		// Bestehende Task-Beschreibung laden, falls vorhanden
		if (knowgoState.taskDescription) {
			taskDescription = knowgoState.taskDescription;
		} else {
			// State für neuen Durchlauf zurücksetzen
			resetState();
		}
	});

	function navigateToRecord() {
		// Beschreibung im zentralen State speichern
		updateTaskDescription(taskDescription);
		// Zur nächsten Seite navigieren
		goto('/knowgo/record');
	}

	function goToExit() {
		goto('/exit');
	}

	// Prüfen, ob eine Beschreibung eingegeben wurde
	let isValidDescription = $derived(taskDescription.trim().length > 0);
</script>

<div class="m-auto flex max-w-4xl flex-col items-center justify-center py-12">
	<Heading level="h1">Welche Aufgabe gibst du ab?</Heading>
	<p class="prose">📝 Kurz & knapp in einem Satz:</p>

	<div class="w-full max-w-xl p-10">
		<textarea
			bind:value={taskDescription}
			placeholder="Worum geht's?"
			class="textarea textarea-primary textarea-lg h-32 w-full rounded border"
		></textarea>
	</div>

	<button
		class="btn btn-primary btn-lg mb-3"
		onclick={navigateToRecord}
		disabled={!isValidDescription}
	>
		🎙️ Mic me up
	</button>

	<PrivacyTooltip open primary note="Was du hier eintippst, bleibt erstmal lokal im Browser. Kein automatischer Versand, kein Tracking. Die nächsten Privacy Hinweise öffnest du auf Bedarf per Klick." />
</div>
