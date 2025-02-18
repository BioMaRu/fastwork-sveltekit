import api from '$lib/api'
import { API } from '$lib/constants'
import type { Api } from '$types'

import type { PageLoad } from './$types'

export const load = (async ({ fetch, url }) => {
	const perPage = 10
	const page = Number(url.searchParams.get('page')) || 1

	const res = await api.invoke<Api.pointListBurnHistory>(
		API.pointListBurnHistory,
		{
			page: page,
			page_size: perPage,
		},
		fetch,
	)

	if (!res.ok) {
		// TODO: can handle error
	}

	return {
		list: res?.result || [],
		paginate: res?.paginate,
	}
}) satisfies PageLoad
