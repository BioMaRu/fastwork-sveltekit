<script lang="ts">
	import { format } from '@fastwork/sdk'
	import { IMAGE_URL } from '@fastwork/sdk/constant'
	import { expoOut } from 'svelte/easing'
	import { Tween } from 'svelte/motion'

	import { page } from '$app/state'
	import elementLeft from '$lib/assets/images/element-left.svg'
	import elementRight from '$lib/assets/images/element-right.svg'
	import heroBg from '$lib/assets/images/hero-bg.svg'
	import { t } from '$lib/i18n'

	const tweenedPoints = new Tween(0, {
		duration: 1000,
		easing: expoOut,
	})

	const tweenedPointsValue = new Tween(0, {
		duration: 1000,
		easing: expoOut,
	})

	$effect.pre(() => {
		tweenedPoints.set(page.data.point?.points ?? 0)
		tweenedPointsValue.set(page.data.point?.points_value ?? 0)
	})
</script>

<section class="hero-banner _pst-rlt _zid-1">
	<div class="decal">
		<img src={elementLeft} class="left" alt="left" />
		<img src={heroBg} class="center" alt="center" />
		<img src={elementRight} class="right" alt="right" />
	</div>

	<div class="_pst-rlt _zid-1 _dp-f _jtfct-ct _alit-ct _pst-rlt _h-100pct">
		<div class="lo-12 _jtfit-ct">
			<div class="_tal-ct _fw-500 _fs-600-md _fs-400 _ffml-secondary">
				{$t('layout.your-point')}
			</div>
			<div class="_dp-f _alit-ct _jtfct-ct _gg-8px _mgt-8px">
				<img
					src={IMAGE_URL.rewardPointIcon.svg}
					alt="Points"
					style="aspect-ratio: 1 / 1;"
					class="_w-32px-md _w-24px"
				/>
				<p class="_ffml-secondary">
					<span class="_cl-primary-500 _fw-600 _fs-600 _fs-800-md">
						{format.point(tweenedPoints.current)}
					</span>
				</p>
			</div>
			<div class="_fs-300 _cl-text-default-200 _mgt-4px">
				≈ {format.currency(tweenedPointsValue.current, { unit: true })}
			</div>
			<div class="_fs-300 _cl-text-default-200 _mgt-16px">
				<strong
					>{format.point(page.data.point?.expiring_points || 0)}
					{$t('layout.points')}</strong
				>
				{$t('layout.point-expire', {
					value: format.date(page.data.point?.expiring_points_date),
				})}
			</div>
		</div>
	</div>
</section>

<style lang="scss">
	.hero-banner {
		position: relative;
		height: 220px;
		background: var(--color-white);
	}

	.decal {
		position: absolute;
		inset: 0;
		display: flex;
		gap: 16px;
		justify-content: space-between;
		align-items: center;
		overflow-x: hidden;
		width: 100%;

		.center {
			flex: 1;
			min-width: 1px;
			max-height: 200px;
		}

		.left {
			height: 200px;
		}

		.right {
			height: 200px;
		}
	}

	@media only screen and (width <= 1023px) {
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
				transform: scale(1.2) translateY(5%);
			}
		}
	}
</style>
