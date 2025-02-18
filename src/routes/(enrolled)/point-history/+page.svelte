<script lang="ts">
	import { format } from '@fastwork/sdk'

	import { goto } from '$app/navigation'
	import { page } from '$app/state'
	import { Pagination } from '$components'
	import { PAGE_TITLE_POSTFIX } from '$lib/constants'
	import { t } from '$lib/i18n'

	import type { PageData } from './$types'
	interface Props {
		data: PageData
	}

	let { data }: Props = $props()

	let list = $derived(data.list)
	let paginate = $derived(data.paginate)
	let paginatePageStartNum = $derived(paginate && (paginate?.page - 1) * paginate?.perPage + 1)
	let paginatePageEndNum = $derived(
		paginate && (paginate?.page - 1) * paginate?.perPage + list.length,
	)

	async function setQuery(name: string, value: string) {
		const url = new URL(page.url)
		if (!value) {
			url.searchParams.delete(name)
		} else {
			url.searchParams.set(name, value)
		}

		goto(url, {
			invalidateAll: true,
		})
	}

	function gotoPage(page: number) {
		setQuery('page', page.toString())
	}
</script>

<svelte:head>
	<title>{`${$t('point-history.page-title')} ${PAGE_TITLE_POSTFIX}`}</title>
</svelte:head>

<section>
	<div class="lo-container _bgcl-primary-100 _pdbt-64px">
		<div class="_ctnt-ils">
			<div
				class="title _fw-500 _pdl-16px _bdlw-4px _bdcl-primary-500 _ffml-secondary _mgt-24px"
			>
				{$t('point-history.page-title')}
			</div>

			<div class="trb-tabs _mgt-24px">
				<div class="tabs-menus">
					<div
						class="tabs-button _f-1 is-active"
						style={`
                            --tabs-height: 50px;
                            box-shadow: none;
                        `}
					>
						<div>{$t('point-history.tab.earn')}</div>
					</div>
					<a
						href="/reward-history"
						class="tabs-button _f-1"
						style={`
                        --tabs-height: 50px
                    `}
					>
						<div>{$t('point-history.tab.redeem')}</div>
					</a>
				</div>

				<div class="tabs-contents _bgcl-white-100">
					<div
						class="_dp-n _dp-f-md trb-table-container _mg-16px _bdw-1px _bdcl-neutral-200 _bdrd-8px"
					>
						<table class="trb-table">
							<thead>
								<tr>
									<th>{$t('point-history.table-column.earned-date')}</th>
									<th>{$t('point-history.table-column.description')}</th>
									<th class="_tal-r _pdr-32px">
										{$t('point-history.table-column.amount')}
									</th>
								</tr>
							</thead>
							<tbody class="_bgcl-white-100">
								{#each list as it}
									<tr>
										<td>{format.dateTime(it.inserted_at)}</td>
										<td>{it.name}</td>
										<td class="_tal-r _pdr-32px _fw-600 _cl-positive-200"
											>+{format.point(it.points)}</td
										>
									</tr>
								{:else}
									<tr>
										<td colspan="3" class="_tal-ct">{$t('layout.no-data')}</td>
									</tr>
								{/each}

								{#if paginate && list?.length}
									<tr>
										<td
											colspan="3"
											class="_tal-r _pdv-8px _fs-300 _cl-text-default-200"
										>
											{paginatePageStartNum}-{paginatePageEndNum}
											{$t('layout.from')}
											{paginate.count}
											{$t('layout.items')}
										</td>
									</tr>
								{/if}
							</tbody>
						</table>
					</div>

					<div class="lo-12 _dp-g _dp-n-md _pdv-12px">
						{#each list as it, idx}
							<div class="_dp-f _jtfct-spbtw _gg-24px _pd-16px">
								<div class="_f-1">
									<div class="_fs-100 _cl-text-default-200">
										{format.dateTime(it.inserted_at)}
									</div>
									<div class="_fs-300 _mgt-8px _wb-bw">
										{it.name}
									</div>
								</div>
								<div style="padding-top: 18px">
									<div class="_fw-500 _fs-400 _tal-r _cl-positive-200 _wsp-nw">
										+{format.point(it.points)}
									</div>
									{#if it.redeem_status === 'success'}
										<div class="_dp-f _jtfct-fe">
											<div
												class="trb-badge is-variant-positive _wsp-nw _mgt-8px _fs-200"
											>
												สำเร็จ
											</div>
										</div>
									{/if}
								</div>
							</div>

							{#if idx < list.length}
								<hr />
							{/if}
						{:else}
							<div class="_tal-ct _pd-16px">{$t('layout.no-data')}</div>
						{/each}

						{#if paginate && list?.length}
							<div class="_tal-r _pdv-8px _fs-300 _cl-text-default-200 _pdh-12px">
								{paginatePageStartNum}-{paginatePageEndNum}
								{$t('layout.from')}
								{paginate.count}
								{$t('layout.items')}
							</div>
						{/if}
					</div>

					{#if paginate && list.length > 0}
						<div class="_dp-f _jtfct-ct _mgbt-24px _mgt-24px">
							<Pagination
								page={paginate?.page}
								next={paginate?.page < paginate?.totalPage}
								goto={gotoPage}
							/>
						</div>
					{/if}
				</div>
			</div>
		</div>
	</div>
</section>

<style lang="scss">
	.title {
		font-size: max(var(--font-size-600), 2.5cqi);
	}

	.tabs-button {
		box-shadow: unset !important;
	}
</style>
