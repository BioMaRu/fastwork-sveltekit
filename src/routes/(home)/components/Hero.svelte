<script lang="ts">
	import { page } from '$app/state'
	import elementLeft from '$lib/assets/images/element-left.svg'
	import elementRight from '$lib/assets/images/element-right.svg'
	import heroBg from '$lib/assets/images/hero-bg.svg'
	import shine from '$lib/assets/images/shine.svg'
	import { getAuthURL } from '$lib/auth'
	import { t } from '$lib/i18n'
</script>

<section class="hero-banner _pst-rlt _zid-1">
	<div class="decal">
		<img src={elementLeft} class="left" alt="Left" />
		<img src={heroBg} class="center" alt="Center" />
		<img src={elementRight} class="right" alt="Right" />
	</div>

	<div class="_dp-f _jtfct-ct _alit-ct _pst-rlt _h-100pct">
		<div class="lo-12 _jtfit-ct">
			<dotlottie-player
				autoplay
				speed="1.0"
				loop
				mode="normal"
				src="/dotLottie/human-reward.lottie"
				class="hero-image"
			></dotlottie-player>

			<h1 class="lo-12 _gg-8px _tal-ct _fw-500 _fs-900-md _fs-300 _ffml-secondary">
				<div class="_dp-f _alit-fe _jtfct-ct">
					<div class="_cl-primary">
						{@html $t('home.hero.title-line1')}
					</div>
					<img src={shine} class="shine" alt="Decoration" />
				</div>
				<div>{$t('home.hero.title-line2')}</div>
			</h1>

			<div class="_mgt-32px-md _mgt-16px _dp-f _gg-16px">
				{#if !page.data.me}
					<a
						href={getAuthURL(page.url)}
						class="trb-button is-pill is-size-large _pdh-32px"
						style="background: var(--color-grad-cta);"
						data-selenium="first-landing.top-section.login"
					>
						{$t('layout.button-label.login')}
					</a>
				{:else}
					<!--
						NOTE: This case is for logged-in users who are not redirected by 'layout' to the /earn page due to an edge case from
						if user still not join reward program yet.
					 -->
					<button
						onclick={() => window.location.reload()}
						class="trb-button is-pill is-size-large _pdh-32px"
						style="background: var(--color-grad-cta);"
						data-selenium="first-landing.top-section.register"
					>
						{$t('layout.button-label.start-earning')}
					</button>
				{/if}
			</div>
		</div>
	</div>
</section>

<style lang="scss">
	.hero-image {
		width: 200px;
		height: 200px;
	}

	.decal {
		position: absolute;
		top: 0;
		bottom: 0;
		display: flex;
		gap: 16px;
		justify-content: space-between;
		align-items: center;
		width: 100%;

		.center {
			flex: 1;
			min-width: 1px;
			max-height: 400px;

			// aspect-ratio: 1332 / 400;
		}

		.left {
			width: 250px;
		}

		.right {
			width: 250px;
		}
	}

	.hero-banner {
		position: relative;
		height: 600px;
		background: var(--color-white);
	}

	.shine {
		width: 30px;
		aspect-ratio: 30 / 59;
	}

	@media only screen and (width <= 1023px) {
		.hero-banner {
			height: 300px;
		}

		.hero-image {
			width: 120px;
			height: 120px;
		}

		.decal {
			gap: 0;

			.left {
				z-index: 1;
				width: 50px;
				transform: translateY(-30%);
			}

			.right {
				z-index: 1;
				width: 50px;
				transform: translateY(30%);
			}

			.center {
				z-index: 0;
				transform: scale(1.5) translateY(-20%);
			}
		}

		.shine {
			width: 15px;
		}
	}
</style>
