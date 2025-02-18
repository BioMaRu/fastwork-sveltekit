<script lang="ts">
	import { groupBy } from 'lodash-es'
	import { onMount } from 'svelte'
	import { flip } from 'svelte/animate'
	import { fly } from 'svelte/transition'

	import { FilterTabs } from '$components'
	import { PAGE_TITLE_POSTFIX } from '$lib/constants'
	import { t } from '$lib/i18n'
	import * as tracking from '$lib/tracking'
	import type { Reward } from '$types'

	import type { PageData } from './$types'
	import CardReward from './components/CardReward.svelte'
	import EmptyRewardState from './components/EmptyRewardState.svelte'
	import ModalRewardDetail from './components/ModalRewardDetail.svelte'

	interface Props {
		data: PageData
	}

	let { data }: Props = $props()

	/**
	 * ready is a flag to indicate if the page is ready, only for trigger animation
	 */
	let ready = $state(false)

	let selectedTab = $state<Reward.Category | 'all'>('all')
	let availableTabs = $derived.by(() => Object.keys(groupBy(data?.list, 'category')))
	let displayTabs = $derived.by(() => {
		const tabs = [
			{ label: $t('reward.category-tab.selling'), value: 'selling' },
			{ label: $t('reward.category-tab.hiring'), value: 'hiring' },
		] as const satisfies { label: string; value: Reward.Category }[]

		return tabs.filter((it) => availableTabs.includes(it.value))
	})

	/**
	 * list is a list of rewards filtered by the selected tab
	 */
	let list = $derived(
		ready
			? data?.list.filter((it) => selectedTab === 'all' || it.category === selectedTab)
			: [],
	)

	onMount(() => {
		ready = true
	})

	function trackChangeTab(category: Reward.Category) {
		tracking.trackApplyFilter({
			filter_name: 'reward',
			type: category,
		})
	}
</script>

<svelte:head>
	<title>{`${$t('reward.head.title')} ${PAGE_TITLE_POSTFIX}`}</title>
</svelte:head>

<div class="_ovf-hd">
	<div class="_bgcl-primary-100 _pst-rlt _pdbt-64px">
		<div class="_pst-rlt _zid-0 _pst-rlt _zid-1">
			<div class="lo-container _pdbt-48px">
				<div class="_ctnt-ils">
					<div
						class="title _fw-500 _pdl-16px _bdlw-4px _bdcl-primary-500 _ffml-secondary _mgt-24px"
					>
						{$t('reward.page-title')}
					</div>

					<div class="_mgt-48px">
						<FilterTabs
							tabs={[
								{ label: $t('reward.category-tab.all'), value: 'all' },
								...displayTabs,
							]}
							bind:selected={selectedTab}
							onChange={(tab) => trackChangeTab(tab as Reward.Category)}
						/>
					</div>

					<div
						class="lo-12 lo-6-sm lo-4-md lo-3-lg _grg-32px-md _gclg-32px-md _grg-24px _gclg-12px _mgt-32px"
					>
						{#each list as it, idx (it.id)}
							<div
								in:fly={{ y: 30, delay: idx * 100 }}
								animate:flip={{ duration: 500 }}
							>
								<CardReward reward={it} />
							</div>
						{:else}
							{#if ready}
								<EmptyRewardState />
							{/if}
						{/each}
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

<ModalRewardDetail />

<style lang="scss">
	.title {
		font-size: max(var(--font-size-600), 2.5cqi);
	}
</style>
