<script lang="ts">
	import { page } from '$app/state'
	import { Footer, Navbar, PointHero, Question, Terms } from '$components'
	import { NAV_MENU, ROUTE } from '$lib/constants'
	import { t } from '$lib/i18n'

	interface Props {
		children?: import('svelte').Snippet
	}

	let { children }: Props = $props()
</script>

<Navbar />

<main>
	<PointHero />

	<div class="title-container _bgcl-primary-100 _pdt-32px">
		<div>
			<div>
				<div class="trb-tab-menu is-variant-underline">
					<a
						href={ROUTE.earn}
						class="tab-button"
						class:is-active={page.data.navMenu === NAV_MENU.earn}
						data-selenium="global.tab-menu.earn-point"
					>
						{$t('layout.tab.earn')}
					</a>
					<a
						href={ROUTE.reward}
						class="tab-button"
						class:is-active={page.data.navMenu === NAV_MENU.reward}
						data-selenium="global.tab-menu.get-reward"
					>
						{$t('layout.tab.reward')}
					</a>
					<a
						href={ROUTE.pointHistory}
						class="tab-button"
						class:is-active={page.data.navMenu === NAV_MENU.history}
						data-selenium="global.tab-menu.history"
					>
						{$t('layout.tab.point-history')}
					</a>
				</div>
			</div>
		</div>
	</div>

	{@render children?.()}

	<Question />
	<Terms />
</main>

<Footer />

<style lang="scss">
	main {
		min-height: calc(100vh - var(--navbar-height));
	}

	.title-container {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 135px;
		padding: 0 16px;
		border-radius: 50% / 100%;
		border-bottom-right-radius: 0;
		border-bottom-left-radius: 0;
		text-align: center;
	}

	@media only screen and (width <= 1023px) {
		.title-container {
			border-radius: 100% 100% 0 0 / 100% 100% 0% 00%;
		}
	}
</style>
