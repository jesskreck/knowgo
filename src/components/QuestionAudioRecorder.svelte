<script lang="ts">
	// Diese Komponente soll in src/components/QuestionAudioRecorder.svelte erstellt werden
	import { onMount, onDestroy } from 'svelte';
	import AudioVisualizer from './AudioVisualizer.svelte';
	import { checkMicrophonePermission, formatTime } from '$lib/utils/audioUtils';
	import PrivacyTooltip from './PrivacyTooltip.svelte';

	type QuestionAudioRecorderProps = {
		questionIndex: number;
		onRecordingComplete: (index: number, blob: Blob) => void;
	};

	let { questionIndex, onRecordingComplete }: QuestionAudioRecorderProps = $props();

	// Status-Management
	let isRecording = $state(false);
	let isProcessing = $state(false);
	let recordingTime = $state(0);
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

		recordingTime = 0;
		audioChunks = [];
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
		isProcessing = true;
		stopTimer();

		try {
			// Aufnahme beenden und auf Blob warten
			await stopRecording();
			
			// Blob aus Audio-Chunks erstellen
			const blob = new Blob(audioChunks, { type: 'audio/webm' });
			
			// Callback für die Verarbeitung aufrufen
			onRecordingComplete(questionIndex, blob);
		} catch (error) {
			console.error('Fehler beim Verarbeiten der Aufnahme:', error);
		} finally {
			isProcessing = false;
			releaseMediaResources();
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
		if (isProcessing) {
			isProcessing = false;
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
		{#if !isRecording && !isProcessing}
			<!-- Start Recording Button -->
			<button
				class="btn btn-primary btn-xl btn-circle" 
				onclick={startRecording}
				disabled={permissionDenied}
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
				aria-label="Aufnahme abbrechen"
			>
				✕
			</button>

			<AudioVisualizer animated={isRecording && !isProcessing} />

			<!-- Timer -->
			<div class="font-mono text-lg" aria-live="polite" aria-label="Aufnahmezeit">
				{formatTime(recordingTime)}
			</div>

			<!-- Finish Button -->
			<button
				class="btn btn-circle btn-primary btn-xl relative"
				onclick={finishRecording}
				disabled={isProcessing}
				aria-label="Aufnahme beenden und senden"
			>
				{#if isProcessing}
					<span class="loading loading-spinner loading-xs absolute"></span>
				{:else}
					↑
				{/if}
			</button>
		{/if}
	</div>
</div>