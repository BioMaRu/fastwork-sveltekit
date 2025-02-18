import { env } from '$env/dynamic/private'
import { env as publicEnv } from '$env/dynamic/public'
import { COOKIE_OPTIONS, ERR_CODE } from '$lib/constants'
import type { Api } from '$types'

import type { RequestHandler } from './$types'

type RewardServiceResponseShape = {
	data?: unknown
	errors?: {
		code?: (typeof ERR_CODE)[keyof typeof ERR_CODE]
		detail?: string | object
	}
	meta?: {
		current_page: number
		page_size: number
		total_count: number
		total_pages: number
	}
}

export const POST: RequestHandler = async ({ locals, params, request, fetch, cookies }) => {
	try {
		const token = locals.accessToken
		const fn = params.fn
		const ct = request.headers.get('content-type') || ''

		const resp = await fetch(`${env.API_REWARD_URL}/api/${fn}`, {
			method: 'POST',
			body: request.body,
			duplex: 'half',
			headers: {
				accept: 'application/json',
				locale: cookies.get('lang') || publicEnv.PUBLIC_LANGUAGE,
				'content-type': ct,
				...(token ? { authorization: `bearer ${token}` } : {}),
			},
		} as RequestInit & { duplex: string })

		/* reward api always return status 200, 404 and 500 */
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

		const res: RewardServiceResponseShape = await resp.json()
		const isOk = Boolean(!res?.errors)

		if (res?.errors?.code === ERR_CODE.unauthorized) {
			cookies.delete(publicEnv.PUBLIC_ACCESS_TOKEN_COOKIE_NAME, COOKIE_OPTIONS)
		}

		return new Response(
			JSON.stringify({
				ok: isOk,
				result: res?.data,
				...(res?.meta
					? {
							paginate: {
								page: res?.meta?.current_page ?? 1,
								perPage: res?.meta?.page_size ?? 1,
								count: res?.meta?.total_count ?? 0,
								totalPage: res?.meta?.total_pages ?? 1,
							},
						}
					: {}),
				...(!isOk
					? {
							error: {
								...res?.errors,
								validation:
									res?.errors?.code === ERR_CODE.schemaValidationFailed
										? true
										: undefined,
								unauthorized:
									res?.errors?.code === ERR_CODE.unauthorized ? true : undefined,
							},
						}
					: {}),
			} satisfies Api.BaseResponse),
			{
				status: resp.status,
			},
		)
	} catch (error) {
		// Handle any errors and ensure cleanup
		console.error('Proxy API error:', error)
		return new Response(
			JSON.stringify({
				ok: false,
				error: { internal: true },
			}),
			{ status: 500 },
		)
	}
}
