<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import PrivacyTooltip from './PrivacyTooltip.svelte';

	// Korrekte Prop-Deklaration für Svelte 5
	type AudioRecorderProps = {
		label?: string;
		autostop?: boolean;
		maxTime?: number;
		onRecordingReady?: (blob: Blob, duration: number) => void;
	};

	let {
		label = 'Aufnahme',
		autostop = false,
		maxTime = 300,
		onRecordingReady = (blob: Blob, duration: number) => {}
	}: AudioRecorderProps = $props();

	let recording = $state(false);
	let recordingTime = $state(0);
	let audioURL = $state<string | null>(null);
	let audioBlob = $state<Blob | null>(null);
	let mediaRecorder: MediaRecorder | null = null;
	let audioChunks: Blob[] = [];
	let timerInterval: number | null = null;
	let statusMessage = $state('');
	let permissionDenied = $state(false);

	// Stream für das Beenden der Aufnahme
	let mediaStream: MediaStream | null = null;

	function formatTime(seconds: number): string {
		const mins = Math.floor(seconds / 60);
		const secs = seconds % 60;
		return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
	}

	function startRecording() {
		if (recording) return;

		// Immer einen neuen Stream anfordern, um sicherzustellen, dass wir einen frischen Recorder bekommen
		// Zuerst vorherigen Stream beenden, falls vorhanden
		if (mediaStream) {
			mediaStream.getTracks().forEach((track) => track.stop());
			mediaStream = null;
		}

		audioChunks = [];
		audioURL = null;
		audioBlob = null;
		recording = true;
		recordingTime = 0;
		statusMessage = 'Aufnahme läuft...';

		if (timerInterval) clearInterval(timerInterval);

		timerInterval = setInterval(() => {
			recordingTime++;

			if (autostop && recordingTime >= maxTime) {
				stopRecording();
			}
		}, 1000) as unknown as number;

		// Immer einen neuen Stream anfordern
		navigator.mediaDevices
			.getUserMedia({ audio: true })
			.then((stream) => {
				mediaStream = stream;
				mediaRecorder = new MediaRecorder(stream);

				mediaRecorder.ondataavailable = (event) => {
					if (event.data.size > 0) {
						audioChunks.push(event.data);
					}
				};

				mediaRecorder.onstop = () => {
					const blob = new Blob(audioChunks, { type: 'audio/webm' });
					audioBlob = blob;
					audioURL = URL.createObjectURL(blob);
					statusMessage = 'Aufnahme bereit';

					if (audioBlob) {
						onRecordingReady(audioBlob, recordingTime);
					}
				};

				// Starte die Aufnahme
				try {
					mediaRecorder.start();
				} catch (error) {
					console.error('Fehler beim Starten der Aufnahme:', error);
					stopRecording(); // Stoppen, wenn es einen Fehler gibt
					statusMessage = 'Fehler beim Starten der Aufnahme. Bitte versuche es erneut.';
				}
			})
			.catch((error) => {
				console.error('Mikrofon-Zugriff verweigert oder Fehler:', error);
				permissionDenied = true;
				statusMessage = 'Mikrofon-Zugriff verweigert oder nicht verfügbar';
				recording = false;
			});
	}

	function stopRecording() {
		if (!recording) return;

		recording = false;
		statusMessage = 'Verarbeite Aufnahme...';

		if (timerInterval) {
			clearInterval(timerInterval);
			timerInterval = null;
		}

		// Sichere Überprüfung, ob der Recorder aktiv ist
		try {
			if (mediaRecorder && mediaRecorder.state === 'recording') {
				mediaRecorder.stop();
			}
		} catch (error) {
			console.error('Fehler beim Stoppen der Aufnahme:', error);
		}

		// Alle Tracks des Streams beenden, um das Mikrofon freizugeben
		if (mediaStream) {
			mediaStream.getTracks().forEach((track) => track.stop());
		}
	}

	function discardRecording() {
		if (recording) {
			stopRecording();
		}

		// Media-Ressourcen freigeben
		if (audioURL) {
			URL.revokeObjectURL(audioURL);
		}

		// Stream beenden
		if (mediaStream) {
			mediaStream.getTracks().forEach((track) => track.stop());
			mediaStream = null;
		}

		// Recorder zurücksetzen
		mediaRecorder = null;

		audioURL = null;
		audioBlob = null;
		recordingTime = 0;
		statusMessage = '';
	}

	onMount(() => {
		// Initial nur Berechtigungen prüfen, aber keinen Stream anfordern
		navigator.mediaDevices
			.getUserMedia({ audio: true })
			.then((stream) => {
				// Sofort wieder beenden, damit das Mikrofon nicht aktiv bleibt
				stream.getTracks().forEach((track) => track.stop());
			})
			.catch((error) => {
				console.error('Mikrofon-Zugriff verweigert oder Fehler:', error);
				permissionDenied = true;
				statusMessage = 'Mikrofon-Zugriff verweigert oder nicht verfügbar';
			});
	});

	onDestroy(() => {
		if (timerInterval) {
			clearInterval(timerInterval);
		}

		if (audioURL) {
			URL.revokeObjectURL(audioURL);
		}

		// Wichtig: Alle Tracks des Streams beenden, wenn die Komponente zerstört wird
		if (mediaStream) {
			mediaStream.getTracks().forEach((track) => track.stop());
		}
	});
</script>

<div class="audio-recorder bg-base-200 w-full rounded-lg p-4 shadow-sm">
	<div class="flex flex-col items-center gap-4">
		<!-- Status und Timer -->
		<div class="mb-2 flex w-full items-center justify-between">
			<span class="text-sm font-medium">{label}</span>
			<span class="font-mono text-lg" class:text-error={recordingTime > maxTime - 30 && recording}>
				{formatTime(recordingTime)}
			</span>
		</div>

		<!-- Statusnachricht -->
		{#if statusMessage}
			<p class="mb-2 text-center text-sm">{statusMessage}</p>
		{/if}

		<!-- Fehleranzeige bei verweigerten Rechten -->
		{#if permissionDenied}
			<div class="alert alert-error">
				<p>
					Mikrofon-Zugriff wurde verweigert. Bitte erlaube den Zugriff in deinen
					Browser-Einstellungen.
				</p>
			</div>
		{/if}

		<!-- Aufnahme-Visualisierung -->
		{#if recording}
			<div
				class="bg-base-300 flex h-12 w-full items-center justify-center overflow-hidden rounded-lg"
			>
				<div class="recording-animation">
					<div class="bar"></div>
					<div class="bar"></div>
					<div class="bar"></div>
					<div class="bar"></div>
					<div class="bar"></div>
				</div>
			</div>
		{/if}

		<!-- Audio Player für aufgenommene Audio -->
		{#if audioURL && !recording}
			<audio src={audioURL} controls class="w-full"></audio>
		{/if}

		<!-- Steuerungselemente -->
		<div class="mt-2 flex gap-2">
			{#if !recording && !audioURL}
				<button class="btn btn-primary" onclick={startRecording} disabled={permissionDenied}>
					<span>🎙️ Aufnahme starten</span>
				</button>
				{:else if recording}
				<button class="btn btn-error" onclick={stopRecording}>
					<span>⏹️ Aufnahme beenden</span>
				</button>
				{:else}
				<button class="btn btn-outline" onclick={discardRecording}>
					<span>🗑️ Verwerfen</span>
				</button>
				<button class="btn btn-primary" onclick={startRecording}>
					<span>🔄 Neu aufnehmen</span>
				</button>
				{/if}
			</div>
			<PrivacyTooltip
				note="Deine Audioaufnahme wird nicht gespeichert.
Sie wird einmalig an OpenAI geschickt, um daraus einen Text zu machen.
Danach ist die Aufnahme weg – auch bei uns.
Hinweis: OpenAI kann laut ihren Nutzungsbedingungen Audiodaten zu Trainingszwecken speichern."
			/>
	</div>
</div>

<style>
	.recording-animation {
		display: flex;
		align-items: center;
		height: 100%;
		gap: 3px;
	}

	.bar {
		width: 4px;
		height: 10px;
		animation: sound 0.5s linear infinite alternate;
	}

	.bar:nth-child(1) {
		animation-delay: 0s;
	}
	.bar:nth-child(2) {
		animation-delay: 0.1s;
	}
	.bar:nth-child(3) {
		animation-delay: 0.2s;
	}
	.bar:nth-child(4) {
		animation-delay: 0.1s;
	}
	.bar:nth-child(5) {
		animation-delay: 0.3s;
	}

	@keyframes sound {
		0% {
			height: 5px;
		}
		100% {
			height: 25px;
		}
	}
</style>
