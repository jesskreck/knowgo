<script lang="ts">
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import Heading from '../../../components/Heading.svelte';
	import ChaosCheck from '../../../components/ChaosCheck.svelte';
	import { 
		knowgoState, 
		updateChaosCheck,
		setLoading, 
		setError, 
		clearError 
	} from '../../../lib/knowgo-state.svelte';
	import { analyzeChaos } from '$lib/openai-client';

	// Lokaler State für das Laden
	let localLoading = $state(true);
	let localError = $state('');

	onMount(async () => {
		// Prüfen, ob notwendige Daten vorhanden sind
		if (!knowgoState.taskDescription || !knowgoState.transcript) {
			goto('/knowgo/record');
			return;
		}

		// Wenn schon ein Chaos-Check existiert, diesen anzeigen
		if (knowgoState.chaosCheck) {
			localLoading = false;
			return;
		}

		// Sonst neuen Chaos-Check starten
		localLoading = true;
		clearError();
		setLoading(true);

		try {
			const result = await analyzeChaos(knowgoState.taskDescription, knowgoState.transcript);
			if (result) {
				updateChaosCheck(result);
			} else {
				throw new Error('Keine Analyse-Ergebnisse erhalten');
			}
		} catch (err) {
			console.error('Fehler beim Chaos-Check:', err);
			localError = 'Fehler bei der Analyse. Bitte versuche es erneut.';
			setError('Analyse-Fehler: ' + (err instanceof Error ? err.message : 'Unbekannter Fehler'));
		} finally {
			localLoading = false;
			setLoading(false);
		}
	});

	// Weiter zu den Rückfragen
	function navigateToQuestions() {
		goto('/knowgo/questions');
	}

	function goToRecordPage() {
		goto('/knowgo/record');
	}
</script>

<div class="m-auto flex max-w-4xl flex-col items-center justify-center py-12">
	<Heading level="h1">Chaos-Check</Heading>
	<p class="prose max-w-xl text-center mb-6">
		🤯 KI-Analyse: Ist das eine Übergabe oder eine Rätselrallye?
	</p>

	{#if localError || knowgoState.error}
		<div class="alert alert-error mb-6 max-w-xl w-full">
			<p>{localError || knowgoState.error}</p>
		</div>
	{/if}

	<div class="max-w-3xl w-full">
		<ChaosCheck 
			chaosCheck={knowgoState.chaosCheck} 
			loading={localLoading} 
			onContinue={navigateToQuestions}
		/>
	</div>

	{#if !localLoading && !knowgoState.chaosCheck}
		<button class="btn btn-primary mt-6" onclick={goToRecordPage}>
			Zurück zur Aufnahme
		</button>
	{/if}
</div>