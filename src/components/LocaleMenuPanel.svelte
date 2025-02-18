<script lang="ts">
	import { LANG_OPTIONS } from '@fastwork/sdk/constant'
	import cookie from 'cookie'

	import { COOKIE_OPTIONS } from '$lib/constants'
	import { locales } from '$lib/i18n'

	function setLocale(selectLocale: string) {
		/** Delete previous lang cookie to cleanup */
		document.cookie = cookie.serialize('lang', selectLocale, {
			expires: new Date(0), // Set expiry to past date to delete cookie
		})

		/** Set new lang cookie */
		document.cookie = cookie.serialize('lang', selectLocale, {
			...COOKIE_OPTIONS,
			httpOnly: false, // lang doesn't have to be httpOnly
			maxAge: 60 * 60 * 24 * 365,
		})

		window.location.reload()
	}
</script>

<div class="menu-panel">
	<div class="lo-12">
		{#each $locales as locale}
			<button
				class="menu-item _dp-f _alit-ct _g-8px _pdh-12px _pdv-8px _bdrd-8px _cs-pt"
				onclick={() => setLocale(locale)}
			>
				<img
					src={LANG_OPTIONS[locale].flag}
					alt={locale}
					width="32"
					style="aspect-ratio:  1 / 1;"
				/>
				<div class="_fs-300">
					{LANG_OPTIONS[locale].label}
				</div>
			</button>
		{/each}
	</div>
</div>

<style lang="scss">
	.menu-panel {
		width: inherit;
		max-width: inherit;
		padding: 8px;
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
