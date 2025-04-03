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
		goto('/interviews/calendar');
	}

	function goToAI() {
		goto('/knowgo/start');
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
