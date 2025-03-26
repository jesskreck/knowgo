<script lang="ts">
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import Heading from '../../../components/Heading.svelte';
	import HandoverDocument from '../../../components/HandoverDocument.svelte';
	import { 
		knowgoState, 
		updateDocument,
		setLoading, 
		setError, 
		clearError 
	} from '../../../lib/knowgo-state.svelte';
	import { createHandoverDocument } from '$lib/openai-client';

	// Lokaler State für das Laden
	let localLoading = $state(true);
	let localError = $state('');
	let userRating = $state(0);


	onMount(async () => {
		// Prüfen, ob notwendige Daten vorhanden sind
		if (!knowgoState.taskDescription || !knowgoState.transcript || !knowgoState.questions) {
			goto('/knowgo/questions');
			return;
		}

		// Wenn schon ein Dokument existiert, dieses anzeigen
		if (knowgoState.document) {
			localLoading = false;
			return;
		}

		// Sonst neues Dokument generieren
		localLoading = true;
		clearError();
		setLoading(true);

		try {
			// Antworten für die API vorbereiten
			const answersMap: Record<string, string> = {};
			for (const [index, answer] of Object.entries(knowgoState.answers)) {
				if (answer.text) {
					answersMap[index] = answer.text;
				}
			}
			
			const result = await createHandoverDocument(
				knowgoState.taskDescription,
				knowgoState.transcript,
				knowgoState.questions,
				answersMap
			);
			
			if (result) {
				updateDocument(result);
			} else {
				throw new Error('Kein Dokument erhalten');
			}
		} catch (err) {
			console.error('Fehler beim Erstellen des Übergabedokuments:', err);
			localError = 'Fehler beim Erstellen des Übergabedokuments. Bitte versuche es erneut.';
			setError('Dokument-Fehler: ' + (err instanceof Error ? err.message : 'Unbekannter Fehler'));
		} finally {
			localLoading = false;
			setLoading(false);
		}
	});

	// Bewertung speichern
	async function handleRating(rating: number) {
	userRating = rating;

	try {
		const response = await fetch('/api/rating', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ rating })
		});

		const result = await response.json();

		if (!result.success) {
			console.error('Fehler beim Speichern der Bewertung:', result.error);
		} else {
			console.log('Rating erfolgreich gespeichert!');
		}
	} catch (err) {
		console.error('Fehler beim Rating-Request:', err);
	}
}


	// Weiter zum Kalender
	function navigateToCalendar() {
		goto('/exit');
	}

	function goToQuestionsPage() {
		goto('/knowgo/questions');
	}
</script>

<div class="m-auto flex max-w-5xl flex-col items-center justify-center py-12">
	<Heading level="h1">Klartext & Klappe zu</Heading>
	<p class="prose max-w-xl text-center mb-6">
		✅ Die Übergabe ist erledigt, now go enjoy!
	</p>

	{#if localError || knowgoState.error}
		<div class="alert alert-error mb-6 max-w-xl w-full">
			<p>{localError || knowgoState.error}</p>
		</div>
	{/if}

	<div class="max-w-4xl w-full">
		<HandoverDocument 
			document={knowgoState.document} 
			loading={localLoading}
			onRate={handleRating}
			onNext={navigateToCalendar}
		/>
	</div>

	{#if !localLoading && !knowgoState.document}
		<button class="btn btn-primary mt-6" onclick={goToQuestionsPage}>
			Zurück zu den Rückfragen
		</button>
	{/if}
</div>