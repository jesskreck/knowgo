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

	<div class="m-auto flex max-w-sm flex-col items-center justify-center">
		{#if !showExitScreen}
			<!-- Hinweis wenn Survey noch unbearbeitet -->
			<p class="prose mb-2 text-center">
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
