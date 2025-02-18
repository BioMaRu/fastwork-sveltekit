import { env } from '$env/dynamic/public'
import { COOKIE_OPTIONS } from '$lib/constants'
import type { Api } from '$types'

import type { RequestHandler } from './$types'

export const POST: RequestHandler = async ({ locals, cookies, request }) => {
	try {
		// Ensure request body is consumed even if we don't use it
		try {
			await request.json()
		} catch {
			// Ignore parsing errors since we don't use the body
		}

		if (!locals.accessToken) {
			return new Response(
				JSON.stringify({
					ok: false,
					error: {
						detail: 'Already signed out',
					},
				} satisfies Api.BaseResponse),
				{ status: 200 },
			)
		}

		// Store token before deletion for response
		const token = locals.accessToken

		// Delete the cookie
		cookies.delete(env.PUBLIC_ACCESS_TOKEN_COOKIE_NAME, {
			...COOKIE_OPTIONS,
		})

		return new Response(
			JSON.stringify({
				ok: true,
				result: {
					token,
				},
			} satisfies Api.BaseResponse),
			{ status: 200 },
		)
	} catch (error) {
		console.error('Sign out API error:', error)
		return new Response(
			JSON.stringify({
				ok: false,
				error: { internal: true },
			} satisfies Api.BaseResponse),
			{ status: 500 },
		)
	}
}
