<script lang="ts">
	import { goto } from '$app/navigation';
	import Heading from '../../../components/Heading.svelte';
    import Avatar from '$lib/assets/avatar.gif'

	function navigateForward() {
		goto('/interviews/benefits');
	}

	function gotoExit() {
		goto('/exit');
	}
</script>

<div class="m-auto flex max-w-xl flex-col items-center justify-center py-12">
	<div class="grid grid-flow-col gap-4">
		<div>
			<Heading level="h1">Wer bin ich?</Heading>
            <img class="rounded-full m-auto" src={Avatar} alt="Profilbild">
			<div class="prose mb-12 mt-5">
				<p>
					Webentwicklerin und Instructional Designerin mit Fokus auf <span class="font-bold">digitale Lernlösungen</span>.
				</p>
				<p>
					Ich entwickle ein skalierbares Onboarding-Tool speziell für Freelancer, Berater*innen und Remote-Teams. Dafür bringe ich UX-Design, Didaktik und Tech zusammen, um Wissenstransfer und Lernprozesse radikal zu vereinfachen.
				</p>
				<p>
					<span class="font-bold">Ziel:</span> schnelleres Ankommen, weniger Reibung, produktiver ab Tag 1.
				</p>

                <p>
					<span class="font-bold">Suche aktuell:</span> Pilotkund*innen, Sparring, Feedback.
				</p>
			</div>
		</div>
		<!-- <div>
			<Heading level="h1">Wer steckt dahinter?</Heading>
			<div class="prose mb-12">
				<p>
					Jessica Krecker
				</p>
				<p>
					Webentwicklerin & Instructional Designerin
				</p>
			</div>
		</div> -->
	</div>

	<button class="btn btn-primary btn-lg mb-6" onclick={navigateForward}
		>Was für dich drin ist?</button
	>
	<button class="btn btn-outline btn-secondary btn-m" onclick={gotoExit}
		>Nicht deine Themen?</button
	>
</div>
