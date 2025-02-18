import { loadTranslations } from '$lib/i18n'

import type { LayoutLoad } from './$types'

export const load = (async ({ url, data }) => {
	const { pathname } = url

	const initLocale = data.preferredLang || 'th'

	await loadTranslations(initLocale, pathname)

	return {
		...data,
	}
}) satisfies LayoutLoad
