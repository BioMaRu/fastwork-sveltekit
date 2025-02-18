<script lang="ts">
	import { format } from '@fastwork/sdk'

	import { page } from '$app/state'
	import { emit } from '$lib/event'
	import { t } from '$lib/i18n'
	import type { Reward } from '$types'

	interface Props {
		reward: Reward.Item
	}

	let { reward }: Props = $props()

	let isLoading = $state(false)
	let hovering = $state(false)

	function viewDetail() {
		emit('modal-reward-detail:open', {
			id: reward.id,
			imageUrl: reward.assets.item_image,
			title: reward.name,
			description: reward.description,
			points: reward.points,
			type: reward.type,
		})
	}
</script>

<div class="card" class:is-hovering={hovering}>
	<!-- Images -->
	<div class="image _pst-rlt">
		<img
			src={reward?.assets?.background_image}
			alt={reward.name}
			style="aspect-ratio: 286 / 104"
			class="_w-100pct"
		/>

		{#if reward?.assets?.item_image}
			<img
				src={reward?.assets?.item_image}
				alt={reward.name}
				style="right: 16px; bottom: -20%; height: calc(130% + 20%);"
				class="item-image _pst-asl _zid-1"
			/>
		{/if}

		{#if reward?.assets?.badge_image}
			<img
				src={reward.assets.badge_image}
				alt={reward.name}
				style="top: 12px; left: 12px; height: 20%;"
				class="_pst-asl _zid-2"
			/>
		{/if}
	</div>

	<div class="info _dp-f _fdrt-cl _pst-rlt _zid-1">
		<!-- Title and description -->
		<div class="_f-1">
			<div class="_fw-500 _ffml-secondary _fs-400 _lh-150pct">
				{reward.name}
			</div>
			{#if reward.active}
				<div class="_cl-text-default-200 _fs-200 _mgt-8px">
					<div class="_w-12px _dp-ilf _mgr-4px">
						<i class="fa-regular fa-info-circle _fs-200"></i>
					</div>
					{$t('reward.redeem-x-this-month', {
						value: `${reward.user_redeems_count} / ${reward.max_redeems_per_user}`,
					})}
				</div>
			{/if}
		</div>

		<!-- Buttons -->
		<div class="_mgt-24px">
			<div class="_mgt-12px">
				{#if !reward.active}
					<button
						class="trb-button _bgcl-neutral-200 _cl-text-default-100 _bdrd-max _w-100pct"
						disabled
					>
						{$t('reward.button-label.coming-soon')}
					</button>
				{:else if reward.user_fully_collected}
					<button
						class="trb-button _bgcl-neutral-200 _cl-text-default-100 _bdrd-max _w-100pct"
						disabled
					>
						{$t('reward.button-label.redeem-limit-exceeded')}
					</button>
				{:else if reward.out_of_stock}
					<button
						class="trb-button _bgcl-neutral-200 _cl-text-default-100 _bdrd-max _w-100pct"
						disabled
					>
						{$t('reward.button-label.out-of-stock')}
					</button>
				{:else}
					<button
						class="trb-button _bdrd-max _w-100pct"
						class:is-loading={isLoading}
						onclick={viewDetail}
						onmouseover={() => (hovering = true)}
						onmouseleave={() => (hovering = false)}
						onfocus={() => (hovering = true)}
						onblur={() => (hovering = false)}
						disabled={Number(page.data.point?.points) < reward.points}
						data-selenium={`reward-page.get-reward.${reward.type}`}
					>
						{format.price(reward.points)}
						{$t('layout.points')}
					</button>
				{/if}
			</div>
		</div>
	</div>
</div>

<style lang="scss">
	.card {
		position: relative;
		display: flex;
		flex-direction: column;
		gap: 0;
		align-content: start;
		height: 100%;
		min-height: 210px;
		padding-top: 10%;
		border-radius: 8px;

		&.is-hovering {
			.item-image {
				transform: scale(1.1) rotate(-12deg) translateY(-8px);
			}
		}

		.image {
			position: relative;

			img {
				position: relative;
				z-index: 1;
				transition: all 0.36s cubic-bezier(0.18, 0.98, 0.65, 1.76);
			}
		}

		.info {
			flex: 1;
			overflow: hidden;
			padding: 16px;
			border: 1px solid var(--color-neutral-200);
			border-radius: 0 0 12px 12px;
			background: white;
		}
	}
</style>
