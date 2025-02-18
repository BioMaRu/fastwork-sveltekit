import { NAV_MENU } from '$lib/constants'

import type { LayoutLoad } from './$types'
export const load = (async () => {
	return {
		navMenu: NAV_MENU.earn,
	}
}) satisfies LayoutLoad
