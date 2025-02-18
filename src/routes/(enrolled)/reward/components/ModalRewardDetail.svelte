<script lang="ts">
	import { format } from '@fastwork/sdk'

	import api from '$lib/api'
	import { API, EXTERNAL_LINK } from '$lib/constants'
	import { preventDefault, self } from '$lib/eventModifiers'
	import { t } from '$lib/i18n'
	import swal from '$lib/swal'
	import type { Reward } from '$types'
	import type { Api } from '$types'

	type RewardDetail = {
		id: string
		title: string
		description: string
		imageUrl: string
		points: number
		type: Reward.Item['type']
	} | null

	let modalContainerEl: Element | undefined = $state()
	let isActive = $state(false)
	let loading = $state(false)
	let reward: RewardDetail | null = $state(null)

	export function open(ev: CustomEvent<RewardDetail>) {
		modalContainerEl?.scrollTo({ top: 0 })
		reward = null
		reward = ev.detail
		isActive = true

		document.body.style.overflow = 'hidden'
	}

	export function close() {
		if (loading) {
			return
		}

		isActive = false
		document.body.style.overflow = 'auto'
	}

	async function submit() {
		if (loading) {
			return
		}

		const decision = await swal.confirm({
			title: $t('reward.alert.confirm-redeem.title'),
			text: $t('reward.alert.confirm-redeem.text', {
				value: format.price(reward?.points || 0),
			}),
			yesLabel: $t('reward.alert.confirm-redeem.confirm-label'),
			yesDataSelenium: 'reward-page.alert-get-reward.confirm',
		})

		if (!decision.isConfirmed) {
			return
		}

		loading = true
		const res = await api.invoke<Api.BaseResponse>(
			API.rewardRedeem,
			{
				reward_id: reward?.id,
			},
			fetch,
		)
		loading = false

		if (!res.ok) {
			if (res.error?.detail) {
				swal.error({
					title: $t('layout.error-message.unexpected'),
					text: `${res.error?.detail}`,
				})
			}
			return
		}

		api.invalidate(API.pointGetByUser)
		api.invalidate(API.rewardList)

		let htmlContent = undefined

		switch (reward?.type) {
			case 'cashback':
				htmlContent = $t('reward.alert.redeem-success.type-cashback-text', {
					value: reward?.title,
					value2: EXTERNAL_LINK.withdrawalDashboard,
				})

				break
			default:
				htmlContent = undefined
				break
		}

		await swal.success({
			title: $t('reward.alert.redeem-success.title'),
			html: htmlContent,
		})

		document.body.style.overflow = 'auto'
		isActive = false
	}
</script>

<svelte:window onmodal-reward-detail:open={open} onmodal-reward-detail:close={close} />

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
			<h2 class="_fs-600 _fw-500-md _fs-400 _tal-ct">{$t('reward.reward-detail')}</h2>
		</div>

		<hr />

		<div class="_pdt-24px">
			{#if reward}
				<div>
					<div class="_dp-f _jtfct-ct">
						<img
							src={reward.imageUrl}
							alt={reward.title}
							width="auto"
							style="max-height: 200px"
						/>
					</div>
					<div class="_mgt-32px">
						<div class="_fw-600 _fs-500">
							{reward.title}
						</div>

						{#if reward.description}
							<hr class="_mgt-24px _mgbt-24px" />
							<p class="_wsp-pw _wb-bw _fs-300 _cl-text-default-200 _lh-150pct">
								{reward.description}
							</p>
						{/if}
					</div>
				</div>

				<hr class="_mgt-16px" />

				<div class="_dp-f _fdrt-r-md _fdrt-clrv _jtfct-fe _gg-16px-md _gg-12px _mgt-24px">
					<button
						class="trb-button is-variant-tertiary is-pill _pdh-32px"
						type="button"
						onclick={close}
						disabled={loading}
					>
						{$t('layout.button-label.close-dialog')}
					</button>
					<button
						data-selenium="reward-page.modal-get-reward-detail.confirm"
						class="trb-button is-pill _pdh-32px"
						class:is-loading={loading}
					>
						{$t('layout.button-label.redeem')}
					</button>
				</div>
			{/if}
		</div>
	</form>
</div>
