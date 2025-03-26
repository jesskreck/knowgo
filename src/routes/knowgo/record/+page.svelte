<script lang="ts">
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import Heading from '../../../components/Heading.svelte';
	import AudioRecorder from '../../../components/AudioRecorder.svelte';
	import { 
		knowgoState, 
		updateRecording, 
		updateTranscript, 
		setLoading, 
		setError, 
		clearError 
	} from '../../../lib/knowgo-state.svelte';
	import { transcribeAudio } from '$lib/openai-client';
	import PrivacyTooltip from '../../../components/PrivacyTooltip.svelte';

	// Lokaler State für die Aufnahme
	let recordingBlob = $state<Blob | null>(null);
	let isTranscribing = $state(false);
	let localError = $state('');

	// Beim Laden der Seite prüfen, ob eine Beschreibung existiert
	onMount(() => {
		if (!knowgoState.taskDescription) {
			// Zurück zur Drop-Seite, wenn keine Beschreibung vorhanden ist
			goto('/knowgo/drop');
			return;
		}

		// Bestehende Aufnahme laden, falls vorhanden
		if (knowgoState.recordingBlob) {
			recordingBlob = knowgoState.recordingBlob;
		}

		clearError();
	});

	// Handler für fertige Aufnahme
	function handleRecordingReady(blob: Blob, duration: number) {
		recordingBlob = blob;
		updateRecording(blob);
	}

	// Transkription der Audio starten
	async function startTranscription() {
		if (!recordingBlob) return;

		isTranscribing = true;
		localError = '';
		setLoading(true);
		clearError();

		try {
			const transcript = await transcribeAudio(recordingBlob);
			
			// Transkription im zentralen State speichern
			updateTranscript(transcript);
			
			// Zur nächsten Seite navigieren
			goto('/knowgo/chaos-check');
		} catch (err) {
			console.error('Fehler bei der Transkription:', err);
			localError = 'Fehler bei der Transkription. Bitte versuche es erneut.';
			setError('Transkriptionsfehler: ' + (err instanceof Error ? err.message : 'Unbekannter Fehler'));
		} finally {
			isTranscribing = false;
			setLoading(false);
		}
	}

	function goToDropPage() {
		goto('/knowgo/drop');
	}
</script>

<div class="m-auto flex max-w-4xl flex-col items-center justify-center py-12">
	<Heading level="h1">Drop & Go</Heading>
	<p class="prose max-w-xl text-center mb-6">
		🎙️ Einfach drauflosreden – die KI sortiert das Chaos für dich!
	</p>

	{#if knowgoState.taskDescription}
		<div class="bg-base-200 p-4 rounded-lg mb-6 max-w-xl w-full">
			<h3 class="font-bold">Deine Aufgabe:</h3>
			<p>{knowgoState.taskDescription}</p>
		</div>
	{/if}

	<div class="max-w-xl w-full mb-8">
		<AudioRecorder 
			label="Erklär's so unstrukturiert, müde oder genervt wie du willst."
			maxTime={120}
			onRecordingReady={handleRecordingReady}
		/>
	</div>

	{#if recordingBlob}
		<button 
			class="btn btn-primary btn-lg" 
			onclick={startTranscription}
			disabled={isTranscribing}
		>
			{#if isTranscribing}
				<span class="loading loading-spinner"></span> Wird transkribiert...
			{:else}
				Mach was draus
			{/if}
		</button>

		<PrivacyTooltip note="Klickst du auf 'Mach was draus' schicken wir den Text zu deiner Aufnahme zur Analyse an unsere API. Die Analyseergebnisse siehst du gleich."/>
	{:else}
		<!-- <p class="text-center text-sm mb-4">
			Nimm deine Erklärung auf, um fortzufahren
		</p> -->
	{/if}

	{#if localError || knowgoState.error}
		<div class="alert alert-error mt-4 max-w-xl w-full">
			<p>{localError || knowgoState.error}</p>
		</div>
	{/if}

	<button class="btn btn-outline btn-sm mt-6" onclick={goToDropPage}>
		Zurück zur Aufgabenbeschreibung
	</button>
</div>