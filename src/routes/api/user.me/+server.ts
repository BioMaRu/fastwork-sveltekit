import { env } from '$env/dynamic/public'
import { ERR_CODE } from '$lib/constants'
import { COOKIE_OPTIONS } from '$lib/constants/index'
import type { Api } from '$types'

import type { RequestHandler } from './$types'

export const POST: RequestHandler = async ({ locals, fetch, cookies }) => {
	try {
		const token = locals.accessToken

		if (!token) {
			return new Response(
				JSON.stringify({
					ok: false,

					// NOTE: force set to return unauthorized error when no token when get user data, so app can handle it
					error: {
						code: ERR_CODE.unauthorized,
						detail: 'No access token',
						unauthorized: true,
					},
				} satisfies Api.BaseResponse),
			)
		}

		const resp = await fetch(`${env.PUBLIC_GRAPHQL_URL}`, {
			method: 'POST',
			body: JSON.stringify({
				query: `query {
                    user {
                        id
                        image
                        created_at
                        display_name
                        email
                        username
                        is_selling
                        banned_at
                        seller_verification_status
                        seller_verified_at
                        seller_profile {
                            first_approved_at
                            last_approved_at
                        }
                    }
                }`,
			}),
			headers: {
				accept: 'application/json',
				'content-type': 'application/json',
				authorization: `bearer ${token}`,
			},
		})

		let res
		try {
			res = await resp.json()
		} catch (err) {
			res = null
		}

		const isOk = Boolean(res && !res.errors)

		if (!isOk) {
			cookies.delete(env.PUBLIC_ACCESS_TOKEN_COOKIE_NAME, COOKIE_OPTIONS)
		}

		return new Response(
			JSON.stringify({
				ok: isOk,
				result: res?.data?.user ?? null,

				...(!isOk
					? {
							error: {
								code: ERR_CODE.unauthorized,
								detail: `Can't get user data`,
								unauthorized: true,
							},
						}
					: {}),
			} satisfies Api.BaseResponse),
			{
				status: resp.status,
			},
		)
	} catch (error) {
		console.error('User.me API error:', error)
		return new Response(
			JSON.stringify({
				ok: false,
				error: { internal: true },
			}),
			{ status: 500 },
		)
	}
}
