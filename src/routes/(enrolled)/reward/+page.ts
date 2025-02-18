import api from '$lib/api'
import { API } from '$lib/constants'
import type { Api } from '$types'

import type { PageLoad } from './$types'

export const load = (async ({ fetch }) => {
	const res = await api.invoke<Api.rewardList>(API.rewardList, {}, fetch)
	if (!res.ok) {
		// NOTE: can handle error
	}

	return {
		list: res?.result || [],
	}
}) satisfies PageLoad
