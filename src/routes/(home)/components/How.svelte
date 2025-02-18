<script lang="ts">
	import { onDestroy, onMount } from 'svelte'

	import { t } from '$lib/i18n'
	let rivInstances = $state<Window['rive']['RiveInstance'][]>([])

	let items = $derived([
		{
			title: $t('home.how.point1.title'),
			description: $t('home.how.point1.description'),
			background: `/images/home/how-earn-bg.svg`,
			rive: '/rive/how-earn.riv',
			artboard: 'how-earn',
			width: '55%',
		},
		{
			title: $t('home.how.point2.title'),
			description: $t('home.how.point2.description'),
			background: `/images/home/how-reward-bg.svg`,
			rive: '/rive/how-reward.riv',
			artboard: 'how-reward',
			width: '60%',
		},
	])

	onMount(async () => {
		rivInstances = items.map((item, idx) => {
			const r = new window.rive.Rive({
				src: item.rive,
				canvas: document.getElementById(`canvas-${idx + 1}`) as HTMLCanvasElement,
				autoplay: true,
				artboard: item.artboard,
				stateMachines: 'idle',
				onLoad: () => {
					r.resizeDrawingSurfaceToCanvas()
				},
			})

			return r
		})
	})

	onDestroy(() => {
		rivInstances.forEach((r) => r?.cleanup())
	})
</script>

<section>
	<div class="title-container _bgcl-primary-100 _pdt-128px-md _pdt-64px _mgt-24px">
		<div>
			<h2 class="_fs-800-md _fs-600">{$t('home.how.title')}</h2>
			<p class="_mgt-12px _fs-400-md _fs-300">
				{$t('home.how.description')}
			</p>
		</div>
	</div>

	<div
		class="lo-container _jtfit-ct _bgcl-primary-100 _pdt-64px-md _pdt-32px _pdbt-64px-md _pdbt-64px"
	>
		<div class="lo-6-md lo-12 _gg-32px" style="max-width: 1000px;">
			{#each items as item, idx}
				<div class="_dp-f _fdrt-cl _alit-ct _bdrd-12px _ovf-hd">
					<div class="_pst-rlt _w-100pct">
						<img
							src={item.background}
							alt={item.title}
							loading="lazy"
							class="how-background"
						/>
						<canvas
							id={`canvas-${idx + 1}`}
							height="auto"
							class="how-canvas"
							style="width: {item.width}; aspect-ratio: 1 / 1"
						>
						</canvas>
					</div>

					<div class="_f-1 _w-100pct _tal-ct _bgcl-white _pdh-32px _pdbt-32px">
						<div class="top-space-holder"></div>
						<h3 class="_fs-700-md _fs-500">{item.title}</h3>
						<p class="_mgt-32px-md _mgt-16px _fs-300">
							{item.description}
						</p>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>

<style lang="scss">
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

	.top-space-holder {
		width: 25%;
		margin-bottom: 48px;
		aspect-ratio: 496 / 280;
	}

	.how-background {
		width: 100%;
		height: auto;
		aspect-ratio: 496 / 280;
	}

	.how-canvas {
		position: absolute;
		right: 0;
		bottom: 0;
		left: 0;
		height: auto;
		margin: 0 auto;
		transform: translateY(20%);
	}

	@media only screen and (width <= 1023px) {
		.title-container {
			border-radius: 100% 100% 0 0 / 100% 100% 0% 00%;
		}
	}
</style>
