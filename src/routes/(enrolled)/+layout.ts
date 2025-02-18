import { redirect } from '@sveltejs/kit'

import api from '$lib/api'
import { API, ROUTE } from '$lib/constants'
import type { Api } from '$types'

import type { LayoutLoad } from './$types'

export const load = (async ({ fetch }) => {
	const res = await api.invoke<Api.PointGetByUser>(API.pointGetByUser, {}, fetch)

	/* if user is not enrolled for point */
	if (!res?.ok) {
		redirect(302, ROUTE.home)
	}

	return {
		point: res?.result,
	}
}) satisfies LayoutLoad
