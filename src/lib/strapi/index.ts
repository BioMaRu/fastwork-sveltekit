import type { StrapiLocale, StrapiOptions } from 'strapi-sdk-js'
import type { StrapiResponse } from 'strapi-sdk-js'
import Strapi from 'strapi-sdk-js'

import { env } from '$env/dynamic/public'
import type { StrapiImageShape, StrapiSiteDataShape } from '$types'

const STRAPI_LOCALE_MAP: Record<string, StrapiLocale> = {
	th: 'th-TH',
	id: 'id-ID',
	vi: 'vi-VN',
	en: 'en',
}

const strapi = new Strapi({
	url: env.PUBLIC_STRAPI_URL,
	prefix: '/api',
	store: {
		key: 'strapi_jwt',
		useLocalStorage: false,
		cookieOptions: { path: '/' },
	},
	axiosOptions: {
		headers: { Authorization: `Bearer ${env.PUBLIC_STRAPI_ACCESS_TOKEN}` },
	},
} satisfies StrapiOptions)

export async function getFastworkRewardSiteData(options?: {
	language?: StrapiLocale
}): Promise<StrapiResponse<StrapiSiteDataShape> | undefined> {
	try {
		return await strapi.find<StrapiSiteDataShape>('fastwork-reward', {
			populate: '*',
			publicationState: 'live',
			locale: STRAPI_LOCALE_MAP[options?.language || (env.PUBLIC_LOCALE as StrapiLocale)],
		})
	} catch (err) {
		return
	}
}

export function imageUrl(strapiImage: StrapiImageShape | undefined): string {
	if (!strapiImage?.data?.attributes?.url) {
		return ''
	}

	return `${env.PUBLIC_STRAPI_URL}${strapiImage?.data?.attributes?.url}`
}
