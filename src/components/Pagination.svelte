<script lang="ts">
	interface Props {
		page: number
		next?: boolean
		goto: (page: number) => void
	}

	let { page, next = false, goto }: Props = $props()
	let prev = $derived(page > 1)
</script>

<div class="_dp-f _fw-w _gg-8px">
	<button
		class="trb-button is-size-small is-pill"
		class:is-disabled={!prev}
		class:is-variant-tertiary={!prev}
		disabled={!prev}
		onclick={() => goto(page - 1)}
		aria-label="Previous"
	>
		<i class="fa-solid fa-chevron-left"></i>
	</button>
	<button class="trb-button is-variant-ghost is-size-small _ptev-n is-pill _fs-400">
		{page}
	</button>
	<button
		class="trb-button is-size-small is-pill"
		class:is-disabled={!next}
		class:is-variant-tertiary={!next}
		disabled={!next}
		onclick={() => goto(page + 1)}
		aria-label="Next"
	>
		<i class="fa-solid fa-chevron-right"></i>
	</button>
</div>
