import { redirect } from '@sveltejs/kit'

import api from '$lib/api'
import { API, ROUTE } from '$lib/constants'
import type { Api } from '$types'

import type { LayoutServerLoad } from './$types'

export const load = (async ({ fetch, url, locals }) => {
	if (!locals.accessToken) {
		return {}
	}

	const res = await api.invoke<Api.PointGetByUser>(API.pointGetByUser, {}, fetch)

	/* if user have enrolled for point */
	if (res?.ok) {
		const queryString = url.searchParams.toString()
		const targetURL = queryString ? `${ROUTE.earn}?${queryString}` : ROUTE.earn

		redirect(302, targetURL)
	}

	return {}
}) satisfies LayoutServerLoad
