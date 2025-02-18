import { format } from '@fastwork/sdk'
import dayjs from 'dayjs'

import { env } from '$env/dynamic/public'
import { countrySwitcher } from '$lib/switcher'

export function nowToDate(v: string | undefined): string {
	if (!v) {
		return ''
	}

	const now = dayjs()
	return dayjs(now).to(dayjs(v), true)
}

export function nowFromDate(v: string | undefined): string {
	if (!v) {
		return ''
	}

	const now = dayjs()
	return dayjs(now).from(dayjs(v), true)
}

export function upgradeTerms(terms: string): string {
	if (!terms) {
		return ''
	}

	return terms
		.replaceAll(
			'{{serviceName}}',
			`${countrySwitcher({
				vn: 'Fastlance',
				default: 'Fastwork',
			})}`,
		)
		.replaceAll(
			'{{serviceURL}}',
			`${countrySwitcher({
				vn: 'https://rewards.fastlance.vn',
				id: 'https://rewards.fastwork.id',
				default: 'https://rewards.fastwork.co',
			})}`,
		)
		.replaceAll(
			'{{currencyPerPoint}}',
			format.price(env.PUBLIC_POINTS_EARN_RATE, {
				symbol: true,
			}),
		)
}

export function upgradeBlogURL(url: string): string {
	if (!url) {
		return ''
	}

	return url.replaceAll(
		'{{blogURL}}',
		`${countrySwitcher({
			id: 'https://fastwork.id/blog/fastwork-rewards/source=rewards_earn-section_fastwork-reward',
			vn: 'https://blog.fastlance.vn/fastlance-rewards/source=rewards_earn-section_fastwork-reward',
			default:
				'https://fastwork.co/blog/fastwork-rewards/?source=rewards_earn-section_fastwork-reward',
		})}`,
	)
}
