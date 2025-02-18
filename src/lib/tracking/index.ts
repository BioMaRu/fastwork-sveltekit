import { browser, dev } from '$app/environment'
import { FEATURE_FLAG } from '$lib/constants'

type TrackEventPayload = Record<string, any>

function tracker(payload: TrackEventPayload) {
	if (!FEATURE_FLAG.enableTracking) {
		console.error('[TRACKING]: Tracking feature is disabled', payload)
		return
	}

	if (!browser) {
		console.error('[TRACKING]: Not browser')
		return
	}

	if (!window.dataLayer) {
		console.error('[TRACKING]: No dataLayer init')
		return
	}

	window.dataLayer?.push(payload)
}

export function trackPageView() {
	tracker({
		event: 'virtualPageView',
	})
}

export function trackSetUser(payload: {
	id?: string
	isSelling?: boolean
	sellerVerificationStatus?: number
}) {
	tracker({
		event: 'setUser',
		user: {
			isLoggedIn: true,
			user_id: payload.id,
			is_selling: payload.isSelling,
			seller_verification_status: payload.sellerVerificationStatus,
		},
	})
}

export function trackClearUser() {
	tracker({
		event: 'setUser',
		user: {
			isLoggedIn: false,
		},
	})
}

export function trackECommercePromotionClick(payload: {
	id?: string
	title?: string
	creative?: string // image url
	position?: number
}) {
	tracker({
		event: 'promotionClick',
		ecommerce: {
			promoClick: {
				promotions: [
					{
						id: payload.id,
						name: payload.title,
						creative: payload.creative,
						position: payload.position,
					},
				],
			},
		},
	})
}

export function trackApplyFilter(payload: { filter_name: string; type: string }) {
	tracker({ event: 'applyFilter', payload })
}
