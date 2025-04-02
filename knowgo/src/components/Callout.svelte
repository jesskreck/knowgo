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
