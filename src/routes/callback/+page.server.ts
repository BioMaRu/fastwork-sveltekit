import { redirect } from '@sveltejs/kit'

import { env as privateEnv } from '$env/dynamic/private'
import { env } from '$env/dynamic/public'
import { AUTH_CONFIG } from '$lib/constants'
import { COOKIE_OPTIONS } from '$lib/constants'
import { parseJWT } from '$lib/jwt'

import type { PageServerLoad } from './$types'

export const load = (async ({ url, cookies }) => {
	const body = {
		callback_url: AUTH_CONFIG.callbackURL,
		client_id: AUTH_CONFIG.clientId,
		client_secret: privateEnv.AUTH_2_CLIENT_SECRET,
		authorization_code: `${url.searchParams.get('code')}`,
	}

	const resp = await fetch(`${privateEnv.API_URL}/auth/v2/oauth.getToken`, {
		method: 'POST',
		body: JSON.stringify(body),
		headers: {
			accept: 'application/json',
			'content-type': 'application/json',
		},
	})
	const { data: res } = await resp.json()

	if (!res?.access_token) {
		redirect(302, '/')
	}

	const userJwt = parseJWT(res?.access_token)

	cookies.set(env.PUBLIC_ACCESS_TOKEN_COOKIE_NAME, res?.access_token, {
		...COOKIE_OPTIONS,
		expires: new Date(userJwt.exp * 1000),
	})

	const redirectURL = atob(`${url.searchParams.get('redirect')}`)

	redirect(302, redirectURL ?? '/')
}) satisfies PageServerLoad
