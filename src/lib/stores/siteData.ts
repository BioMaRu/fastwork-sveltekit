import type { Language } from '@fastwork/sdk'
import { writable } from 'svelte/store'

import * as strapi from '$lib/strapi'

function createSiteDataStore() {
	const { subscribe, set } = writable<Awaited<
		ReturnType<typeof strapi.getFastworkRewardSiteData>
	> | null>(null)

	let currentLanguage: Language | null = null

	async function load(language: Language) {
		// Prevent duplicate loads for same language
		if (language === currentLanguage) return

		currentLanguage = language
		const data = await strapi.getFastworkRewardSiteData({ language })
		set(data)
		return data
	}

	function reset() {
		currentLanguage = null
		set(null)
	}

	return {
		subscribe,
		load,
		reset,
	}
}

export const siteData = createSiteDataStore()
