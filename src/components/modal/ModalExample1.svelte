<script lang="ts">
	import { preventDefault, self } from '$lib/eventModifiers'
	import * as modal from '$lib/modal'

	let isActive = $state(false)

	export function open() {
		isActive = true

		document.body.style.overflow = 'hidden'
	}

	function closeZ() {
		isActive = false
		document.body.style.overflow = 'auto'
	}
</script>

<svelte:window onmodal-example1:open={() => open()} onmodal-example1:close={() => close()} />

<div
	aria-hidden="true"
	class="trb-modal _pdh-24px _jtfct-fst _ovf-at"
	class:is-active={isActive}
	onclick={self(closeZ)}
>
	<form
		onsubmit={preventDefault(() => {})}
		class="trb-modal-panel _w-100pct"
		style="max-width: 500px;"
	>
		<button
			aria-hidden="true"
			type="button"
			class="trb-modal-close _bdw-0px"
			onclick={self(closeZ)}
		>
			✕
		</button>

		<div class="_pdl-24px _pdbt-24px _pdr-32px">
			<h2 class="_fs-600 _fw-500-md _fs-400 _tal-ct">Example 1</h2>
		</div>

		<hr />

		<div class="_pdt-24px">
			<p>Example 1</p>

			<div class="_mgt-16px">
				<button
					data-selenium="first-landing.modal-register.confirm"
					class="trb-button is-pill _w-100pct"
					onclick={() => modal.open('example2')}
				>
					Open Modal2
				</button>
			</div>
		</div>
	</form>
</div>
