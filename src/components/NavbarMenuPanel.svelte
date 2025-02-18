<script lang="ts">
	import { page } from '$app/state'
	import api from '$lib/api'
	import { AUTH_CONFIG } from '$lib/constants'
	import { API, ROUTE } from '$lib/constants'
	import { t } from '$lib/i18n'
	import swal from '$lib/swal'
	import toast from '$lib/toast'
	import type { Api } from '$types'

	type Props = {
		onClickMenu: () => void
	}

	let { onClickMenu }: Props = $props()

	const menus = [
		{
			href: ROUTE.earn,
			label: $t('layout.menu.earn'),
			iconClass: 'fa-light fa-circle-star _fs-700',
			dataSelenium: 'global.profile-bar.earn-point',
		},
		{
			href: ROUTE.reward,
			label: $t('layout.menu.reward'),
			iconClass: 'fa-light fa-gift _fs-700',
			dataSelenium: 'global.profile-bar.get-reward',
		},
		{
			href: ROUTE.pointHistory,
			label: $t('layout.menu.point-history'),
			iconClass: 'fa-light fa-clock-rotate-left _fs-700',
			dataSelenium: 'global.profile-bar.history',
		},
	] as const

	async function logout() {
		const response = await swal.confirm({
			title: $t('layout.alert.logout-confirm.title'),
			text: $t('layout.alert.logout-confirm.text'),
			yesLabel: $t('layout.alert.logout-confirm.confirm-label'),
		})

		if (!response.isConfirmed) {
			return
		}

		api.invoke<Api.AuthSignOut>(API.authSignOut, {}, fetch)
			.then((res) => {
				if (!res.ok) {
					toast.error($t('layout.toast.logout-failed'))
					return
				}

				const url = new URL(AUTH_CONFIG.signOutURL)
				url.searchParams.set('access_token', `${res?.result?.token}`)
				url.searchParams.set('redirect', page.url.origin)

				window.location.href = url.href
			})
			.catch((err) => {
				toast.error(err.message)
			})
	}
</script>

<div class="navbar-menu-panel">
	<div class="u-valign-center _gg-12px">
		<div>
			<img
				src={page.data.me?.image}
				alt={page.data.me?.display_name}
				class="_w-48px _h-48px _bdrd-max _ojpst-ct _bdw-1px _bdcl-neutral-200"
			/>
		</div>
		<div class="lo-12 _gg-4px">
			<div class="_fw-600 _fs-300">{page.data.me?.display_name}</div>
			<div class="_fs-200 _cl-text-default-200">
				{page.data.me?.email}
			</div>
		</div>
	</div>

	<hr class="_mgt-16px" />

	<div class="lo-12 _mgt-12px">
		{#if page.data.point?.user_id}
			{#each menus as menu}
				<a
					onclick={onClickMenu}
					href={menu.href}
					class="menu-item _dp-f _alit-ct _gg-24px _pdh-12px _bdrd-8px _cs-pt"
					data-selenium={menu.dataSelenium}
					style="min-height: 50px;"
				>
					<div class="_w-24px _h-24px u-align-middle">
						<i class={menu.iconClass}></i>
					</div>
					<div class="_ffml-secondary">{menu.label}</div>
				</a>
			{/each}

			<hr class="_mgv-8px" />
		{/if}

		<button
			onclick={() => {
				onClickMenu()
				logout()
			}}
			class="menu-item _dp-f _alit-ct _gg-24px _pdh-12px _bdrd-8px _cs-pt"
			style="min-height: 50px;"
			data-selenium="global.profile-bar.logout"
		>
			<div class="_w-24px _h-24px u-align-middle">
				<i class="fa-light fa-right-from-bracket _fs-700"></i>
			</div>
			<div class="_ffml-secondary">{$t('layout.button-label.logout')}</div>
		</button>
	</div>
</div>

<style lang="scss">
	.navbar-menu-panel {
		width: inherit;
		max-width: inherit;
		padding: 24px;
		border: 1px solid var(--color-neutral-200);
		border-radius: 8px;
		background-color: var(--color-white-100);
		box-shadow: var(--bsd-300);
	}

	.menu-item {
		border: none;
		background: transparent;
		transition: all 0.12s ease-in-out;

		&:hover {
			background-color: var(--color-neutral-100);
		}
	}
</style>
