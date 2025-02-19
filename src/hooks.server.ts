import type { Handle } from '@sveltejs/kit'
import { sequence } from '@sveltejs/kit/hooks'
import cookie from 'cookie'

import { env } from '$env/dynamic/public'
import { getAuthURL } from '$lib/auth'
import { AUTH_PROTECTED_ROUTES, COOKIE_OPTIONS } from '$lib/constants'

function shouldRedirectToAuth(path: string): boolean {
	return AUTH_PROTECTED_ROUTES.includes(path)
}

/**
 * Checks if the given path should redirect to authentication
 */
const handleAuth = (async ({ event, resolve }) => {
	const { request, locals, url } = event

	/* handle cookie in request header */
	{
		/* get access token from cookie */
		const cookieHeader = request.headers.get('cookie')

		/* Only parse cookies if header exists */
		locals.accessToken = cookieHeader
			? cookie.parse(cookieHeader)?.[env.PUBLIC_ACCESS_TOKEN_COOKIE_NAME]
			: undefined

		if (shouldRedirectToAuth(url.pathname)) {
			const redirectURL = url

			if (!locals.accessToken) {
				return Response.redirect(getAuthURL(redirectURL), 302)
			}
		}
	}

	/* get response */
	const response = await resolve(event)

	/*  handle if has init token in url params then set cookie */
	{
		const initToken = url.searchParams.get('token')
		if (initToken) {
			locals.accessToken = initToken
			response.headers.set(
				'set-cookie',
				cookie.serialize(env.PUBLIC_ACCESS_TOKEN_COOKIE_NAME, initToken, {
					...COOKIE_OPTIONS,
					maxAge: 60 * 60 * 24 * 7,
				}),
			)
		}
	}

	/* return to render response */
	return response
}) satisfies Handle

export const handle = sequence(handleAuth)
