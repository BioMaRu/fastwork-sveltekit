<script lang="ts">
	import { groupBy, sortBy } from 'lodash-es'
	import { onMount } from 'svelte'
	import { flip } from 'svelte/animate'
	import { fly } from 'svelte/transition'

	import { FilterTabs } from '$components'
	import { PAGE_TITLE_POSTFIX } from '$lib/constants'
	import * as format from '$lib/format'
	import { t } from '$lib/i18n'
	import * as tracking from '$lib/tracking'
	import type { Mission } from '$types'

	import type { PageData } from './$types'
	import CardMission from './components/CardMission.svelte'
	import ModalMissionDetail from './components/ModalMissionDetail.svelte'

	interface Props {
		data: PageData
	}

	let { data }: Props = $props()

	/**
	 * ready is a flag to indicate if the page is ready, for trigger animate
	 */
	let ready = $state(false)

	let selectedTab = $state<Mission.Category | 'all'>('all')

	/**
	 * groupedList is a list of missions grouped by category
	 */
	let groupedList = $derived.by(() => {
		if (!ready) {
			return {}
		}

		const list = data?.list.filter((it) => selectedTab === 'all' || it.category === selectedTab)
		const grouped = groupBy(list, 'category') as Record<string, Mission.Item[]>
		for (const category in grouped) {
			grouped[category] = sortBy(grouped[category], 'user_challenge_completed')
		}
		return grouped
	})

	/*
	 * availableTabs is a list of unique mission categories from the data
	 */
	let availableTabs = $derived.by(() => Object.keys(groupBy(data?.list, 'category')))
	let displayTabs = $derived.by(() => {
		const tabs = [
			{ label: $t('earn.category-tab.common'), value: 'common' },
			{ label: $t('earn.category-tab.selling'), value: 'selling' },
			{ label: $t('earn.category-tab.hiring'), value: 'hiring' },
		] as const satisfies { label: string; value: Mission.Category }[]

		return tabs.filter((it) => availableTabs.includes(it.value))
	})

	function trackChangeTab(category: Mission.Category) {
		tracking.trackApplyFilter({
			filter_name: 'mission',
			type: category,
		})
	}

	onMount(() => {
		ready = true
	})
</script>

<svelte:head>
	<title>{`${$t('earn.head.title')} ${PAGE_TITLE_POSTFIX}`}</title>
</svelte:head>

<div class="_ovf-hd">
	<div class="_pst-rlt">
		<div class="_bgcl-primary-100 _pst-rlt _zid-0 _pst-rlt _zid-1 _pdbt-64px">
			<div class="lo-container _pdbt-48px">
				<div class="_ctnt-ils">
					<div
						class="title _fw-500 _pdl-16px _bdlw-4px _bdcl-primary-500 _ffml-secondary _mgt-24px"
					>
						{$t('earn.page-title')}
					</div>

					<div class="_mgt-48px">
						<FilterTabs
							tabs={[
								{ label: $t('earn.category-tab.all'), value: 'all' },
								...displayTabs,
							]}
							bind:selected={selectedTab}
							onChange={(tab) => trackChangeTab(tab as Mission.Category)}
						/>
					</div>

					<div class="lo-12 _gg-32px _mgt-32px">
						{#each Object.keys(groupedList) as key, idx}
							<div in:fly={{ y: 50, delay: idx * 100 }}>
								<h2
									class="_fs-700-md _fs-500 _ffml-secondary _fw-500 _cl-primary _mgt-16px"
								>
									{displayTabs.find((it) => it.value === key)?.label ?? key}
								</h2>
								<div class="lo-12 lo-6-md lo-4-lg _gg-32px _mgt-24px">
									{#each groupedList[key] as it, jdx (it.id)}
										<div
											in:fly={{ y: 50, delay: jdx * 100 }}
											animate:flip={{ duration: 100 }}
										>
											<CardMission
												mission={it}
												startTimeText={`${$t('earn.start-in')} ${format.nowFromDate(it.started_at)}`}
												endTimeText={`${$t('earn.time-remain')} ${format.nowToDate(it.ended_at)}`}
											/>
										</div>
									{/each}
								</div>
							</div>
						{:else}
							{#if ready}
								<div
									class="_dp-f _jtfct-ct _bgcl-primary-200 _bdrd-8px"
									style="grid-column: 1 / -1;"
								>
									<div class="_pd-32px _bdrd-8px _bgcl-primary-200">
										<div></div>
										<div class="_tal-ct">
											<div class="_fs-500-md _fs-400 _fw-500 _ffml-secondary">
												{$t('earn.no-mission')}
											</div>
											<div
												class="_fs-400-md _fs-300 _mgt-8px _cl-text-default-200"
											>
												{$t('earn.new-mission-soon')}
											</div>
										</div>
									</div>
								</div>
							{/if}
						{/each}
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

<ModalMissionDetail />

<style lang="scss">
	.title {
		font-size: max(var(--font-size-600), 2.5cqi);
	}
</style>
