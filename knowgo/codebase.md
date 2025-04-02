# .gitignore

```
node_modules

# Output
.output
.vercel
.netlify
.wrangler
/.svelte-kit
/build

# OS
.DS_Store
Thumbs.db

# Env
.env
.env.*
!.env.example
!.env.test

# Vite
vite.config.js.timestamp-*
vite.config.ts.timestamp-*

```

# .npmrc

```
engine-strict=true

```

# .prettierignore

```
# Package Managers
package-lock.json
pnpm-lock.yaml
yarn.lock

```

# .prettierrc

```
{
	"useTabs": true,
	"singleQuote": true,
	"trailingComma": "none",
	"printWidth": 100,
	"plugins": ["prettier-plugin-svelte", "prettier-plugin-tailwindcss"],
	"overrides": [
		{
			"files": "*.svelte",
			"options": {
				"parser": "svelte"
			}
		}
	]
}

```

# netlify.toml

```toml
[build]
  publish = "build"
  command = "npm run build"
  environment = { NODE_VERSION = "18" }

# Cache Control für statische Assets
[[headers]]
  for = "/assets/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

# Sicherheitsheader
[[headers]]
  for = "/*"
  [headers.values]
    X-Content-Type-Options = "nosniff"
    X-Frame-Options = "DENY"
    X-XSS-Protection = "1; mode=block"
    Referrer-Policy = "same-origin"
```

# package.json

```json
{
	"name": "knowgo",
	"private": true,
	"version": "0.0.1",
	"type": "module",
	"scripts": {
		"dev": "vite dev",
		"build": "vite build",
		"preview": "vite preview",
		"prepare": "svelte-kit sync || echo ''",
		"check": "svelte-kit sync && svelte-check --tsconfig ./tsconfig.json",
		"check:watch": "svelte-kit sync && svelte-check --tsconfig ./tsconfig.json --watch",
		"format": "prettier --write .",
		"lint": "prettier --check ."
	},
	"devDependencies": {
		"@sveltejs/adapter-netlify": "^5.0.0",
		"@sveltejs/adapter-node": "^5.2.12",
		"@sveltejs/adapter-static": "^3.0.8",
		"@sveltejs/kit": "^2.16.0",
		"@sveltejs/vite-plugin-svelte": "^5.0.0",
		"@tailwindcss/forms": "^0.5.9",
		"@tailwindcss/typography": "^0.5.16",
		"@tailwindcss/vite": "^4.0.14",
		"daisyui": "^5.0.6",
		"prettier": "^3.4.2",
		"prettier-plugin-svelte": "^3.3.3",
		"prettier-plugin-tailwindcss": "^0.6.11",
		"svelte": "^5.0.0",
		"svelte-check": "^4.0.0",
		"tailwindcss": "^4.0.14",
		"typescript": "^5.0.0",
		"vite": "^6.0.0"
	},
	"dependencies": {
		"@auth/core": "^0.38.0",
		"@auth/sveltekit": "^1.8.0",
		"@supabase/supabase-js": "^2.49.1",
		"openai": "^4.89.0",
		"theme-change": "^2.5.0",
		"zod": "^3.24.2"
	}
}

```

# README.md

```md
# KnowGo - Smarte Übergaben leicht gemacht

Eine Svelte 5 Anwendung zur Verbesserung von Wissenstransfer und Aufgabenübergaben mit KI-Unterstützung.

## Features

- 🎙️ **Audio-basierte Übergaben**: Nimm deine Erklärung einfach auf und lass die KI das Chaos strukturieren
- 🤖 **KI-Analyse**: Automatische Bewertung der Qualität und Klarheit deiner Übergabe
- 🧠 **Intelligente Rückfragen**: Identifiziert fehlende Informationen und generiert gezielte Nachfragen
- 📄 **Strukturierte Dokumentation**: Erstellt ein vollständiges Übergabedokument mit allen wichtigen Informationen

## Technologien

- [Svelte 5](https://svelte.dev) mit den neuen Runes-Features
- [SvelteKit 2](https://kit.svelte.dev) für Routing und Serverless-Funktionen
- [TailwindCSS 4](https://tailwindcss.com) und [DaisyUI](https://daisyui.com) für das UI
- [OpenAI API](https://openai.com) für Transkription und KI-Analyse
- [TypeScript](https://www.typescriptlang.org) für typsichere Entwicklung

## Einrichtung

1. Repo klonen:
   \`\`\`bash
   git clone https://github.com/yourusername/knowgo.git
   cd knowgo
   \`\`\`

2. Abhängigkeiten installieren:
   \`\`\`bash
   npm install
   \`\`\`

3. Umgebungsvariablen einrichten:
   Erstelle eine `.env`-Datei im Wurzelverzeichnis mit folgendem Inhalt:
   \`\`\`
   VITE_OPENAI_API_KEY=dein_openai_api_key
   VITE_SUPABASE_ANON_KEY=dein_supabase_anon_key
   VITE_SUPABASE_SERVICE_KEY=dein_supabase_service_key
   \`\`\`

4. Entwicklungsserver starten:
   \`\`\`bash
   npm run dev
   \`\`\`

## Deployment

Die Anwendung ist für das Deployment auf Netlify optimiert:

1. Stelle sicher, dass `@sveltejs/adapter-static` korrekt konfiguriert ist:
   \`\`\`js
   // svelte.config.js
   import adapter from '@sveltejs/adapter-static';
   
   export default {
     kit: {
       adapter: adapter({
         fallback: 'index.html' // Wichtig für SPA-Modus
       })
     }
   };
   \`\`\`

2. Erstelle eine `_redirects`-Datei im `static`-Verzeichnis:
   \`\`\`
   /* /index.html 200
   \`\`\`

3. Baue die Anwendung:
   \`\`\`bash
   npm run build
   \`\`\`

## Projektstruktur

- `/src/components` - Wiederverwendbare UI-Komponenten
- `/src/lib` - Shared utilities und runes-basierte Services
- `/src/routes` - Seitenstruktur und Routing
- `/static` - Statische Assets und Dateien

## Lizenz

MIT

## Kontakt

Jessica Krecker - [https://github.com/yourusername](https://github.com/yourusername)

```

# src\app.css

```css
@import "tailwindcss";
/* @plugin '@tailwindcss/forms'; */
@plugin '@tailwindcss/typography';
@plugin "daisyui";

@tailwind utilities;


@plugin "daisyui" {
  themes: all;
}

@layer base{
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    @apply font-bold;
  }
}

```

# src\app.d.ts

```ts
// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};

```

# src\app.html

```html
<!doctype html>
<html lang="en" data-theme="emerald">
	<head>
		<meta charset="utf-8" />
		<link rel="icon" href="%sveltekit.assets%/favicon.png" />
		<title>KnowGo - Urlaubsübergabe mit KI</title>
		<meta name="viewport" content="width=device-width, initial-scale=1" />
		
		<!-- Open Graph (Facebook, LinkedIn, ...) -->
		<meta property="og:title" content="KnowGo – Urlaubsübergabe mit KI" />
		<meta property="og:description" content="Ein Prototyp. Noch nicht fertig. Aber jetzt schon nützlich." />
		<meta property="og:url" content="https://knowgo.jesskreck.de/" />
		<meta property="og:type" content="website" />
	  
		<!-- Twitter Card -->
		<meta name="twitter:card" content="summary_large_image" />
		<meta name="twitter:title" content="KnowGo – Urlaubsübergabe mit KI" />
		<meta name="twitter:description" content="Ein Prototyp. Noch nicht fertig. Aber jetzt schon nützlich." />



		%sveltekit.head%
	</head>
	<body data-sveltekit-preload-data="hover">
		<div style="display: contents">%sveltekit.body%</div>
	</body>
</html>
```

# src\components\AnsweredQuestions.svelte

```svelte
<script lang="ts">
  type AnsweredQuestionsProps = {
    questions: Array<{
      index: number;
      question: string;
      importance: number;
    }>;
    answers: Record<number, { blob: Blob | null; text: string | null }>;
  };
  
  let { questions, answers }: AnsweredQuestionsProps = $props();
  
  function getImportanceLabel(importance: number): string {
    switch (importance) {
      case 5: return 'Kritisch';
      case 4: return 'Sehr wichtig';
      case 3: return 'Wichtig';
      case 2: return 'Hilfreich';
      case 1: return 'Optional';
      default: return '';
    }
  }
  
  function getImportanceClass(importance: number): string {
    switch (importance) {
      case 5: return 'badge-error';
      case 4: return 'badge-warning';
      case 3: return 'badge-primary';
      case 2: return 'badge-info';
      case 1: return 'badge-ghost';
      default: return '';
    }
  }
</script>

{#if questions.length > 0}
  <div class="mt-8">
    <div class="collapse collapse-arrow bg-base-200">
      <input type="checkbox" /> 
      <div class="collapse-title font-medium">
        Beantwortete Fragen ({questions.length})
      </div>
      <div class="collapse-content">
        <div class="space-y-4">
          {#each questions as question}
            <div class="bg-base-100 p-4 rounded-lg">
              <div class="flex justify-between items-start mb-2">
                <h5 class="font-medium">Frage {question.index + 1} beantwortet 👌</h5>
                <span class="badge badge-sm {getImportanceClass(question.importance)}">
                  {getImportanceLabel(question.importance)}
                </span>
              </div>
              <p class="text-sm mb-2">{question.question}</p>
            </div>
          {/each}
        </div>
      </div>
    </div>
  </div>
{/if}

```

# src\components\AudioRecorder.svelte

```svelte
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
```

# src\components\AudioVisualizer.svelte

```svelte
<script lang="ts">
	let { animated = true } = $props();
  </script>
  
  <div class="recording-animation color-primary flex">
	{#each Array(15) as _, i}
	  <div class="bar" class:animated={animated}></div>
	{/each}
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
	  background-color: currentColor;
	}
  
	.bar.animated {
	  animation: sound 0.5s linear infinite alternate;
	}
  
	.bar:nth-child(1), .bar:nth-child(15) {
	  animation-delay: 0s;
	}
	.bar:nth-child(4), .bar:nth-child(12) {
	  animation-delay: 0.1s;
	}
	.bar:nth-child(7) {
	  animation-delay: 0.2s;
	}
	.bar:nth-child(9) {
	  animation-delay: 0.15s;
	}
	.bar:nth-child(11) {
	  animation-delay: 0.1s;
	}
	.bar:nth-child(14) {
	  animation-delay: 0.3s;
	}
  
	@keyframes sound {
	  0% { height: 5px; }
	  100% { height: 25px; }
	}
  </style>
```

# src\components\Callout.svelte

```svelte
<script lang="ts">
	type levelT = 'h1' | 'h2' | 'h3';

	let { children, level, color }: { children: any; level: levelT; color?: String } = $props();

	// Size mapping with appropriate spacing and font sizes
	const sizeClasses = {
		h1: 'text-4xl font-bold mb-4',
		h2: 'text-2xl font-bold mb-3',
		h3: 'text-xl font-semibold mb-2',
	};

	// Combine Tailwind classes
	const combinedClasses = `${sizeClasses[level]} text-${color}`;
</script>

<svelte:element this={level} class={combinedClasses}>
	{@render children()}
</svelte:element>

```

# src\components\ChaosCheck.svelte

```svelte
<script lang="ts">
	import type { ChaosCheckResponse } from '$lib/openai-common';
	import Layout from '../routes/+layout.svelte';
	import Heading from './Heading.svelte';
	import PrivacyTooltip from './PrivacyTooltip.svelte';

	// Korrekte Prop-Deklaration für Svelte 5
	type ChaosCheckProps = {
		chaosCheck: ChaosCheckResponse | null;
		loading: boolean;
		onContinue?: () => void;
	};

	let { chaosCheck, loading, onContinue = () => {} }: ChaosCheckProps = $props();

	// Funktion zum Generieren der Farbe basierend auf Chaos-Score
	function getChaosColor(score: number): string {
		if (score < 30) return 'text-success';
		if (score < 60) return 'text-warning';
		return 'text-error';
	}

	// Funktion zum Generieren der Beschreibung basierend auf Chaos-Score
	function getChaosDescription(score: number): string {
		if (score < 30)
			return 'Fast schon unheimlich wenig Chaos. Sicher, dass du das selbst eingesprochen hast?';
		if (score < 60) return 'Man versteht, dass(!) du was sagen willst. Nur nicht was genau...';
		return 'Da fliegt ganz schön was durch die Gegend – das wird Fragen geben!';
	}

	// Emojis für die visuelle Darstellung
	function getChaosEmoji(score: number): string {
		if (score < 30) return '🧠';
		if (score < 60) return '🤔';
		return '🤯';
	}
</script>

<div class="w-full p-6">
	{#if loading}
		<div class="flex w-full flex-col items-center justify-center p-8">
			<span class="loading loading-spinner loading-lg text-primary"></span>
			<p class="mt-4 text-lg font-medium">KI analysiert deine Übergabe...</p>
		</div>
	{:else if chaosCheck}
		<div class="w-full">
			<!-- Score-Anzeige -->
			<div class="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2">
				<div class="stats shadow-md">
					<div class="stat bg-base-200">
						<div class="stat-value text-center {getChaosColor(chaosCheck.chaos_score)}">
							{chaosCheck.chaos_score}%
						</div>
						<div class="mb-3 text-center font-bold {getChaosColor(chaosCheck.chaos_score)}">
							Chaos-Score
						</div>
						<p class="text-center text-sm">
							{getChaosEmoji(chaosCheck.chaos_score)}
							{getChaosDescription(chaosCheck.chaos_score)}
						</p>
					</div>
				</div>

				<div class="stats shadow-md">
					<div class="stat bg-base-200">
						<div class="stat-value text-info text-center">{chaosCheck.clarity_score}%</div>
						<div class="text-info mb-3 text-center font-bold">Klarheits-Score</div>
						<div class="text-center text-sm">Als Podcast ganz unterhaltsam. Als Übergabe? Hm.</div>
					</div>
				</div>
			</div>

			<!-- Kategorie -->
			<div class="bg-base-300 mb-6 rounded-lg p-4 shadow">
				<Heading level="h3">🏆 Kategorie: {chaosCheck.category}</Heading>
			</div>

			<!-- Schwachstellen -->
			{#if chaosCheck.weaknesses && chaosCheck.weaknesses.length > 0}
				<div class="mb-6">
					<h4 class="mb-3 font-bold">Schwachstellen in deiner Übergabe:</h4>
					<div class="space-y-4">
						{#each chaosCheck.weaknesses as weakness}
							<div class="rounded-lg p-4 shadow-md">
								<div class="flex items-start gap-2">
									<span class="text-error mt-1">❌</span>
									<div>
										<p class="font-medium">"{weakness.quote}"</p>
										<p class="mt-1 text-sm">→ {weakness.explanation}</p>
									</div>
								</div>
							</div>
						{/each}
					</div>
				</div>
			{/if}

			<!-- Gesamtbewertung -->
			{#if chaosCheck.overall_assessment}
				<div class="bg-base-300 mb-6 rounded-lg p-4 shadow">
					<h4 class="mb-2 font-bold">Zusammenfassung:</h4>
					<p>{chaosCheck.overall_assessment}</p>
				</div>
			{/if}

			<!-- Weiter-Button -->
			<div class="mt-6 flex flex-col items-center justify-center">
				<button class="btn btn-primary btn-lg" onclick={onContinue}>Fix it</button>
				<PrivacyTooltip
				note="Wenn du auf 'Fix it' klickst, wird die bestehende Transkription und Analyse nochmal an unsere KI geschickt, um gezielt Rückfragen zu generieren.
				Alles passiert im Arbeitsspeicher – verschwindet beim Neuladen."
				/>
			</div>
		</div>
	{:else}
		<div class="flex w-full flex-col items-center justify-center p-8">
			<p class="text-error">Keine Analyse verfügbar. Bitte versuche es erneut.</p>
		</div>
	{/if}
</div>

```

# src\components\FollowUpQuestions.svelte

```svelte
<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
	import QuestionItem from './QuestionItem.svelte';
	import AnsweredQuestions from './AnsweredQuestions.svelte';
	import type { FollowUpQuestionsResponse } from '$lib/openai-common';
	import PrivacyTooltip from './PrivacyTooltip.svelte';
  
  type FollowUpQuestionsProps = {
    questions: FollowUpQuestionsResponse | null;
    loading: boolean;
    onFinished?: (answers: Record<number, { blob: Blob | null, text: string | null }>) => void;
    onTranscribeRequest?: (index: number, blob: Blob) => void;
  };
  
  let { 
    questions, 
    loading,
    onFinished = (answers: Record<number, { blob: Blob | null, text: string | null }>) => {},
    onTranscribeRequest = (index: number, blob: Blob) => {}
  }: FollowUpQuestionsProps = $props();
  
  // State für die Antworten
  let questionAnswers = $state<Record<number, { blob: Blob | null, text: string | null }>>({}); 
  let answeredQuestions = $state<Set<number>>(new Set());
  let allQuestionsAnswered = $derived(
    questions && questions.questions.every((_, idx) => !!questionAnswers[idx]?.blob)
  );
  
  // Umgang mit fertiger Aufnahme
  function handleRecordingComplete(index: number, blob: Blob, duration: number) {
    // Antwort speichern
    questionAnswers[index] = {
      blob: blob,
      text: null // Wird später durch Transkription ersetzt
    };
    
    // Explizites Update des Antworten-Sets für Reaktivität
    answeredQuestions = new Set(answeredQuestions);
    answeredQuestions.add(index);
    
    // Transkriptionsanfrage auslösen
    onTranscribeRequest(index, blob);
  }
  
  // Beenden und Übergabe erstellen
  function handleFinish() {
    onFinished(questionAnswers);
  }

  // Ohne Fixes fertigstellen
  function handleFinishWithoutFixes() {
    onFinished(questionAnswers);
  }
  
  // Sortierte und gefilterte Fragen
  function getUnansweredQuestions() {
    if (!questions) return [];
    
    return questions.questions
      .map((q, i) => ({ ...q, index: i }))
      .filter(q => !answeredQuestions.has(q.index))
      .sort((a, b) => b.importance - a.importance);
  }
  
  function getAnsweredQuestions() {
    if (!questions) return [];
    
    return questions.questions
      .map((q, i) => ({ ...q, index: i }))
      .filter(q => answeredQuestions.has(q.index))
      .sort((a, b) => b.importance - a.importance);
  }
</script>

<div class="follow-up-questions w-full">
  {#if loading}
    <div class="w-full flex flex-col items-center justify-center p-8">
      <span class="loading loading-spinner loading-lg text-primary"></span>
      <p class="mt-4 text-lg font-medium">Intelligente Rückfragen werden generiert...</p>
    </div>
  {:else if questions?.questions.length}
    <div class="w-full">     
      
      <!-- Fragen mit Beantwortungsmöglichkeit -->
      <div class="space-y-8 mb-8">
        {#each getUnansweredQuestions() as question}
          <QuestionItem
            question={question}
            onRecordingComplete={handleRecordingComplete}
          />
        {/each}

        <!-- Wenn alle Fragen beantwortet wurden -->
        {#if questions.questions.length > 0 && answeredQuestions.size === questions.questions.length}
          <div class="bg-success p-4 rounded-lg text-center text-success-content">
            <p class="font-semibold">🎉 Alle Fragen beantwortet!</p>
          </div>
        {/if}
      </div>
      
      <!-- Fertig-Buttons -->
      <div class="flex flex-col items-center">
        <button 
          class="btn btn-primary btn-lg" 
          disabled={!allQuestionsAnswered}
          onclick={handleFinish}
        >
          ✓ Fertig, Übergabe erstellen
        </button>
        <PrivacyTooltip note="Die Übergabe wird mithilfe der beantworteten Fragen erstellt. Wir speichern keine Antworten - nicht lokal, nicht extern." />


        <button 
          class="btn btn-outline" 
          onclick={handleFinishWithoutFixes}
        >
          Ohne Fixes fertigstellen
        </button>
        <PrivacyTooltip note="Die Übergabe wird nur auf Basis der Analyse erstellt - keine Rückfrage fließt mit ein. Wir speichern nichts." />
      </div>

      <!-- Beantwortete Fragen -->
      <AnsweredQuestions
        questions={getAnsweredQuestions()} 
        answers={questionAnswers}
      />
    </div>
  {:else}
    <div class="w-full flex flex-col items-center justify-center p-8">
      <p class="text-error">Keine Rückfragen verfügbar. Bitte versuche es erneut.</p>
    </div>
  {/if}
</div>
```

# src\components\HandoverDocument.svelte

```svelte
<script lang="ts">
	import type { HandoverDocumentResponse } from "$lib/openai-common";
	import Heading from "./Heading.svelte";
	import PrivacyTooltip from "./PrivacyTooltip.svelte";

  let ratingSubmitted = $state(false);

  
  // Korrekte Prop-Deklaration für Svelte 5
  type HandoverDocumentProps = {
    document: HandoverDocumentResponse | null;
    loading: boolean;
    onRate?: (rating: number) => void;
    onNext?: () => void;
  };
  
  let { 
    document, 
    loading,
    onRate = (rating: number) => {},
    onNext = () => {}
  }: HandoverDocumentProps = $props();
  
  // Status für erfolgreiche Kopier-Aktion
  let copySuccess = $state(false);
  let rating = $state(0);
  
  // Funktion zum Kopieren in die Zwischenablage
  function copyToClipboard() {
    if (!document) return;
    
    // Konvertiere das Dokument in einen formatierten Text
    const text = formatDocumentAsText(document);
    
    navigator.clipboard.writeText(text)
      .then(() => {
        copySuccess = true;
        setTimeout(() => {
          copySuccess = false;
        }, 2000);
      })
      .catch(err => {
        console.error('Fehler beim Kopieren:', err);
      });
  }
  
  // Formatiert das Dokument als Text
  function formatDocumentAsText(doc: HandoverDocumentResponse): string {
    let text = `# ${doc.title}\n\n`;
    text += `## Zusammenfassung\n${doc.summary}\n\n`;
    
    text += `## Schritte\n`;
    doc.steps.forEach((step, index) => {
      text += `${index + 1}. **${step.title}**: ${step.description}\n`;
    });
    text += '\n';
    
    text += `## Häufig gestellte Fragen\n`;
    doc.faq.forEach(item => {
      text += `**F: ${item.question}**\nA: ${item.answer}\n\n`;
    });
    
    if (doc.resources.length > 0) {
      text += `## Ressourcen\n`;
      doc.resources.forEach(res => {
        text += `- **${res.name}**${res.description ? `: ${res.description}` : ''}\n`;
      });
      text += '\n';
    }
    
    if (doc.contacts.length > 0) {
      text += `## Kontakte\n`;
      doc.contacts.forEach(contact => {
        text += `- **${contact.name}**${contact.role ? ` (${contact.role})` : ''}${contact.contact_info ? `: ${contact.contact_info}` : ''}\n`;
      });
      text += '\n';
    }
    
    if (doc.notes) {
      text += `## Hinweise\n${doc.notes}\n\n`;
    }
    
    text += '---\nErstellt mit KnowGo. Die Übergabe ist erledigt, now go enjoy!';
    
    return text;
  }
  
  // Funktion zum Herunterladen als PDF
  function downloadAsPDF() {
    // In einer realen Anwendung würde hier die PDF-Generierung stattfinden
    // Zum Beispiel mit jsPDF oder durch Serveranfrage
    alert('PDF-Download ist in dieser Demo noch nicht implementiert.');
  }
  
  // Bewertung abgeben
  function submitRating() {
    if (rating > 0) {
      onRate(rating);
      ratingSubmitted = true;
    }
  }
  
  $effect(() => {
    if (rating > 0) {
      submitRating();
    }
  });
</script>

<div class="handover-document w-full">
  {#if loading}
    <div class="w-full flex flex-col items-center justify-center p-8">
      <span class="loading loading-spinner loading-lg text-primary"></span>
      <p class="mt-4 text-lg font-medium">Deine strukturierte Übergabe wird erstellt...</p>
    </div>
  {:else if document}
    <div class="w-full">
      <div class="flex justify-between items-center mb-6">
        <div class="flex gap-2">
          <button class="btn btn-sm" onclick={downloadAsPDF}>
            📄 PDF
          </button>
          <button class="btn btn-sm btn-primary" onclick={copyToClipboard}>
            {#if copySuccess}
              ✓ Kopiert!
            {:else}
              📋 Kopieren
            {/if}
          </button>
        </div>
      </div>
      
      <div class="bg-base-200 p-6 rounded-lg mb-8">
        <h3 class="text-xl font-bold text-center mb-2">{document.title}</h3>
        <p class="text-center italic mb-4">{document.summary}</p>
        
        <div class="divider"></div>
        
        <!-- Schritte -->
        <div class="mb-6">
          <h4 class="font-bold text-lg mb-3">Schritt für Schritt Anleitung</h4>
          <ol class="list-decimal pl-5 space-y-2">
            {#each document.steps as step, index}
              <li>
                <span class="font-medium">{step.title}</span>: {step.description}
              </li>
            {/each}
          </ol>
        </div>
        
        <!-- FAQs -->
        <div class="mb-6">
          <h4 class="font-bold text-lg mb-3">Häufig gestellte Fragen</h4>
          <div class="space-y-4">
            {#each document.faq as item}
              <div class="collapse collapse-arrow bg-base-100">
                <input type="checkbox" /> 
                <div class="collapse-title font-medium">
                  {item.question}
                </div>
                <div class="collapse-content"> 
                  <p>{item.answer}</p>
                </div>
              </div>
            {/each}
          </div>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Ressourcen -->
          {#if document.resources.length > 0}
            <div>
              <h4 class="font-bold text-lg mb-3">Ressourcen</h4>
              <ul class="list-disc pl-5 space-y-1">
                {#each document.resources as resource}
                  <li>
                    <span class="font-medium">{resource.name}</span>
                    {#if resource.description}
                      <br><span class="text-sm">{resource.description}</span>
                    {/if}
                  </li>
                {/each}
              </ul>
            </div>
          {/if}
          
          <!-- Kontakte -->
          {#if document.contacts.length > 0}
            <div>
              <h4 class="font-bold text-lg mb-3">Kontakte</h4>
              <ul class="list-disc pl-5 space-y-1">
                {#each document.contacts as contact}
                  <li>
                    <span class="font-medium">{contact.name}</span>
                    {#if contact.role}<span> ({contact.role})</span>{/if}
                    {#if contact.contact_info}<br><span class="text-sm">{contact.contact_info}</span>{/if}
                  </li>
                {/each}
              </ul>
            </div>
          {/if}
        </div>
        
        <!-- Hinweise -->
        {#if document.notes}
          <div class="mt-6">
            <h4 class="font-bold text-lg mb-3">Hinweise</h4>
            <p>{document.notes}</p>
          </div>
        {/if}
        
        <!-- Footer -->
        <div class="divider mt-6"></div>
        <p class="text-center text-sm text-base-content/70">
          Erstellt mit KnowGo. Die Übergabe ist erledigt, now go enjoy!
        </p>
      </div>
      
      <!-- Bewertung -->
      <div class="flex flex-col items-center mt-8 mb-4">
        {#if !ratingSubmitted}
        <Heading level="h3">Wie hilfreich war diese Übergabe?</Heading>
          <div class="rating rating-lg">
            {#each Array(5) as _, i}
              <input 
                type="radio" 
                name="rating-5" 
                class="mask mask-star-2 bg-orange-400" 
                checked={rating === i + 1}
                onclick={() => rating = i + 1}
              />
            {/each}
          </div>
        {:else}
        <Heading level="h3">Danke für dein Feedback!</Heading>
          {/if}
      </div>
      
      <!-- Weiter Button -->
      <div class="flex flex-col items-center justify-center mt-6">
        <button class="btn btn-primary btn-lg" onclick={onNext}>
          Weiter
        </button>
        <PrivacyTooltip note="Deine Übergabe existiert nur hier im Browser.
        Du kannst sie kopieren oder drucken – sie wird nirgendwohin gespeichert.
        Wenn du das Tab schließt, ist sie weg." />
        </div>
    </div>
  {:else}
    <div class="w-full flex flex-col items-center justify-center p-8">
      <p class="text-error">Keine Übergabe verfügbar. Bitte versuche es erneut.</p>
    </div>
  {/if}
</div>
```

# src\components\Heading.svelte

```svelte
<script lang="ts">
	type levelT = 'h1' | 'h2' | 'h3';

	let {
		children,
		level,
		color,
		short
	}: { children: any; level: levelT; color?: String; short?: boolean } = $props();

	const fontClasses = {
		h1: 'text-4xl font-bold',
		h2: 'text-2xl font-bold',
		h3: 'text-xl font-semibold'
	};

	const marginClasses = {
		h1: 'mb-8',
		h2: 'mb-3',
		h3: 'mb-2'
	};

	// Combine Tailwind classes
	const combinedClasses = `${fontClasses[level]} ${!short ? marginClasses[level] : ''} text-${color} text-center`;
</script>

<svelte:element this={level} class={combinedClasses}>
	{@render children()}
</svelte:element>

```

# src\components\PrivacyTooltip.svelte

```svelte
<script lang="ts">

	let { note, open, primary }: { note: string, open?: boolean, primary?: boolean} = $props();

</script>

<div
	class="badge badge-info  badge-primary tooltip tooltip-bottom mt-3 mb-6 {open? 'tooltip-open' : ''} {primary? 'tooltip-primary badge-outline' : 'badge-soft'}"
	data-tip={note}
>
	<svg class="size-[1em] animate-pulse" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
		><g fill="currentColor" stroke-linejoin="miter" stroke-linecap="butt"
			><circle
				cx="12"
				cy="12"
				r="10"
				fill="none"
				stroke="currentColor"
				stroke-linecap="square"
				stroke-miterlimit="10"
				stroke-width="2"
			></circle><path
				d="m12,17v-5.5c0-.276-.224-.5-.5-.5h-1.5"
				fill="none"
				stroke="currentColor"
				stroke-linecap="square"
				stroke-miterlimit="10"
				stroke-width="2"
			></path><circle cx="12" cy="7.25" r="1.25" fill="currentColor" stroke-width="2"></circle></g
		></svg
	>
	Privacy by Default
</div>

```

# src\components\QuestionAudioRecorder.svelte

```svelte
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
				class="btn btn-primary btn-lg" 
				onclick={startRecording}
				disabled={permissionDenied}
			>
				<span>🎙️ Antwort aufnehmen</span>
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
```

# src\components\QuestionItem.svelte

```svelte
<script lang="ts">
	import PrivacyTooltip from './PrivacyTooltip.svelte';
	import QuestionAudioRecorder from './QuestionAudioRecorder.svelte';

	type QuestionItemProps = {
		question: {
			index: number;
			question: string;
			context?: string;
			importance: number;
		};
		onRecordingComplete: (index: number, blob: Blob) => void;
	};

	let { question, onRecordingComplete }: QuestionItemProps = $props();

	// Hilfsfunktionen für Darstellung
	function getImportanceLabel(importance: number): string {
		switch (importance) {
			case 5:
				return 'Kritisch';
			case 4:
				return 'Sehr wichtig';
			case 3:
				return 'Wichtig';
			case 2:
				return 'Hilfreich';
			case 1:
				return 'Optional';
			default:
				return '';
		}
	}

	function getImportanceClass(importance: number): string {
		switch (importance) {
			case 5:
				return 'badge-error';
			case 4:
				return 'badge-warning';
			case 3:
				return 'badge-primary';
			case 2:
				return 'badge-info';
			case 1:
				return 'badge-ghost';
			default:
				return '';
		}
	}
</script>

<div class="bg-base-200 rounded-lg p-6">
	<div class="mb-4 flex items-start justify-between">
		<h4 class="text-lg font-bold">Frage {question.index + 1}:</h4>
		<span class="badge {getImportanceClass(question.importance)}">
			{getImportanceLabel(question.importance)}
		</span>
	</div>

	<p class="mb-4">{question.question}</p>

	{#if question.context}
		<div class="bg-base-300 mb-4 rounded p-3 text-sm">
			<span class="font-medium">Kontext:</span>
			{question.context}
		</div>
	{/if}

	<!-- Aufnahme-Komponente -->
	<div class="mt-4">
		<QuestionAudioRecorder
			questionIndex={question.index}
			onRecordingComplete={onRecordingComplete}
		/>
	</div>
    
    <PrivacyTooltip
      note="Deine Aufnahme geht einmalig an OpenAI zur Transkription.
Der Text fließt ins Übergabedokument ein. Die Audiospur wird nicht gespeichert.
Hinweis: OpenAI kann Audiodaten zu Trainingszwecken speichern."
    />
</div>
```

# src\components\ThemeToggler.svelte

```svelte
<label class="swap swap-rotate">
  <!-- this hidden checkbox controls the state -->
  <input type="checkbox" class="theme-controller" value="abyss" />

  <!-- sun icon -->
  <svg
    class="swap-off h-10 w-10 fill-current"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24">
    <path
      d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
  </svg>

  <!-- moon icon -->
  <svg
    class="swap-on h-10 w-10 fill-current"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24">
    <path
      d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
  </svg>
</label>
```

# src\hooks.server.js

```js
import { SvelteKitAuth } from "@auth/sveltekit"
import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from "$env/static/private"
import Google from "@auth/core/providers/google";

// export const handle = SvelteKitAuth({ providers: [Google({ clientId: GOOGLE_CLIENT_ID, clientSecret: GOOGLE_CLIENT_SECRET })] });

```

# src\lib\assets\urlaub.gif

This is a binary file of the type: Image

# src\lib\audio-recorder-service.svelte.ts

```ts
// src/lib/audio-recorder-service.svelte.ts
// Wiederverwendbarer Dienst für Audio-Aufnahmen in Svelte 5
// Stellt reaktive Logik zur Audio-Aufnahme bereit

// Typ-Definitionen
export type RecordingState = {
  isRecording: boolean;
  recordingTime: number;
  currentRecordingId: string | number | null;
  hasRecordingPermission: boolean;
};

export type RecordingResult = {
  blob: Blob;
  duration: number;
};

// Fehlertyp für Aufnahmefehler
export class RecordingError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'RecordingError';
  }
}

// Audio-Recorder-Dienst mit Runes
export function createAudioRecorderService() {
  // Zustandsvariablen
  let isRecording = $state(false);
  let recordingTime = $state(0);
  let currentRecordingId = $state<string | number | null>(null);
  let hasRecordingPermission = $state(true);
  
  // Private Variablen (nicht reaktiv)
  let mediaRecorder: MediaRecorder | null = null;
  let mediaStream: MediaStream | null = null;
  let audioChunks: Blob[] = [];
  let timerInterval: number | null = null;
  
  // Timer-Funktionen
  function startTimer() {
    recordingTime = 0;
    if (timerInterval) clearInterval(timerInterval);
    
    timerInterval = setInterval(() => {
      recordingTime++;
    }, 1000) as unknown as number;
  }
  
  function stopTimer() {
    if (timerInterval) {
      clearInterval(timerInterval);
      timerInterval = null;
    }
  }
  
  // Format-Hilfsfunktion
  function formatTime(seconds: number): string {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }
  
  // Hauptfunktionen
  async function startRecording(id: string | number): Promise<void> {
    if (isRecording) return;
    
    try {
      // Bestehenden Stream beenden
      if (mediaStream) {
        mediaStream.getTracks().forEach(track => track.stop());
      }
      
      // Neuen Stream anfordern
      mediaStream = await navigator.mediaDevices.getUserMedia({ audio: true });
      hasRecordingPermission = true;
      
      // Aufnahme vorbereiten
      audioChunks = [];
      mediaRecorder = new MediaRecorder(mediaStream);
      
      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunks.push(event.data);
        }
      };
      
      // Aufnahme starten
      mediaRecorder.start();
      isRecording = true;
      currentRecordingId = id;
      startTimer();
    } catch (error) {
      console.error('Fehler beim Starten der Aufnahme:', error);
      if ((error as Error).name === 'NotAllowedError') {
        hasRecordingPermission = false;
      }
      isRecording = false;
      currentRecordingId = null;
      throw new RecordingError((error as Error).message);
    }
  }
  
  function stopRecording(): Promise<RecordingResult> {
    return new Promise((resolve, reject) => {
      if (!isRecording || !mediaRecorder) {
        reject(new RecordingError('Keine aktive Aufnahme'));
        return;
      }
      
      const recordingId = currentRecordingId;
      const duration = recordingTime;
      
      // Event-Handler für Aufnahme-Ende
      mediaRecorder.onstop = () => {
        const blob = new Blob(audioChunks, { type: 'audio/webm' });
        resolve({ blob, duration });
      };
      
      // Aufnahme beenden
      isRecording = false;
      stopTimer();
      
      try {
        if (mediaRecorder.state === 'recording') {
          mediaRecorder.stop();
        }
        
        // Stream beenden
        if (mediaStream) {
          mediaStream.getTracks().forEach(track => track.stop());
        }
      } catch (error) {
        reject(new RecordingError((error as Error).message));
      }
    });
  }
  
  // Cleanup-Funktion
  function cleanup() {
    if (isRecording) {
      try {
        if (mediaRecorder && mediaRecorder.state === 'recording') {
          mediaRecorder.stop();
        }
        
        if (mediaStream) {
          mediaStream.getTracks().forEach(track => track.stop());
        }
      } catch (error) {
        console.error('Fehler beim Cleanup:', error);
      }
    }
    
    if (timerInterval) {
      clearInterval(timerInterval);
    }
    
    isRecording = false;
    currentRecordingId = null;
  }
  
  // Öffentliche API
  return {
    // Reaktive Zustände
    get state(): RecordingState {
      return {
        isRecording,
        recordingTime,
        currentRecordingId,
        hasRecordingPermission
      };
    },
    
    // Methoden
    startRecording,
    stopRecording,
    formatTime,
    cleanup
  };
}

// Export eines Typs für die Rückgabe des Services
export type AudioRecorderService = ReturnType<typeof createAudioRecorderService>;
```

# src\lib\index.ts

```ts
// place files you want to import through the `$lib` alias in this folder.

```

# src\lib\knowgo-state.svelte.ts

```ts
import type { ChaosCheckResponse, FollowUpQuestionsResponse, HandoverDocumentResponse } from '../routes/api/openai/+server';

// Zentraler State für den gesamten Übergabe-Prozess
export const knowgoState = $state({
  // Basis-Eingaben
  taskDescription: '',
  
  // Audio und Transkription
  recordingBlob: null as Blob | null,
  transcript: '',
  
  // Analyse-Schritte
  chaosCheck: null as ChaosCheckResponse | null,
  questions: null as FollowUpQuestionsResponse | null,
  
  // Antworten auf Rückfragen
  answers: {} as Record<number, { blob: Blob | null, text: string | null }>,
  
  // Finales Dokument
  document: null as HandoverDocumentResponse | null,
  
  // Status-Flags
  currentStep: 'drop' as 'drop' | 'record' | 'chaos' | 'questions' | 'result',
  loading: false,
  error: ''
});

$: console.log("currentStep:", knowgoState.currentStep)
$: console.log("Task Description:", knowgoState.taskDescription)
$: console.log("recordingBlob:", knowgoState.recordingBlob)
$: console.log("transcript:", knowgoState.transcript)
$: console.log("chaosCheck:", knowgoState.chaosCheck)
$: console.log("answers:", knowgoState.answers)
$: console.log("document:", knowgoState.document)

// Hilfsfunktionen zum Aktualisieren des States

export function updateTaskDescription(task: string) {
  knowgoState.taskDescription = task;
  knowgoState.currentStep = 'record';
}

export function updateRecording(blob: Blob) {
  knowgoState.recordingBlob = blob;
}

export function updateTranscript(transcript: string) {
  knowgoState.transcript = transcript;
  knowgoState.currentStep = 'record';
}

export function updateChaosCheck(chaosCheck: ChaosCheckResponse) {
  knowgoState.chaosCheck = chaosCheck;
  knowgoState.currentStep = 'chaos';
}

export function updateQuestions(questions: FollowUpQuestionsResponse) {
  knowgoState.questions = questions;
  knowgoState.currentStep = 'questions';
}

export function updateAnswer(index: number, blob: Blob | null, text: string | null = null) {
  knowgoState.answers[index] = { blob, text };
}

export function updateAnswerText(index: number, text: string) {
  if (knowgoState.answers[index]) {
    knowgoState.answers[index].text = text;
  }
}

export function updateDocument(document: HandoverDocumentResponse) {
  knowgoState.document = document;
  knowgoState.currentStep = 'result';
}

export function setLoading(isLoading: boolean) {
  knowgoState.loading = isLoading;
}

export function setError(errorMessage: string) {
  knowgoState.error = errorMessage;
}

export function clearError() {
  knowgoState.error = '';
}

export function resetState() {
  knowgoState.taskDescription = '';
  knowgoState.recordingBlob = null;
  knowgoState.transcript = '';
  knowgoState.chaosCheck = null;
  knowgoState.questions = null;
  knowgoState.answers = {};
  knowgoState.document = null;
  knowgoState.currentStep = 'drop';
  knowgoState.loading = false;
  knowgoState.error = '';
}

// Navigation zum nächsten oder vorherigen Schritt
export function goToNextStep() {
  const steps: Array<'drop' | 'record' | 'chaos' | 'questions' | 'result'> = [
    'drop', 'record', 'chaos', 'questions', 'result'
  ];
  
  const currentIndex = steps.indexOf(knowgoState.currentStep);
  if (currentIndex < steps.length - 1) {
    knowgoState.currentStep = steps[currentIndex + 1];
  }
}

export function goToPreviousStep() {
  const steps: Array<'drop' | 'record' | 'chaos' | 'questions' | 'result'> = [
    'drop', 'record', 'chaos', 'questions', 'result'
  ];
  
  const currentIndex = steps.indexOf(knowgoState.currentStep);
  if (currentIndex > 0) {
    knowgoState.currentStep = steps[currentIndex - 1];
  }
}
```

# src\lib\openai-client.ts

```ts
// Client-seitige Funktionen für die OpenAI-API
import type { ChaosCheckResponse, FollowUpQuestionsResponse, HandoverDocumentResponse } from './openai-common';

/**
 * Transkribiert Audio-Dateien mit der OpenAI Transcriptions API
 * @param audioBlob - Audio-Blob aus der Aufnahme
 * @param language - Die Sprache des Audios (ISO-639-1 Format)
 * @param taskDescription - Beschreibung der Aufgabe für Kontext
 * @returns Eine Promise mit dem transkribierten Text
 */
export async function transcribeAudio(
  audioBlob: Blob,
  language: string = 'de',
  taskDescription: string = ''
): Promise<string> {
  const formData = new FormData();
  formData.append('audio', audioBlob);
  formData.append('language', language);
  formData.append('taskDescription', taskDescription);

  const response = await fetch('/api/openai', {
    method: 'POST',
    body: formData
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Transkriptionsfehler');
  }

  const data = await response.json();
  return data.text;
}

/**
 * Analysiert die Qualität einer Aufgabenübergabe
 * @param taskDescription - Beschreibung der Aufgabe
 * @param audioTranscript - Transkript der Audioaufnahme
 * @returns Analyse der Qualität der Aufgabenübergabe
 */
export async function analyzeChaos(
  taskDescription: string,
  audioTranscript: string
): Promise<ChaosCheckResponse> {
  const response = await fetch('/api/openai/analyze-chaos', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ taskDescription, audioTranscript })
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Analysefehler');
  }

  const data = await response.json();
  return data.result;
}

/**
 * Generiert intelligente Rückfragen basierend auf der Aufgabenbeschreibung und der Chaos-Analyse
 * @param taskDescription - Beschreibung der Aufgabe
 * @param audioTranscript - Transkript der Audioaufnahme
 * @param chaosCheck - Ergebnis der Chaos-Analyse
 * @returns Rückfragen zur Verbesserung der Aufgabenübergabe
 */
export async function generateFollowUpQuestions(
  taskDescription: string,
  audioTranscript: string,
  chaosCheck: ChaosCheckResponse
): Promise<FollowUpQuestionsResponse> {
  const response = await fetch('/api/openai/follow-up-questions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ taskDescription, audioTranscript, chaosCheck })
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Fehler beim Generieren der Rückfragen');
  }

  const data = await response.json();
  return data.result;
}

/**
 * Erstellt ein strukturiertes Übergabedokument
 * @param taskDescription - Beschreibung der Aufgabe
 * @param audioTranscript - Transkript der Audioaufnahme
 * @param followUpQuestions - Generierte Rückfragen
 * @param questionAnswers - Antworten auf die Rückfragen
 * @returns Strukturiertes Übergabedokument
 */
export async function createHandoverDocument(
  taskDescription: string,
  audioTranscript: string,
  followUpQuestions: FollowUpQuestionsResponse,
  questionAnswers: Record<string, string>
): Promise<HandoverDocumentResponse> {
  const response = await fetch('/api/openai/create-handover', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ taskDescription, audioTranscript, followUpQuestions, questionAnswers })
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Fehler beim Erstellen des Übergabedokuments');
  }

  const data = await response.json();
  return data.result;
}

/**
 * Hilfsfunktion für benutzerfreundliche Fehlermeldungen
 * @param error - Der aufgetretene Fehler
 * @returns Eine benutzerfreundliche Fehlermeldung
 */
export function getUserFriendlyErrorMessage(error: unknown): string {
  return error instanceof Error 
    ? `Fehler: ${error.message}` 
    : 'Ein unbekannter Fehler ist aufgetreten';
}
```

# src\lib\openai-common.ts

```ts
import OpenAI from "openai";
import { z } from "zod";
import { zodResponseFormat } from "openai/helpers/zod";
import { CHAOS_CHECK_PROMPT, FOLLOW_UP_QUESTIONS_PROMPT, HANDOVER_DOCUMENT_PROMPT } from "./prompts";
import { OPENAI_API_KEY } from '$env/static/private';

// Initialisiere den OpenAI Client
export const openai = new OpenAI({
  apiKey: OPENAI_API_KEY,
});

// Schema für den Chaos-Check
export const ChaosCheckSchema = z.object({
  chaos_score: z.number(),
  clarity_score: z.number(),
  category: z.string(),
  weaknesses: z.array(z.object({
    quote: z.string(),
    explanation: z.string()
  })),
  overall_assessment: z.string()
});
export type ChaosCheckResponse = z.infer<typeof ChaosCheckSchema>;

// Schema für KI-generierte Rückfragen
export const FollowUpQuestionsSchema = z.object({
  questions: z.array(z.object({
    question: z.string(),
    context: z.string(),
    importance: z.number()
  })).transform(questions => {
    // Ensure at least 3 and at most 5 questions
    if (questions.length < 3 || questions.length > 5) {
      throw new Error('Questions must be between 3 and 5');
    }
    
    // Additional validation for importance if needed
    questions.forEach(q => {
      if (q.importance < 1 || q.importance > 5) {
        throw new Error('Importance must be between 1 and 5');
      }
    });
    
    return questions;
  })
});
export type FollowUpQuestionsResponse = z.infer<typeof FollowUpQuestionsSchema>;

// Schema für die finale Übergabe
export const HandoverDocumentSchema = z.object({
  title: z.string(),
  summary: z.string(),
  steps: z.array(z.object({
    title: z.string(),
    description: z.string()
  })),
  faq: z.array(z.object({
    question: z.string(),
    answer: z.string()
  })),
  resources: z.array(z.object({
    name: z.string(),
    description: z.string().optional()
  })),
  contacts: z.array(z.object({
    name: z.string(),
    role: z.string().optional(),
    contact_info: z.string().optional()
  })),
  notes: z.string().optional()
});
export type HandoverDocumentResponse = z.infer<typeof HandoverDocumentSchema>;

/**
 * Analysiert die Qualität einer Aufgabenübergabe
 * @param taskDescription - Beschreibung der Aufgabe
 * @param audioTranscript - Transkript der Audioaufnahme
 * @returns Analyse der Qualität der Aufgabenübergabe
 */
export async function analyzeChaos(
  taskDescription: string, 
  audioTranscript: string
): Promise<ChaosCheckResponse | null> {
  const completion = await openai.beta.chat.completions.parse({
    model: "gpt-4o-mini",
    messages: [
      { 
        role: "system", 
        content: CHAOS_CHECK_PROMPT
      },
      { 
        role: "user", 
        content: `Aufgabe: ${taskDescription}\n\nÜbergabebeschreibung (Transkript):\n${audioTranscript}` 
      },
    ],
    response_format: zodResponseFormat(ChaosCheckSchema, "chaos_check"),
  });
  return completion.choices[0].message.parsed;
}

/**
 * Generiert intelligente Rückfragen basierend auf der Aufgabenbeschreibung und der Chaos-Analyse
 * @param taskDescription - Beschreibung der Aufgabe
 * @param audioTranscript - Transkript der Audioaufnahme
 * @param chaosCheck - Ergebnis der Chaos-Analyse
 * @returns Rückfragen zur Verbesserung der Aufgabenübergabe
 */
export async function generateFollowUpQuestions(
  taskDescription: string, 
  audioTranscript: string, 
  chaosCheck: ChaosCheckResponse
): Promise<FollowUpQuestionsResponse | null> {
  const completion = await openai.beta.chat.completions.parse({
    model: "gpt-4o-mini",
    messages: [
      { 
        role: "system", 
        content: FOLLOW_UP_QUESTIONS_PROMPT 
      },
      { 
        role: "user", 
        content: `Aufgabe: ${taskDescription}\n\nÜbergabebeschreibung (Transkript):\n${audioTranscript}\n\nErkannte Schwächen:\n${JSON.stringify(chaosCheck.weaknesses)}` 
      },
    ],
    response_format: zodResponseFormat(FollowUpQuestionsSchema, "follow_up_questions"),
  });
  return completion.choices[0].message.parsed;
}

/**
 * Erstellt ein strukturiertes Übergabedokument
 * @param taskDescription - Beschreibung der Aufgabe
 * @param audioTranscript - Transkript der Audioaufnahme
 * @param followUpQuestions - Generierte Rückfragen
 * @param questionAnswers - Antworten auf die Rückfragen
 * @returns Strukturiertes Übergabedokument
 */
export async function createHandoverDocument(
  taskDescription: string,
  audioTranscript: string,
  followUpQuestions: FollowUpQuestionsResponse,
  questionAnswers: Record<string, string>
): Promise<HandoverDocumentResponse | null> {
  // Formatiere die Fragen und Antworten für den Prompt
  const qaFormatted = followUpQuestions.questions.map((q, i) => {
    const index = i.toString();
    return `Frage: ${q.question}\nAntwort: ${questionAnswers[index] || "Keine Antwort bereitgestellt"}`;
  }).join("\n\n");
  const completion = await openai.beta.chat.completions.parse({
    model: "gpt-4o-mini",
    messages: [
      { 
        role: "system", 
        content: HANDOVER_DOCUMENT_PROMPT,
      },
      { 
        role: "user", 
        content: `Aufgabe: ${taskDescription}\n\nUrsprüngliche Beschreibung (Transkript):\n${audioTranscript}\n\nBeantwortete Fragen:\n${qaFormatted}` 
      },
    ],
    response_format: zodResponseFormat(HandoverDocumentSchema, "handover_document"),
  });
  return completion.choices[0].message.parsed;
}

/**
 * Hilfsfunktion für benutzerfreundliche Fehlermeldungen
 * @param error - Der aufgetretene Fehler
 * @returns Eine benutzerfreundliche Fehlermeldung
 */
export function getUserFriendlyErrorMessage(error: unknown): string {
  return error instanceof Error 
    ? `Fehler: ${error.message}` 
    : 'Ein unbekannter Fehler ist aufgetreten';
}

```

# src\lib\prompts.ts

```ts
export const CHAOS_CHECK_PROMPT = `
Du bist ein Experte für Wissenstransfer und Übergaben in Unternehmen. Deine Aufgabe ist es, die Qualität einer Aufgabenübergabe zu analysieren und konstruktives Feedback zu geben.
Analysiere die folgende Übergabebeschreibung und bewerte sie nach Klarheit, Struktur und Vollständigkeit.
Identifiziere typische Probleme wie:
- Vage Beschreibungen
- Unvollständige Anweisungen
- Fehlende konkrete Schritte
- Unklare Verantwortlichkeiten
- Fehlende Ressourcen- oder Kontaktangaben
- Versteckte Komplexität
- Abhängigkeit von implizitem Wissen
Formuliere dein Feedback humorvoll, aber konstruktiv, mit konkreten Beispielen. Du bist gnadenlos und entlarvst jedes überflüssige Blabla mit bissigem Humor. 
Ordne die Arbeitsübergabe in eine der folgenden Kategorien ein:
- "Meeting-Monolog" (Briefing vage und unkonkret), 
- "Notizbuch-Nonsens" (viel Hintergrundwissen), 
- "Flurfunk-Level" (triviale Infos), 
- "Whatsapp-Weiterleitung" (fetzenweise verständlich)
- "Drei Tabs zu viel" (überfordernd viele Infos).
`;

export const FOLLOW_UP_QUESTIONS_PROMPT = `
Du bist ein erfahrener Projektmanager mit Expertise im Erkennen von Informationslücken bei Aufgabenübergaben.
Formuliere 3-5 kritische Rückfragen, die ein Mitarbeiter stellen müsste, um die Aufgabe erfolgreich zu übernehmen.
Die Fragen sollen:
1. Wesentliche Informationslücken schließen
2. Implizites Wissen explizit machen
3. Auf konkrete Details abzielen
4. Die erkannten Schwächen der Übergabe adressieren
5. Nach Ressourcen, Zugriffen, Kontakten oder Dependencies fragen
`;

export const HANDOVER_DOCUMENT_PROMPT = `
Du bist ein Spezialist für effiziente Wissensweitergabe und klare Dokumentation.
Erstelle eine strukturierte Übergabedokumentation, die es einem Kollegen ermöglicht, eine Aufgabe ohne weitere Rückfragen zu übernehmen.
Das Dokument soll enthalten:
1. Eine prägnante Zusammenfassung der Aufgabe
2. Konkrete, nummerierte Schritte
3. Wichtige Fragen und Antworten
4. Relevante Ressourcen und Kontakte
5. Optionale Zusatzhinweise
`;

```

# src\lib\routes.ts

```ts
export const routes = {
    home: '/',
    checkin: '/checkin',
    ai: '/ai',
    result: '/result',
    calendar: '/calendar'
  };
  
  export type RouteKey = keyof typeof routes;
  
  export function getRoutePath(key: RouteKey): string {
    return routes[key];
  }
```

# src\lib\supabase.ts

```ts
import { createClient } from '@supabase/supabase-js';
import { SUPABASE_ANON_KEY } from '$env/static/private';

const supabaseUrl = "https://uqpnpkjnzqcvlraohkod.supabase.co";

export const supabase = createClient(supabaseUrl, SUPABASE_ANON_KEY);
```

# src\lib\types.ts

```ts

```

# src\lib\utils\audioUtils.ts

```ts
export function formatTime(seconds: number): string {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

export async function checkMicrophonePermission(): Promise<boolean> {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        stream.getTracks().forEach(track => track.stop());
        return true;
    } catch (error) {
        console.error('Mikrofon-Zugriff verweigert oder Fehler:', error);
        return false;
    }
}
```

# src\routes\+layout.server.js

```js
// export const load = async (event) => {
//     return {
//       session: await event.locals.getSession(),
//     }
//   }
```

# src\routes\+layout.svelte

```svelte
<script lang="ts">
	import '../app.css';
	import ThemeToggler from '../components/ThemeToggler.svelte';
	let { children } = $props();

	import { goto } from '$app/navigation';

	function gotostart() {
		goto('/');
	}
</script>

<div class="flex min-h-screen flex-col">
	<header class="bg-base-200 text-base-content flex items-center justify-between drop-shadow-md p-4 md:px-8 lg:px-16 xl:px-32">
		<div class="container">
			<button onclick={gotostart} class="swap text-2xl font-bold">KnowGo</button>
		</div>
		<div>
			<ThemeToggler />
		</div>
	</header>

	<main class="container m-auto flex-grow p-4 md:p-6 lg:p-8">
		{@render children()}
	</main>
</div>

<div class="footer flex-col sm:flex-row lg:grid lg:grid-cols-3 lg:gap-1 bg-base-200 text-base-content p-10 pt-20 md:px-60 lg:px-90">
	<nav>
			  <h6 class="footer-title">Infos</h6>
			  <a class="link link-hover">Über KnowGo</a>
			  <a class="link link-hover">Über Mich</a>
			</nav>
			<nav>
				<h6 class="footer-title">KnowGo</h6>
				<a class="link link-hover">Register</a>
				<a class="link link-hover">Login</a>
			</nav>
			<nav>
			  <h6 class="footer-title">Interviews</h6>
			  <a class="link link-hover">Benefits</a>
			  <a class="link link-hover">Kalender</a>
			</nav>
				<div class="text-xs mt-10 col-span-2"><p><strong>Mit Hirn & Herz gebaut.</strong> Für die Prise Versuch-und-Irrtum.</p></div>
				<p class="text-xs mt-10 font-bold">© {new Date().getFullYear()} Jessica Krecker</p>
		</div>	
```

# src\routes\+page.svelte

```svelte
<script lang="ts">
	import { goto } from '$app/navigation';
	import Heading from '../components/Heading.svelte';
	import meme from "$lib/assets/urlaub.gif"

	function navigateForward() {
		goto('/knowgo');
	}
</script>
<div class="relative w-full max-w-full sm:max-w-xl m-auto">
	<img src={meme} alt="Mann mit Laptop im Wasser" class="w-full" />
	<div class="absolute top-4 left-0 w-full text-center">
		<p class="text-white text-3xl font-bold uppercase drop-shadow-lg sm:text-5xl">
		Wenn du denkst, du bist im Urlaub:
	  </p>
	</div>
  </div>

<div class="max-w-xl m-auto flex flex-col items-center justify-center py-12 text-center">
	

	
		<Heading level="h1" color="primary" short>KnowGo</Heading>
		<Heading level="h2">Übergabe in 2 Minuten</Heading>
		<Heading level="h3">Abschalten. Nicht nur das Hintergrundbild wechseln.</Heading>


	<button class="mt-8 btn btn-primary btn-xl" onclick={navigateForward}>Rette meinen Urlaub!</button
	>
</div>

```

# src\routes\about\+page.svelte

```svelte
<script lang="ts">
	import { goto } from '$app/navigation';
	import Heading from '../../components/Heading.svelte';

	function navigateForward() {
		goto('/checkin/benefits');
	}

	function gotoExit() {
		goto('/exit');
	}
</script>

<div class="m-auto flex max-w-xl flex-col items-center justify-center py-12">
	<div class="grid grid-flow-col gap-4">
		<div>
			<Heading level="h1">Was ist das hier?</Heading>
			<div class="prose mb-12">
				<p>
					🧠 Ich gehe der Frage nach, wie <span class="font-bold">Wissensweitergabe</span> schnell,
					klar und vollständig ablaufen kann.
				</p>
				<p>
					⚙️ Ich will meine Ideen mit <span class="font-bold">echten Praxisbeispielen </span> auf
					die Probe stellen und verfeinern.
				</p>
				<p>
					🧩 Ich will hören, wo die <span class="font-bold">Probleme im Bereich Wissenstransfer</span> deiner Erfahrung nach wirklich
					liegen.
				</p>
			</div>
		</div>
		<div>
			<Heading level="h1">Wer steckt dahinter?</Heading>
			<div class="prose mb-12">
				<p>
					Jessica Krecker
				</p>
				<p>
					Webentwicklerin & Instructional Designerin
				</p>
			</div>
		</div>
	</div>

	<button class="btn btn-primary btn-lg mb-6" onclick={navigateForward}
		>Was für dich drin ist?</button
	>
	<button class="btn btn-outline btn-secondary btn-m" onclick={gotoExit}
		>Nicht deine Themen?</button
	>
</div>

```

# src\routes\api\email\+server.ts

```ts
import { json } from '@sveltejs/kit';
import { supabase } from '$lib/supabase';

export async function POST({ request }) {
	try {
		const body = await request.json();
		const { email } = body;

		if (!email || typeof email !== 'string') {
			return json({ success: false, error: 'Ungültige E-Mail-Adresse' }, { status: 400 });
		}

		// Hier wird die E-Mail in die Tabelle "email_submissions" geschrieben.
		const { data, error } = await supabase
			.from('email_submissions')
			.insert([{ email }]);

		if (error) {
			return json({ success: false, error: error.message || 'Unbekannter Fehler' }, { status: 500 });
		}

		return json({ success: true, data });
	} catch (err) {
		console.error('Fehler beim Speichern der E-Mail:', err);
		return json({ success: false, error: 'Serverfehler' }, { status: 500 });
	}
}

```

# src\routes\api\openai\+server.ts

```ts
import { json } from '@sveltejs/kit';
import { openai } from '../../../lib/openai-common';
import { knowgoState } from "../../../lib/knowgo-state.svelte";

/**
 * Haupt-Endpunkt für die Transkription von Audiodateien
 */
export async function POST({ request }) {
  try {
    const formData = await request.formData();
    const audioBlob = formData.get('audio') as File;
    const language = formData.get('language') as string || 'de';
    const taskDescription = formData.get('taskDescription') as string || '';
    
    if (!audioBlob) {
      return json({ error: 'Keine Audiodatei erhalten' }, { status: 400 });
    }
    
    const transcription = await openai.audio.transcriptions.create({
      file: audioBlob,
      model: 'gpt-4o-mini-transcribe',
      language,
      prompt: `Hallo, darum geht es in diesem Transkript: ${taskDescription}. `
    });
    
    return json({ text: transcription.text });
  } catch (error) {
    console.error('Fehler bei der Audio-Transkription:', error);
    return json({ 
      error: error instanceof Error ? error.message : 'Ein unbekannter Fehler ist aufgetreten' 
    }, { status: 500 });
  }
}
```

# src\routes\api\openai\analyze-chaos\+server.ts

```ts
import { json } from '@sveltejs/kit';
import { analyzeChaos } from '../../../../lib/openai-common';

export async function POST({ request }) {
  try {
    const body = await request.json();
    const { taskDescription, audioTranscript } = body;
    
    if (!taskDescription || !audioTranscript) {
      return json({ error: 'Aufgabenbeschreibung und Transkript sind erforderlich' }, { status: 400 });
    }
    
    const chaosCheck = await analyzeChaos(taskDescription, audioTranscript);
    return json({ result: chaosCheck });
  } catch (error) {
    console.error('Fehler bei der Chaos-Analyse:', error);
    return json({ 
      error: error instanceof Error ? error.message : 'Ein unbekannter Fehler ist aufgetreten' 
    }, { status: 500 });
  }
}
```

# src\routes\api\openai\create-handover\+server.ts

```ts
import { json } from '@sveltejs/kit';
import { createHandoverDocument } from '../../../../lib/openai-common';

export async function POST({ request }) {
  try {
    const body = await request.json();
    const { taskDescription, audioTranscript, followUpQuestions, questionAnswers } = body;
    
    if (!taskDescription || !audioTranscript || !followUpQuestions || !questionAnswers) {
      return json({ error: 'Alle erforderlichen Felder müssen angegeben werden' }, { status: 400 });
    }
    
    const document = await createHandoverDocument(taskDescription, audioTranscript, followUpQuestions, questionAnswers);
    return json({ result: document });
  } catch (error) {
    console.error('Fehler beim Erstellen des Übergabedokuments:', error);
    return json({ 
      error: error instanceof Error ? error.message : 'Ein unbekannter Fehler ist aufgetreten' 
    }, { status: 500 });
  }
}
```

# src\routes\api\openai\follow-up-questions\+server.ts

```ts
import { json } from '@sveltejs/kit';
import { generateFollowUpQuestions } from '../../../../lib/openai-common';

export async function POST({ request }) {
  try {
    const body = await request.json();
    const { taskDescription, audioTranscript, chaosCheck } = body;
    
    if (!taskDescription || !audioTranscript || !chaosCheck) {
      return json({ error: 'Alle erforderlichen Felder müssen angegeben werden' }, { status: 400 });
    }
    
    const questions = await generateFollowUpQuestions(taskDescription, audioTranscript, chaosCheck);
    return json({ result: questions });
  } catch (error) {
    console.error('Fehler bei den Rückfragen:', error);
    return json({ 
      error: error instanceof Error ? error.message : 'Ein unbekannter Fehler ist aufgetreten' 
    }, { status: 500 });
  }
}
```

# src\routes\api\rating\+server.ts

```ts
import { json } from '@sveltejs/kit';
import { supabase } from '$lib/supabase';

export async function POST({ request }) {
	try {
		const body = await request.json();
		const { rating } = body;

		if (typeof rating !== 'number' || rating < 0 || rating > 10) {
			return json({ success: false, error: 'Ungültige Bewertung' }, { status: 400 });
		}

		const { error } = await supabase
			.from('rating_submissions')
			.insert([{ rating }]);

		if (error) {
			return json({ success: false, error: error.message }, { status: 500 });
		}

		return json({ success: true });
	} catch (err) {
		console.error('Fehler beim Speichern des Ratings:', err);
		return json({ success: false, error: 'Serverfehler' }, { status: 500 });
	}
}

```

# src\routes\api\survey\+server.ts

```ts
import { json } from '@sveltejs/kit';
import { supabase } from '$lib/supabase';

export async function POST({ request }) {
    try {
        const body = await request.json();

        const { data, error } = await supabase
            .from('survey_responses')
            .insert([body]);

        if (error) {
            console.error('Supabase INSERT Error:', JSON.stringify(error, null, 2));
            return json({ success: false, error: error.message || 'Unbekannter Fehler' }, { status: 500 });
        }

        console.log('Supabase INSERT Success:', data);
        return json({ success: true, data });

    } catch (err) {
        console.error('Unerwarteter Fehler:', err);
        return json({ success: false, error: 'Server-Absturz', details: String(err) }, { status: 500 });
    }
}

```

# src\routes\checkin\+page.svelte

```svelte
<script lang="ts">
  import PrivacyTooltip from '../../components/PrivacyTooltip.svelte';

	import { goto } from '$app/navigation';
	import Heading from '../../components/Heading.svelte';

	const surveyOptions = [
		{
			emoji: '🤹',
			text: 'Du bist selbst bis obenhin voll... aber jemand braucht dringend deine Hilfe.'
		},
		{
			emoji: '🔄',
			text: 'Du erklärst eine Aufgabe... aber am nächsten Tag kommen trotzdem 5 Rückfragen.'
		},
		{
			emoji: '⏱️',
			text: 'Du bist überlastet... aber Abgeben dauert länger als die Aufgabe selbst zu machen.'
		},
		{
			emoji: '🤐',
			text: 'Du kannst die Aufgabe sehr gut umsetzen... aber sie nicht gut erklären.'
		},
		{
			emoji: '💡',
			text: 'Du hast alles ausführlich erklärt... und später fällt dir ein, was du wichtiges vergessen hast.'
		},
		{
			emoji: '🧯',
			text: 'Du kommst aus dem Urlaub zurück... und musst erstmal aufräumen, was schiefgelaufen ist'
		}
	];

	// State

	// State für die Button-Zustände
	let buttonStates = $state(Array(surveyOptions.length).fill(0));

	// Kontrollvariable, ob etwas ausgewählt wurde
	let hasSelection = $state(false);

	// Rotiere durch Zustände: 0→1→2→3→0
	function toggleOption(index: number) {
		buttonStates[index] = (buttonStates[index] + 1) % 4;
		hasSelection = buttonStates.some((state) => state > 0); // Check, ob mind. 1 ausgewählt wurde
	}

	// Dynamische Button-Klassen
	function getButtonClass(index: number) {
		return [
			'btn h-fit',
			buttonStates[index] === 0
				? 'btn-xs btn-dash py-5'
				: buttonStates[index] === 1
					? 'btn-sm btn-outline btn-error py-6'
					: buttonStates[index] === 2
						? 'btn-lg btn-soft btn-error py-10'
						: 'btn-xl btn-error py-12'
		].join(' ');
	}

	async function storeSurveyResults() {
		for (let i = 0; i < surveyOptions.length; i++) {
			if (buttonStates[i] > 0) {
				await fetch('/api/survey', {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({
						option: surveyOptions[i],
						intensity: buttonStates[i]
					})
				});
			}
		}
	}

	// Funktionen für Navigation
	async function submitSurvey() {
		await storeSurveyResults();
		showExitScreen = true;
	}

	let showExitScreen = $state(false);

	function goToAI() {
		// Store survey results before navigating
		storeSurveyResults();
		goto('/checkin/final');
	}

	function goToCalendar() {
		goto('/calendar');
	}

	function goToExit() {
		goto('/exit');
	}
</script>

<div class="mx-auto flex max-w-5xl flex-col items-center justify-center py-12">
	<Heading level="h1">Kurze Frage noch: Kennst du das?👇</Heading>

	<!-- Buttons mit Survey Options 🧯 -->
	<div class="custom-autofit mt-6 grid min-h-90 gap-2 space-y-8">
		{#each surveyOptions as option, index}
			<button class={getButtonClass(index)} onclick={() => toggleOption(index)} type="button">
				<Heading level="h2">{option.emoji}</Heading>
				<p>{option.text}</p>
			</button>
		{/each}
	</div>

	<div class="m-auto flex max-w-m flex-col items-center justify-center">
		{#if !showExitScreen}
			<!-- Hinweis wenn Survey noch unbearbeitet -->
			<p class="prose mb-10 text-center">
				Was hiervon stört dich in deinem Arbeitsalltag? <span class="font-bold"
					>Klicke mehrmals</span
				> auf besonders nervige Sachen.
			</p>
			<button
				class={`btn btn-primary btn-xl btn-block h-auto p-2 ${hasSelection ? '' : 'btn-disabled'}`}
				onclick={submitSurvey}
				disabled={!hasSelection}
			>
				Antworten abschicken
			</button>
		{:else}
			<p class="prose mb-2 text-center">
				Als <span class="font-bold">Dankeschön</span> geht's hier zum Mini-Hack, der dir eine 1A schriftliche
				Übergabe baut, auch wenn dein Kopf noch unsortiert ist.
			</p>
			<button class="btn btn-accent btn-xl btn-block h-auto p-2" onclick={goToAI}>
				Zum Prototyp
			</button>
		{/if}

		<PrivacyTooltip note="Wir speichern hier nur deine Auswahl an Stressfaktoren – ohne Nutzerkennung, ohne IP, ohne Cookies.
Die Daten über ausgewählte Faktoren und Intensität landen anonymisiert in einer offenen Statistik."/>
		
		<p class="prose text-xs mb-10 text-center">Tipp: Über die Privacy Tooltips erfährst du, was mit deinen Daten passiert.</p>

		<!-- Optionale Buttons zum Kalender und Exit-Screen -->
		<button class="btn mb-3" onclick={goToCalendar}> Mein Chaos ist komplexer </button>

		<button class="btn btn-outline btn-sm" onclick={goToExit}>
			Bei uns läuft das alles perfekt
		</button>
	</div>
</div>

<style>
	.custom-autofit {
		grid-template-columns: repeat(auto-fit, minmax(30%, 1fr));
	}
</style>

```

# src\routes\checkin\final\+page.svelte

```svelte
<script lang="ts">
	import { goto } from '$app/navigation';
	import Heading from '../../../components/Heading.svelte';

	function navigateForward() {
		goto('/knowgo/drop');
	}
</script>

<div class="max-w-lg m-auto flex flex-col items-center justify-center py-12 text-center">
	<div class="mb-8">
		<Heading level="h1" color="primary" short>KnowGo</Heading>
		<Heading level="h3">Urlaubsübergabe mit KI</Heading>
	</div>
	<Heading level="h2" short>Damit es nie wieder heißt:</Heading>



	<div class="bg-accent shadow-lg rounded-4xl container p-6 m-10">
		<h1 class="text-4xl">😓</h1>
		<h1 class="mb-2 text-xl">✋👎</h1>
		<Heading level="h2" color="accent-content">Erklären dauert zu lange.</Heading>
		<Heading level="h2" color="accent-content">Ich mach's einfach selbst.</Heading>
	</div>

	<div class="mb-8">
		<p class="mb-4">Lass das Chaos in deinem Kopf heraussprudeln.</p>
        <p>KnowGo macht daraus eine <span class="font-bold">schriftliche Übergabe, die deine Kolleg*innen mit Kusshand</span> entgegen nehmen.</p>
	</div>

	<button class="btn btn-primary btn-xl shadow-lg" onclick={navigateForward}>Aufgabe abgeben 😘</button
	>
</div>

```

# src\routes\exit\+page.svelte

```svelte
<script lang="ts">
	import { goto } from '$app/navigation';
	import Heading from '../../components/Heading.svelte';

	let email = '';
	let submitted = false;
	let errorMessage = '';

	function validateEmail(email: string): boolean {
		const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return pattern.test(email);
	}

	async function handleSubmit() {
		if (!validateEmail(email)) {
			errorMessage = 'Bitte gib eine gültige E-Mail-Adresse ein.';
			return;
		}

		errorMessage = '';
		try {
			const response = await fetch('/api/email', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ email })
			});
			const result = await response.json();
			if (!result.success) {
				errorMessage = result.error || 'Fehler beim Speichern der E-Mail.';
				return;
			}
			submitted = true;
		} catch (err) {
			errorMessage = 'Fehler beim Speichern der E-Mail.';
		}
	}

	function goToCalendar() {
		goto('/calendar');
	}

	function goToAI() {
		goto('/checkin/final');
	}
</script>

<div class="mx-auto flex max-w-xl flex-col items-center justify-center py-12">
	<Heading level="h1">Danke für's Reinschauen!</Heading>
	<Heading level="h3">KnowGo: Die Übergabe ist erledigt, now go enjoy.</Heading>

	<p class="mb-6 text-center text-xl font-semibold"></p>

	<div class="prose prose-lg mb-8 text-center">
		<p>
			Ich entwickle gerade eine umfassendere Lösung, um den täglichen Stress mit
			unvollständigen Übergaben zu beenden. Deine Erfahrungen sind dabei Gold wert!
		</p>
	</div>

	<div class="mb-8 w-full max-w-xl rounded-lg border border-gray-200 p-6 shadow-sm">
		<h3 class="mb-4 text-lg font-bold">In einem kurzen 15-Min-Gespräch könntest du...</h3>

		<ul class="mb-6 space-y-2">
			<li class="flex items-start">
				<span class="text-primary mr-2">•</span>
				<span>Mir helfen zu verstehen, was in deinem Arbeitsalltag wirklich nervt</span>
			</li>
			<li class="flex items-start">
				<span class="text-primary mr-2">•</span>
				<span>Als Erster/Erste Zugang zu verbesserten Versionen bekommen</span>
			</li>
			<li class="flex items-start">
				<span class="text-primary mr-2">•</span>
				<span>Konkrete Tipps für bessere Übergaben in deinem Team erhalten</span>
			</li>
		</ul>

		<button onclick={goToCalendar} class="btn btn-primary btn-lg btn-block mb-12">Super, jetzt Termin buchen</button>

		{#if !submitted}
			<form onsubmit={handleSubmit} class="space-y-4">
				<div>
					<label for="email" class="mb-1 block text-sm font-medium text-gray-700">
						<h3 class="mb-1 text-lg font-bold">Kalender nicht parat?</h3>
					</label>
					<p class="mb-4">Lass uns per E-Mail in Kontakt bleiben:</p>
					<input
						type="email"
						id="email"
						bind:value={email}
						placeholder="deine@email.de"
						class="input input-bordered w-full"
						required
					/>
					{#if errorMessage}
						<p class="mt-1 text-sm text-red-500">{errorMessage}</p>
					{/if}
				</div>

				<button class="btn btn-primary btn-outline btn-block" type="submit"
					>E-Mail Adresse abschicken</button
				>
			</form>
		{:else}
			<div class="rounded-lg bg-green-50 p-4 text-center text-green-800">
				<p class="font-semibold mb-4">Danke! Ich werde mich für einen Termin bei dir melden.</p>
                <button class="btn btn-outline btn-secondary mb-3" onclick={goToAI}
                >Zurück zum Übergabe Tool</button
                >
			</div>
		{/if}
	</div>
</div>

```

# src\routes\interviews\benefits\+page.svelte

```svelte
<script lang="ts">
	import { goto } from '$app/navigation';
	import Heading from '../../../components/Heading.svelte';

	function goToCheckin() {
		goto('/checkin');
	}

    function goToCalendar() {
        goto('/calendar')
    }

    function goToExit() {
        goto('/exit')
    }
</script>

<div class="flex max-w-150 m-auto flex-col items-center justify-center py-12">
	<Heading level="h1">Das springt für dich raus:</Heading>
	<div class="prose mb-12">
		<p>
			🤝 ein <span class="font-bold">1:1 Gespräch</span> über Wissenssilos, das zum Nachdenken anregt. 
		</p>
		<p>🔑 Teile deine Erfahrungen und Herausforderungen und hilf mir etwas zu bauen, das <span class="font-bold">wirklich funktioniert</span> — für dich und andere.</p>
		<p>🤖 <span class="font-bold">Quick Win für Jetzt</span>: Ein Mini-Hack, deinem inneren "Ich erklär das zum 5. Mal"-Schreihals endlich Gehör verschafft.</p>
	</div>

	<button class="btn btn-primary btn-lg mb-3" onclick={goToCheckin}
		>Zeig mal diesen Hack!</button
	>
	<button class="btn btn-secondary btn-lg mb-3" onclick={goToCalendar}
		>Gespräch vereinbaren</button
	>
    <button class="btn btn-outline btn-secondary btn-sm" onclick={goToExit}
		>Später, vielleicht</button
	>
</div>

```

# src\routes\interviews\calendar\+page.svelte

```svelte
<script lang="ts">
  import { onMount } from 'svelte';
  import { browser } from '$app/environment';
	import Heading from '../../../components/Heading.svelte';

  // Calendly config
  const calendlyUrl = "https://calendly.com/hallo-jesskreck/30min";
  let isCalendlyLoaded = false;
  
  // Load the Calendly script
  function loadCalendlyScript() {
    return new Promise<void>((resolve) => {
      if (document.getElementById('calendly-script')) {
        isCalendlyLoaded = true;
        resolve();
        return;
      }
      
      const script = document.createElement('script');
      script.id = 'calendly-script';
      script.src = 'https://assets.calendly.com/assets/external/widget.js';
      script.async = true;
      script.onload = () => {
        isCalendlyLoaded = true;
        resolve();
      };
      
      document.body.appendChild(script);
    });
  }
  
  // Initialize Calendly with advanced options
  function initCalendly() {
    if (!isCalendlyLoaded || !window.Calendly) return;
    
    const container = document.querySelector('.calendly-container');
    if (!container) {
      console.error('Calendly container not found');
      return;
    }
    
    window.Calendly.initInlineWidget({
      url: calendlyUrl,
      parentElement: container,
      prefill: {
        // Optional prefill values
        // email: "test@example.com",
        // name: "John Doe",
      },
      utm: {
        // Optional UTM parameters
        // utmSource: "yourwebsite",
      }
    });
  }

  onMount(async () => {
    if (browser) {
      await loadCalendlyScript();
      initCalendly();
    }
  });
</script>

<svelte:head>
  <!-- Add any required meta tags for the Calendly integration -->
</svelte:head>

<div class="container mx-auto py-8">
  
  <Heading level="h1">Wann passt es dir am besten?</Heading>
  
  <!-- The container for Calendly to initialize into -->
  <div class="calendly-container" style="min-width:320px;height:700px;"></div>
</div>

<!-- Add TypeScript interface for Calendly global object -->
<script lang="ts" context="module">
  declare global {
    interface Window {
      Calendly?: {
        initInlineWidget: (options: {
          url: string;
          parentElement: Element;
          prefill?: {
            email?: string;
            name?: string;
            [key: string]: any;
          };
          utm?: {
            utmSource?: string;
            [key: string]: any;
          };
        }) => void;
      };
    }
  }
</script>
```

# src\routes\knowgo\+layout.svelte

```svelte
<script lang="ts">
	import { onMount } from 'svelte';
	import { knowgoState } from '../../lib/knowgo-state.svelte';

	let { children } = $props();

	// State-Debugging einrichten
	onMount(() => {
		// Überwache Änderungen am gesamten State
		$inspect(knowgoState).with((type, state) => {
			console.log(`[KnowGo State Update]`, $state.snapshot(state));
		});
	});
</script>

<div class="knowgo-layout">
	<!-- Rest deines Layouts -->
	<div class="mx-auto mb-2 max-w-4xl px-4">
		<ul class="steps steps-horizontal w-full">
			<li
				class="step"
				class:step-primary={['drop', 'record', 'chaos', 'questions', 'result'].includes(
					knowgoState.currentStep
				)}
			>
				<span class="step-icon"></span>
			</li>
			<li
				class="step"
				class:step-primary={['record', 'chaos', 'questions', 'result'].includes(
					knowgoState.currentStep
				)}
			>
				<span class="step-icon"></span>
			</li>
			<li
				class="step"
				class:step-primary={['chaos', 'questions', 'result'].includes(knowgoState.currentStep)}
			>
				<span class="step-icon"></span>
			</li>
			<li class="step" class:step-primary={['questions', 'result'].includes(knowgoState.currentStep)}>
				<span class="step-icon"></span>
			</li>
			<li class="step" class:step-primary={['result'].includes(knowgoState.currentStep)}>
				<span class="step-icon"></span>
			</li>
		</ul>
	</div>

	<div>
		{@render children()}
	</div>
</div>

```

# src\routes\knowgo\+page.svelte

```svelte
<script lang="ts">
	import { goto } from '$app/navigation';
	import Heading from '../../components/Heading.svelte';
	import PrivacyTooltip from '../../components/PrivacyTooltip.svelte';
	import { knowgoState, updateTaskDescription, resetState } from '../../lib/knowgo-state.svelte';
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

```

# src\routes\knowgo\chaos-check\+page.svelte

```svelte
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
```

# src\routes\knowgo\questions\+page.svelte

```svelte
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
```

# src\routes\knowgo\record\+page.svelte

```svelte
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
			goto('/knowgo/drop');
			return;
		}

		clearError();
	});

	function goToDropPage() {
		goto('/knowgo/');
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
			<button class="btn btn-outline btn-xs mt-6" onclick={goToDropPage}>
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
```

# src\routes\knowgo\result\+page.svelte

```svelte
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
```

# static\favicon.png

This is a binary file of the type: Image

# svelte.config.js

```js
import adapter from '@sveltejs/adapter-netlify';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://svelte.dev/docs/kit/integrations
	// for more information about preprocessors
	preprocess: vitePreprocess(),

	kit: {
		// default options are shown
		adapter: adapter({
			// if true, will create a Netlify Edge Function rather
			// than using standard Node-based functions
			edge: false,

			// if true, will split your app into multiple functions
			// instead of creating a single one for the entire app.
			// if `edge` is true, this option cannot be used
			split: false
		})
	}
};

export default config;

```

# tsconfig.json

```json
{
	"extends": "./.svelte-kit/tsconfig.json",
	"compilerOptions": {
		"allowJs": true,
		"checkJs": true,
		"esModuleInterop": true,
		"forceConsistentCasingInFileNames": true,
		"resolveJsonModule": true,
		"skipLibCheck": true,
		"sourceMap": true,
		"strict": true,
		"moduleResolution": "bundler"
	}
	// Path aliases are handled by https://svelte.dev/docs/kit/configuration#alias
	// except $lib which is handled by https://svelte.dev/docs/kit/configuration#files
	//
	// If you want to overwrite includes/excludes, make sure to copy over the relevant includes/excludes
	// from the referenced tsconfig.json - TypeScript does not merge them in
}

```

# vite.config.ts

```ts
import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [tailwindcss(), sveltekit()]
});

```

