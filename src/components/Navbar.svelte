<script lang="ts">
	import { IMAGE_URL, LANG_OPTIONS } from '@fastwork/sdk/constant'
	import { cubicInOut } from 'svelte/easing'

	import { page } from '$app/state'
	import { LocaleMenuPanel } from '$components'
	import { FEATURE_FLAG } from '$lib/constants'
	import { locale } from '$lib/i18n'
	import { countrySwitcher } from '$lib/switcher'
	import clickAway from '$lib/use-action/clickAway'

	let showMenu = $state(false)
	let showLocaleMenu = $state(false)

	const logoURL = countrySwitcher({
		vn: IMAGE_URL.fastlanceRewardsLogo.default.svg,
		default: IMAGE_URL.fastworkRewardsLogo.default.svg,
	})

	const menuTransition = (_: Element) => {
		return {
			css: (t: number) => {
				const eased = cubicInOut(t)
				return `
                    transform: translateY(${12 * eased - 12}px);
                    opacity: ${eased};
                `
			},
			duration: 160,
		}
	}
</script>

<nav>
	<div class="_pdh-16px _w-100pct _h-100pct _dp-f _jtfct-spbtw _alit-ct">
		<a href="/">
			<img src={logoURL} alt="Rewards Logo" height="46" style="aspect-ratio: 124 / 46" />
		</a>

		<div class="u-halign-center u-valign-center _gg-24px">
			{#if FEATURE_FLAG.enableGlobalization}
				<button
					onclick={() => (showLocaleMenu = !showLocaleMenu)}
					class="trb-button menu-button _pdh-12px"
				>
					<img
						src={LANG_OPTIONS[$locale].flag}
						alt={$locale}
						width="32"
						style="aspect-ratio:  1 / 1;"
					/>
				</button>
			{/if}

			{#if page.data.me}
				<button
					onclick={() => (showMenu = !showMenu)}
					class="trb-button is-variant-secondary menu-button _bdw-1px _bdcl-neutral-200 _dp-f _alit-ct _gg-8px _cs-pt _cl-primary-500"
				>
					<div class="_fw-500 _fs-400 _ffml-secondary _dp-f _alit-ct">
						<i class="fa-regular fa-bars _fs-500 _w-32px"></i>
					</div>
					<img
						src={page.data.me.image}
						alt={'Me'}
						class="_w-32px _h-32px _bdrd-max _ojpst-ct"
					/>
				</button>
			{/if}
		</div>
	</div>
</nav>

{#if showLocaleMenu}
	<div
		transition:menuTransition
		class="locale-menu"
		style="
            right: {page.data.me ? '100px' : '16px'}
        "
		use:clickAway
		onclick-away={() => (showLocaleMenu = false)}
	>
		<LocaleMenuPanel on:click-menu={() => (showLocaleMenu = false)} />
	</div>
{/if}

<style lang="scss">
	nav {
		height: var(--navbar-height);
		background: var(--color-white-100);
	}

	.menu-button {
		padding: 6px 16px 6px 8px;
		border-radius: 6px;
		background: white;
		cursor: pointer;
		transition: all 0.12s ease-in-out;

		&:hover {
			background: var(--color-neutral-100);
		}
	}

	.locale-menu {
		position: absolute;
		top: calc(var(--navbar-height) - 8px);
		z-index: 2;
		width: 100%;
		max-width: 160px;
	}
</style>
