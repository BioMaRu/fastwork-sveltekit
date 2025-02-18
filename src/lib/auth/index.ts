import { AUTH_CONFIG } from '$lib/constants'

export function getAuthURL(
	url: Partial<{
		href: string
		host: string
		protocol: string
	}>,
): string {
	const { authorizeURL, clientId, callbackURL: basecallbackURL } = AUTH_CONFIG
	const redirectPath = `${url.href}`
	const callbackURL = `${basecallbackURL}?redirect=${btoa(encodeURI(redirectPath))}`

	return `${authorizeURL}?client_id=${clientId}&response_type=code&callback_url=${callbackURL}`
}
