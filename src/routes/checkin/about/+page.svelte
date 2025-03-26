<script lang="ts">
	import { goto } from '$app/navigation';
	import Heading from '../../../components/Heading.svelte';

	function navigateForward() {
		goto('/checkin/benefits');
	}

	function gotoExit() {
		goto('/exit');
	}
</script>

<div class="m-auto flex max-w-100 flex-col items-center justify-center py-12">
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

	<button class="btn btn-primary btn-lg mb-6" onclick={navigateForward}
		>Was für dich drin ist?</button
	>
	<button class="btn btn-outline btn-secondary btn-m" onclick={gotoExit}
		>Nicht deine Themen?</button
	>
</div>
