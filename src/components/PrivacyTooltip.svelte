<script lang="ts">

	let { note, open, primary }: { note: string, open?: boolean, primary?: boolean} = $props();

</script>

<div
	class="badge badge-info  badge-primary tooltip tooltip-bottom mt-3 mb-6 {open? 'tooltip-open' : ''} {primary? 'tooltip-primary badge-outline' : 'badge-soft'}"
	data-tip={note}
>
	<svg class="size-[1em] animate-pulse" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
		><g fill="currentColor" stroke-linejoin="miter" stroke-linecap="butt"
			><circle
				cx="12"
				cy="12"
				r="10"
				fill="none"
				stroke="currentColor"
				stroke-linecap="square"
				stroke-miterlimit="10"
				stroke-width="2"
			></circle><path
				d="m12,17v-5.5c0-.276-.224-.5-.5-.5h-1.5"
				fill="none"
				stroke="currentColor"
				stroke-linecap="square"
				stroke-miterlimit="10"
				stroke-width="2"
			></path><circle cx="12" cy="7.25" r="1.25" fill="currentColor" stroke-width="2"></circle></g
		></svg
	>
	Privacy by Default
</div>
