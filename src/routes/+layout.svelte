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
	<header class="bg-base flex items-center justify-between border-b p-4 md:px-8 lg:px-16 xl:px-32">
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

	<footer class="border-t">
		<div class="container mx-auto p-4 text-center text-sm">
			<h3>© {new Date().getFullYear()} Jessica Krecker</h3>
			<p class="text-sm">Mit Hirn & Herz gebaut. Für die Prise Versuch-und-Irrtum.</p>
		</div>
	</footer>
</div>
