import { env } from '$env/dynamic/private'
import type { Api } from '$types'

import type { RequestHandler } from './$types'

export const POST: RequestHandler = async ({ locals, request, fetch }) => {
	try {
		const token = locals.accessToken
		const ct = request.headers.get('content-type') || ''

		// Read request body
		let body
		try {
			body = await request.json()
		} catch (err) {
			return new Response(
				JSON.stringify({
					ok: false,
					error: {
						detail: 'Invalid JSON body',
					},
				}),
				{ status: 200 },
			)
		}

		if (!token) {
			return new Response(
				JSON.stringify({
					ok: false,
					error: {
						unauthorized: true,
						detail: 'No access token',
					},
				}),
				{ status: 200 },
			)
		}

		const resp = await fetch(`${env.API_URL}/api/v4/user/${body.userId}/online-stats`, {
			method: 'PUT',
			duplex: 'half',
			headers: {
				accept: 'application/json',
				'content-type': ct,
				...(token ? { authorization: `bearer ${token}` } : {}),
			},
		} as RequestInit & { duplex: string })

		try {
			if (resp.status !== 200) {
				return new Response(
					JSON.stringify({
						ok: false,
						error: {
							internal: resp.status === 500 || undefined,
							notFound: resp.status === 404 || undefined,
						},
					}),
					{ status: resp.status },
				)
			}

			return new Response(
				JSON.stringify({
					ok: true,
					result: null,
				} satisfies Api.BaseResponse),
				{ status: resp.status },
			)
		} finally {
			// Cleanup response body
			if (resp.body?.cancel) {
				resp.body.cancel()
			}
		}
	} catch (error) {
		console.error('User online API error:', error)
		return new Response(
			JSON.stringify({
				ok: false,
				error: { internal: true },
			}),
			{ status: 500 },
		)
	}
}
