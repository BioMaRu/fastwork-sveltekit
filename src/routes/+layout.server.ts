import type { Language } from '@fastwork/sdk'
import { redirect } from '@sveltejs/kit'

import { env } from '$env/dynamic/public'
import api from '$lib/api'
import { API, EXTERNAL_LINK } from '$lib/constants'
import type { Api } from '$types'

import type { LayoutServerLoad } from './$types'

/**
 *  check authentication and get site data from strapi
 */
export const load = (async ({ fetch, cookies, locals }) => {
	const preferredLang = (cookies.get('lang') || env.PUBLIC_LANGUAGE || 'th') as Language
	const nonAuthData = {
		me: null,
		preferredLang,
	}

	if (!locals.accessToken) {
		return nonAuthData
	}

	const resMe = await api.invoke<Api.UserMe>(API.userMe, {}, fetch)

	if (!resMe.ok) {
		return nonAuthData
	}

	/** handle ban user */
	{
		const isBanned = Boolean(resMe.result?.banned_at)
		if (isBanned) {
			redirect(302, '/')
		}
	}

	return {
		me: resMe?.result,
		preferredLang,
	}
}) satisfies LayoutServerLoad
