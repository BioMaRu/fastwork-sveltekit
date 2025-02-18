<script lang="ts">
	import { format } from '@fastwork/sdk'
	import { IMAGE_URL } from '@fastwork/sdk/constant'

	import api from '$lib/api'
	import { API } from '$lib/constants'
	import { emit } from '$lib/event'
	import { t } from '$lib/i18n'
	import swal from '$lib/swal'
	import type { Api, Mission } from '$types'

	interface Props {
		mission: Mission.Item
		endTimeText?: string
		startTimeText?: string
	}

	let { mission, endTimeText = '', startTimeText = '' }: Props = $props()

	let loading = $state(false)
	let hovering = $state(false)

	async function challenge() {
		if (loading) {
			return
		}

		loading = true
		const res = await api.invoke<Api.BaseResponse>(
			API.missionChallenge,
			{
				mission_id: mission.id,
			},
			fetch,
		)
		loading = false

		if (!res.ok) {
			if (res.error?.detail) {
				swal.error({
					title: $t('earn.alert.mission-failed.title'),
					text: `${res.error?.detail}`,
				})
			}

			return
		}

		await swal.success({
			title: $t('earn.alert.mission-success.title'),
			text: $t('earn.alert.mission-success.text', { value: format.point(mission.points) }),
		})

		api.invalidate()
	}

	function viewDetail() {
		emit('modal-mission-detail:open', {
			id: mission.id,
			title: mission.name,
			description: mission.description,
		})
	}
</script>

<div class="card _bgcl-white-100 _bdw-1px _bdcl-neutral-100" class:is-hovering={hovering}>
	<div class="_f-1 _dp-f">
		<div class="_f-1 _pdh-24px-md _pdh-16px _pdt-24px-md _pdt-16px _pdbt-16px _dp-f _fdrt-cl">
			<div class="_f-1">
				<h6 class="_tal-l _fs-400 _lh-150pct">{mission.name}</h6>

				{#if !mission.active && startTimeText}
					<div class="_dp-f _alit-ct _mgt-8px _cl-text-default-200 _fs-300 _tal-l">
						<div class="_w-16px _dp-ilf _mgr-4px">
							<i class="fa-regular fa-clock _fs-200"></i>
						</div>
						<div>
							{startTimeText}
						</div>
					</div>
				{:else if !mission.perpetual && endTimeText}
					<div class="_dp-f _alit-ct _mgt-8px _cl-text-default-200 _fs-300 _tal-l">
						<div class="_w-16px _dp-ilf _mgr-4px">
							<i class="fa-regular fa-clock _fs-200"></i>
						</div>
						<div>
							{endTimeText}
						</div>
					</div>
				{/if}
			</div>

			{#if mission.user_challenge_completed}
				<button
					class="trb-button is-fluid _bdrd-max _bgcl-neutral-200 _cl-text-default-100"
					disabled
				>
					{$t('layout.button-label.claimed')}
				</button>
			{:else if !mission.active}
				<button
					class="trb-button is-fluid _bdrd-max _bgcl-neutral-200 _cl-text-default-100"
					disabled
				>
					{$t('layout.button-label.not-start-yet')}
				</button>
			{:else}
				<button
					class="trb-button is-fluid _bdrd-max"
					class:is-loading={loading}
					onclick={challenge}
					onmouseover={() => (hovering = true)}
					onmouseleave={() => (hovering = false)}
					onfocus={() => (hovering = true)}
					onblur={() => (hovering = false)}
					data-selenium={`earn-page.earn-point.${mission.type}`}
				>
					{$t('layout.button-label.check-and-claim')}
				</button>
			{/if}
		</div>

		<div class="_dp-f _pdr-12px _pdv-12px _als-str">
			<div
				class="point-container _dp-f _fdrt-cl _bgcl-neutral-100 _bdrd-12px _pdh-8px _pdv-16px _gg-16px _jtfct-spbtw"
			>
				{#if mission.user_challenge_completed}
					<div class="_dp-f _jtfct-ct">
						<i class="icon-checked fas fa-circle-check _cl-positive-200"></i>
					</div>
				{:else if !mission.active}
					<div class="_dp-f _jtfct-ct">
						<i class="icon-checked far fa-clock _cl-neutral-300"></i>
					</div>
				{:else}
					<div class="_dp-f _jtfct-ct">
						<img
							class="image"
							src={IMAGE_URL.rewardPointIcon.svg}
							alt="Point"
							style="aspect-ratio: 1 / 1;"
						/>
					</div>
				{/if}

				<div class="point _tal-ct _cl-primary-500 _fw-800 _wb-bw _fs-600 _fs-700-md">
					+{format.point(mission.points)}
				</div>

				<span
					aria-hidden="true"
					class="_fs-100 _fs-200-md _dp-f _alit-ct _jtfct-spbtw _cl-text-default-200 _gg-4px _pdh-12px _cs-pt"
					onclick={viewDetail}
					data-selenium="rewards.mission-info.{mission.type}"
				>
					{$t('earn.card.mission-info-label')}
					<i class="fa-regular fa-chevron-right _fs-100"></i>
				</span>
			</div>
		</div>
	</div>
</div>

<style lang="scss">
	.card {
		display: flex;
		flex-direction: column;
		gap: 8px;
		align-content: start;
		overflow: hidden;
		min-height: 210px;
		border-radius: 16px;
		background: white;
		box-shadow: var(--bsd-100);

		&.is-hovering {
			.image {
				box-shadow: var(--bsd-100);
				transform: translate(0, -2px);
			}
		}

		.point-container {
			width: 130px;

			.image {
				width: 70px;
				border-radius: 999px;
				transition: all 0.36s cubic-bezier(0.18, 0.98, 0.65, 1.76);
			}

			.icon-checked {
				font-size: 68px;
			}
		}
	}

	@media only screen and (width <= 767px) {
		.card {
			min-height: 180px;

			.point-container {
				width: 100px;

				.image {
					width: 56px;
				}

				.icon-checked {
					font-size: 54px;
				}
			}
		}
	}
</style>
