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
			  <a class="link link-hover" href="/about">Über KnowGo</a>
			  <a class="link link-hover">Über Mich</a>
			</nav>
			<nav>
				<h6 class="footer-title">KnowGo</h6>
				<a class="link link-hover">Register</a>
				<a class="link link-hover">Login</a>
			</nav>
			<nav>
			  <h6 class="footer-title">Interviews</h6>
			  <a class="link link-hover" href="/interviews/benefits">Benefits</a>
			  <a class="link link-hover" href="/interviews/calendar">Kalender</a>
			</nav>
				<div class="text-xs mt-10 col-span-2"><p><strong>Mit Hirn & Herz gebaut.</strong> Für die Prise Versuch-und-Irrtum.</p></div>
				<p class="text-xs mt-10 font-bold">© {new Date().getFullYear()} Jessica Krecker</p>
		</div>	