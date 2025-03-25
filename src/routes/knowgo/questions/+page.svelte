<script lang="ts">
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import Heading from '../../../components/Heading.svelte';
	import FollowUpQuestions from '../../../components/FollowUpQuestions.svelte';
	import { 
		knowgoState, 
		updateQuestions,
		updateAnswer,
		updateAnswerText,
		setLoading, 
		setError, 
		clearError 
	} from '../../../lib/knowgo-state.svelte';
	import { generateFollowUpQuestions, transcribeAudio } from '$lib/openai-client';

	// Lokaler State für das Laden und Verarbeiten
	let localLoading = $state(true);
	let localError = $state('');
	let processingAnswers = $state(false);

	onMount(async () => {
		// Prüfen, ob notwendige Daten vorhanden sind
		if (!knowgoState.taskDescription || !knowgoState.transcript || !knowgoState.chaosCheck) {
			goto('/knowgo/chaos-check');
			return;
		}

		// Wenn schon Fragen existieren, diese anzeigen
		if (knowgoState.questions) {
			localLoading = false;
			return;
		}

		// Sonst neue Fragen generieren
		localLoading = true;
		clearError();
		setLoading(true);

		try {
			const result = await generateFollowUpQuestions(
				knowgoState.taskDescription, 
				knowgoState.transcript, 
				knowgoState.chaosCheck
			);
			
			if (result) {
				updateQuestions(result);
			} else {
				throw new Error('Keine Fragen erhalten');
			}
		} catch (err) {
			console.error('Fehler beim Generieren der Rückfragen:', err);
			localError = 'Fehler beim Generieren der Rückfragen. Bitte versuche es erneut.';
			setError('Fragen-Fehler: ' + (err instanceof Error ? err.message : 'Unbekannter Fehler'));
		} finally {
			localLoading = false;
			setLoading(false);
		}
	});

	// Audio-Antwort transkribieren
	async function handleTranscribeRequest(index: number, blob: Blob) {
		try {
			// Blob im State speichern
			updateAnswer(index, blob);
			
			// Transkription der Audio-Antwort
			const transcription = await transcribeAudio(blob);
			
			// Antwort aktualisieren
			updateAnswerText(index, transcription);
		} catch (err) {
			console.error('Fehler bei der Transkription:', err);
			setError('Transkriptionsfehler: ' + (err instanceof Error ? err.message : 'Unbekannter Fehler'));
		}
	}

	// Weiter zum Ergebnis
	async function handleFinished(answers: Record<number, { blob: Blob | null, text: string | null }>) {
		processingAnswers = true;
		clearError();
		
		try {
			// Antworten bereits im State gespeichert durch handleTranscribeRequest
			// Direkt zur Ergebnisseite navigieren
			goto('/knowgo/result');
		} catch (err) {
			console.error('Fehler bei der Verarbeitung der Antworten:', err);
			localError = 'Fehler bei der Verarbeitung der Antworten. Bitte versuche es erneut.';
			setError('Verarbeitungsfehler: ' + (err instanceof Error ? err.message : 'Unbekannter Fehler'));
			processingAnswers = false;
		}
	}

	function goToChaosCheckPage() {
		goto('/knowgo/chaos-check');
	}
</script>

<div class="m-auto flex max-w-4xl flex-col items-center justify-center py-12">
	<Heading level="h1">Und was ist mit...?</Heading>
	<p class="prose max-w-xl text-center mb-6">
		🤔 Die Fragen, die sonst eh kommen würden – jetzt schon beantwortet.
	</p>

	{#if localError || knowgoState.error}
		<div class="alert alert-error mb-6 max-w-xl w-full">
			<p>{localError || knowgoState.error}</p>
		</div>
	{/if}

	{#if processingAnswers}
		<div class="w-full flex flex-col items-center justify-center p-8">
			<span class="loading loading-spinner loading-lg text-primary"></span>
			<p class="mt-4 text-lg font-medium">Deine Antworten werden verarbeitet...</p>
		</div>
	{:else}
		<div class="max-w-3xl w-full">
			<FollowUpQuestions 
				questions={knowgoState.questions} 
				loading={localLoading}
				onFinished={handleFinished}
				onTranscribeRequest={handleTranscribeRequest}
			/>
		</div>
	{/if}

	{#if !localLoading && !knowgoState.questions}
		<button class="btn btn-primary mt-6" onclick={goToChaosCheckPage}>
			Zurück zum Chaos-Check
		</button>
	{/if}
</div>