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
				class:step-primary={['start', 'record', 'chaos', 'questions', 'result'].includes(
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
