<script lang="ts">
	import linkifyHtml from 'linkify-html'

	import { preventDefault, self } from '$lib/eventModifiers'
	import { t } from '$lib/i18n'

	type RewardDetail = {
		id: string
		title: string
		description: string
	} | null

	let modalContainerEl: Element | undefined = $state()
	let isActive = $state(false)
	let reward: RewardDetail | null = $state(null)

	export function open(ev: CustomEvent<RewardDetail>) {
		modalContainerEl?.scrollTo({ top: 0 })
		reward = null
		reward = ev.detail
		isActive = true

		document.body.style.overflow = 'hidden'
	}

	export function close() {
		isActive = false
		document.body.style.overflow = 'auto'
	}

	async function submit() {
		document.body.style.overflow = 'auto'
		isActive = false
	}
</script>

<svelte:window onmodal-mission-detail:open={open} />

<div
	aria-hidden="true"
	class="trb-modal _pdh-24px _jtfct-fst _ovf-at"
	class:is-active={isActive}
	onclick={self(close)}
	bind:this={modalContainerEl}
>
	<form
		onsubmit={preventDefault(() => submit())}
		class="trb-modal-panel _w-100pct"
		style="max-width: 640px;"
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
			<h2 class="_fs-600 _fw-500-md _fs-400 _tal-ct">{$t('earn.mission-modal.title')}</h2>
		</div>

		<hr />

		<div class="_pdt-24px">
			{#if reward}
				<div>
					<div>
						<span class="_fw-600 _fs-300 _ffml-secondary">
							{$t('earn.mission-modal.label-prefix')}: {reward.title}
						</span>

						{#if reward.description}
							<p
								class="_wsp-pw _wb-bw _fs-300 _cl-text-default-200 _lh-150pct _mgt-16px _mgbt-24px"
							>
								{@html linkifyHtml(reward.description, {
									attributes: {
										rel: 'noopener noreferrer',
										target: '_blank',
										class: '_tdcrt-udl',
									},
								})}
							</p>
						{/if}
					</div>
				</div>

				<hr class="_mgt-16px" />

				<div class="_dp-f _fdrt-r-md _fdrt-clrv _jtfct-fe _gg-16px-md _gg-12px _mgt-24px">
					<button
						data-selenium={`earn-page.modal-mission-detail.confirm`}
						class="trb-button is-fluid _pdh-32px"
					>
						{$t('earn.mission-modal.confirm-button')}
					</button>
				</div>
			{/if}
		</div>
	</form>
</div>
