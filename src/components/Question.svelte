<script lang="ts">
	import { format } from '@fastwork/sdk'

	import { env } from '$env/dynamic/public'
	import { t } from '$lib/i18n'

	let items = $derived.by(() => {
		const country = env.PUBLIC_COUNTRY as keyof typeof format.config.COUNTRY_FORMATTER_OPTIONS

		return [
			{
				q: $t('home.faq.q1'),
				a: [$t('home.faq.a1.item1')],
			},
			{
				q: $t('home.faq.q2'),
				a: [
					$t('home.faq.a2.item1'),
					$t('home.faq.a2.item2', {
						value: `${format.price(Number(env.PUBLIC_POINTS_EARN_RATE))} ${format.config.COUNTRY_FORMATTER_OPTIONS[country].code}`,
					}),
				],
			},
			{
				q: $t('home.faq.q3'),
				a: [$t('home.faq.a3.item1')],
			},
			{
				q: $t('home.faq.q4'),
				a: [$t('home.faq.a4.item1'), $t('home.faq.a4.item2')],
			},
		]
	})
</script>

<section>
	<div class="lo-12 _gg-32px-md _ff-12px">
		<div class="_bgcl-primary-100">
			<div class="title-container _bgcl-white-100 _pdt-32px-md _pdt-12px">
				<div class="_f-1 _dp-f _fdrt-cl _alit-ct">
					<h2 class="_fw-500 _tal-l _fs-700-md _fs-600">{$t('home.faq.title')}</h2>
					<div class="_h-2px _w-64px _bgcl-primary-500 _mgt-24px"></div>
				</div>
			</div>
		</div>
		<div class="lo-container _pdbt-64px-md _pdbt-32px">
			<div class="_dp-f _jtfct-ct _mgt-24px-md _mgt-12px">
				<div class="trb-accordion-group is-variant-dividing _w-100pct">
					{#each items as item, idx}
						<div class="trb-accordion has-chevron">
							<input id={`faq.${idx}`} name="faq" type="checkbox" />
							<label for={`faq.${idx}`}>
								<div class="trb-accordion-toggle _pdv-24px">
									<div class="lo-12 _gg-4px">
										<div class="_ffml-secondary _fs-600-md _fs-300 _fw-500">
											{item.q}
										</div>
									</div>
								</div>
							</label>
							<div class="trb-accordion-content">
								<ul class="_lst-d _pdl-32px _pdbt-24px _pdt-16px">
									{#each item.a as a}
										<li>
											<p class="_fs-400-md _fs-200 _wsp-pw">
												{@html a}
											</p>
										</li>
									{/each}
								</ul>
							</div>
						</div>
					{/each}
				</div>
			</div>
		</div>
	</div>
</section>

<style lang="scss">
	.trb-accordion-group.is-variant-dividing .trb-accordion.has-chevron > label::after {
		top: 50%;
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
