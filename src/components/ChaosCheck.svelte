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
