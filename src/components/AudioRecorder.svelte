<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import AudioVisualizer from './AudioVisualizer.svelte';
	import { checkMicrophonePermission, formatTime } from '$lib/utils/audioUtils';
	import PrivacyTooltip from './PrivacyTooltip.svelte';
	import { goto } from '$app/navigation';
	import { knowgoState, updateRecording, updateTranscript, setLoading, setError, clearError } from '$lib/knowgo-state.svelte';
	import { transcribeAudio } from '$lib/openai-client';

	// Status-Management
	let isRecording = $state(false);
	let isTranscribing = $state(false);
	let recordingTime = $state(0);
	let recordingBlob = $state<Blob | null>(null);
	let permissionDenied = $state(false);
	
	// MediaRecorder Variablen
	let mediaRecorder: MediaRecorder | null = null;
	let timerInterval: number | null = null;
	let mediaStream: MediaStream | null = null;
	let audioChunks: Blob[] = [];

	// Aufnahme starten
	function startRecording() {
		if (isRecording) return;

		// Aufnahmezustand zurücksetzen
		resetRecordingState();
		isRecording = true;

		// Timer starten
		startTimer();

		// Mikrofon anfordern
		requestMicrophone();
	}

	// Zurücksetzen des Aufnahmezustands
	function resetRecordingState() {
		// Vorherigen Stream beenden
		releaseMediaResources();

		recordingBlob = null;
		recordingTime = 0;
		audioChunks = [];
		clearError();
	}

	// Timer starten
	function startTimer() {
		if (timerInterval) clearInterval(timerInterval);

		timerInterval = setInterval(() => {
			recordingTime++;
		}, 1000) as unknown as number;
	}

	// Mikrofon anfordern
	function requestMicrophone() {
		navigator.mediaDevices
			.getUserMedia({ audio: true })
			.then(setupMediaRecorder)
			.catch(handlePermissionDenied);
	}

	// MediaRecorder einrichten
	function setupMediaRecorder(stream: MediaStream) {
		mediaStream = stream;
		mediaRecorder = new MediaRecorder(stream);
		audioChunks = [];

		mediaRecorder.ondataavailable = (event) => {
			if (event.data.size > 0) {
				audioChunks.push(event.data);
			}
		};

		// Aufnahme starten
		try {
			mediaRecorder.start();
		} catch (error) {
			console.error('Fehler beim Starten der Aufnahme:', error);
			cancelRecording();
		}
	}

	// Fehlerbehandlung bei verweigerten Berechtigungen
	function handlePermissionDenied(error: any) {
		console.error('Mikrofon-Zugriff verweigert oder Fehler:', error);
		permissionDenied = true;
		isRecording = false;
	}

	// Aufnahme beenden und verarbeiten
	async function finishRecording() {
		if (!isRecording) return;

		isRecording = false;
		isTranscribing = true;
		stopTimer();

		try {
			// Aufnahme beenden und auf Blob warten
			await stopRecording();
			
			// Blob aus Audio-Chunks erstellen
			const blob = new Blob(audioChunks, { type: 'audio/webm' });
			recordingBlob = blob;
			
			// Im State speichern
			updateRecording(blob);

			// Transkribieren und weiterleiten
			await processRecording(blob);
		} catch (error) {
			console.error('Fehler beim Verarbeiten der Aufnahme:', error);
			setError('Verarbeitungsfehler: ' + (error instanceof Error ? error.message : 'Unbekannter Fehler'));
		} finally {
			isTranscribing = false;
			releaseMediaResources();
		}
	}

	// Verarbeitet die Aufnahme (Transkription und Weiterleitung)
	async function processRecording(blob: Blob) {
		try {
			setLoading(true);
			
			// Transkribieren
			const transcript = await transcribeAudio(blob, 'de', knowgoState.taskDescription);
			
			// Im State speichern
			updateTranscript(transcript);
			
			// Zur nächsten Seite navigieren
			goto('/knowgo/chaos-check');
		} catch (error) {
			console.error('Fehler bei der Transkription:', error);
			setError('Transkriptionsfehler: ' + (error instanceof Error ? error.message : 'Unbekannter Fehler'));
		} finally {
			setLoading(false);
		}
	}

	// Aufnahme stoppen und auf Ergebnis warten
	async function stopRecording(): Promise<void> {
		if (!mediaRecorder || mediaRecorder.state !== 'recording') return Promise.resolve();

		return new Promise<void>((resolve) => {
			mediaRecorder!.onstop = () => resolve();
			mediaRecorder!.stop();
		});
	}

	// Timer stoppen
	function stopTimer() {
		if (timerInterval) {
			clearInterval(timerInterval);
			timerInterval = null;
		}
	}

	// Aufnahme abbrechen
	function cancelRecording() {
		if (isTranscribing) {
			isTranscribing = false;
		} else if (isRecording) {
			// Wenn wir aufnehmen, Aufnahme abbrechen
			isRecording = false;
			stopTimer();
			
			try {
				if (mediaRecorder && mediaRecorder.state === 'recording') {
					mediaRecorder.stop();
				}
			} catch (error) {
				console.error('Fehler beim Stoppen der Aufnahme:', error);
			}
			
			releaseMediaResources();

			// Alles zurücksetzen
			mediaRecorder = null;
			recordingTime = 0;
			recordingBlob = null;
			audioChunks = [];
		}
	}

	// Medienressourcen freigeben
	function releaseMediaResources() {
		if (mediaStream) {
			mediaStream.getTracks().forEach((track) => track.stop());
			mediaStream = null;
		}
	}

	// Komponenten-Lifecycle
	onMount(() => {
		// Initial nur Berechtigungen prüfen
		checkMicrophonePermission().then((granted) => {
			permissionDenied = !granted;
		});
	});

	onDestroy(() => {
		stopTimer();
		releaseMediaResources();
	});
</script>

<div class="flex flex-col gap-4">
	<div class="flex flex-row items-center justify-around py-5">
		{#if !isRecording && !isTranscribing}
			<!-- Start Recording Button -->
			<button
				class="btn btn-primary btn-xl btn-circle"
				onclick={startRecording}
				disabled={permissionDenied}
				aria-label="Aufnahme starten"
			>
				🎙️
			</button>

			{#if permissionDenied}
				<div class="alert alert-error mt-2">
					<p>
						Mikrofon-Zugriff wurde verweigert. Bitte erlaube den Zugriff in deinen
						Browser-Einstellungen.
					</p>
				</div>
			{/if}
		{:else}
			<!-- Recording Controls -->
			<button
				class="btn btn-circle btn-primary btn-outline btn-xl"
				onclick={cancelRecording}
				aria-label={isTranscribing ? "Transkription abbrechen" : "Aufnahme abbrechen"}
			>
				✕
			</button>

			<AudioVisualizer animated={isRecording && !isTranscribing} />

			<!-- Timer -->
			<div class="font-mono text-lg" aria-live="polite" aria-label="Aufnahmezeit">
				{formatTime(recordingTime)}
			</div>

			<!-- Finish Button -->
			<button
				class="btn btn-circle btn-primary btn-xl relative"
				onclick={finishRecording}
				disabled={isTranscribing}
				aria-label="Aufnahme beenden und senden"
			>
				{#if isTranscribing}
					<span class="loading loading-spinner loading-xs absolute"></span>
				{:else}
					↑
				{/if}
			</button>
		{/if}
	</div>
</div>