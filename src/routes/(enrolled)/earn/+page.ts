import api from '$lib/api'
import { API } from '$lib/constants'
import type { Api } from '$types'

import type { PageLoad } from './$types'

export const load = (async ({ fetch }) => {
	const res = await api.invoke<Api.missionList>(API.missionList, {}, fetch)
	if (!res.ok) {
		// NOTE: can handle error
	}

	return {
		list: res?.result || [],
	}
}) satisfies PageLoad
