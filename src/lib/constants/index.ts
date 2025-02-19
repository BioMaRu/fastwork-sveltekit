// TODO: split to separated file and re-export here if needs

import type { CookieSerializeOptions } from 'cookie'

import { dev } from '$app/environment'
import { env } from '$env/dynamic/public'
import { countrySwitcher } from '$lib/switcher'

export const ROUTE = {
	home: '/',
}

export const AUTH_PROTECTED_ROUTES = [
	// eg. ROUTE.home,
]

export const API = {
	userMe: 'user.me',
} as const

export const ERR_CODE = {
	unauthorized: 'UNAUTHORIZED',
	schemaValidationFailed: 'SCHEMA_VALIDATION_FAILED',
} as const

export const EXTERNAL_LINK = {
	//eg. startSelling: `${env.PUBLIC_V4_URL}/start-selling`,
}

export const FEATURE_FLAG = {
	enableTracking: !dev,
	enableGlobalization: env.PUBLIC_ENABLE_GLOBALIZATION?.toLowerCase() === 'true',
}

export const PAGE_TITLE_POSTFIX = countrySwitcher({
	vn: ' | Fastlance Rewards',
	default: ' | Fastwork Rewards',
})

export const COOKIE_OPTIONS = {
	httpOnly: false, // NOTE: v4, chat, seller-center, job-board cant handle httpOnly coolies yet
	sameSite: 'lax',
	path: '/',
	domain: env.PUBLIC_COOKIE_DOMAIN,
	secure: !dev,
} satisfies CookieSerializeOptions

export const AUTH_CONFIG = {
	authorizeURL: `${env.PUBLIC_AUTH_2_URL}/oauth/authorize`,
	signOutURL: `${env.PUBLIC_AUTH_2_URL}/oauth/signout-device`,
	callbackURL: `${env.PUBLIC_HOSTNAME}/callback`,
	clientId: env.PUBLIC_AUTH_2_CLIENT_ID,
}
