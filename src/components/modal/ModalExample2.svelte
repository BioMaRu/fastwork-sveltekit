<script lang="ts">
	import { preventDefault, self } from '$lib/eventModifiers'
	import * as modal from '$lib/modal'
	let isActive = $state(false)

	export function open() {
		isActive = true

		document.body.style.overflow = 'hidden'
	}

	export function close() {
		isActive = false
		document.body.style.overflow = 'auto'
	}
</script>

<svelte:window onmodal-example2:open={() => open()} onmodal-example2:close={() => close()} />

<div
	aria-hidden="true"
	class="trb-modal _pdh-24px _jtfct-fst _ovf-at"
	class:is-active={isActive}
	onclick={self(close)}
>
	<form
		onsubmit={preventDefault(() => {})}
		class="trb-modal-panel _w-100pct"
		style="max-width: 300px;"
	>
		<button
			aria-hidden="true"
			type="button"
			class="trb-modal-close _bdw-0px"
			onclick={self(close)}
		>
			✕
		</button>

		<div class="_pdl-24px _pdbt-24px _pdr-32px">
			<h2 class="_fs-600 _fw-500-md _fs-400 _tal-ct">Example 2</h2>
		</div>

		<hr />

		<div class="_pdt-24px">
			<p>Example 2</p>
			<p>Example 2</p>
			<p>Example 2</p>
			<p>Example 2</p>
			<p>Example 2</p>
			<p>Example 2</p>
			<p>Example 2</p>

			<div class="_mgt-16px">
				<button
					data-selenium="first-landing.modal-register.confirm"
					class="trb-button is-pill _w-100pct"
					onclick={() => modal.closeAll()}
				>
					Close All
				</button>
			</div>
		</div>
	</form>
</div>
