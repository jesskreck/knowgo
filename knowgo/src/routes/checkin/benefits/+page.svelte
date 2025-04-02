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
