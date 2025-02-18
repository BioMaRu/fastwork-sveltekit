import type { Language } from '@fastwork/sdk'
import type { Config } from 'sveltekit-i18n'
import i18n from 'sveltekit-i18n'

function getLocalConfig(l: Language) {
	return [
		{
			locale: l,
			key: 'layout',
			loader: async () => (await import(`./locales/${l}/layout.json`)).default,
		},
		{
			locale: l,
			key: 'home',
			path: ['/'],
			loader: async () => (await import(`./locales/${l}/home.json`)).default,
		},
		{
			locale: l,
			key: 'earn',
			path: ['/earn'],
			loader: async () => (await import(`./locales/${l}/earn.json`)).default,
		},
		{
			locale: l,
			key: 'reward',
			path: ['/reward'],
			loader: async () => (await import(`./locales/${l}/reward.json`)).default,
		},
		{
			locale: l,
			key: 'point-history',
			path: ['/point-history'],
			loader: async () => (await import(`./locales/${l}/point-history.json`)).default,
		},
	]
}

/** @type {import('sveltekit-i18n').Config} */
const config: Config<{
	country?: string
	value?: string
	value2?: string
}> = {
	loaders: [
		...getLocalConfig('en'),
		...(env.PUBLIC_COUNTRY === 'th' ? getLocalConfig('th') : []),
		...(env.PUBLIC_COUNTRY === 'id' ? getLocalConfig('id') : []),
		...(env.PUBLIC_COUNTRY === 'vn' ? getLocalConfig('vi') : []),
	],
}
import { derived } from 'svelte/store'

import { env } from '$env/dynamic/public'
const { t: _t, locale, locales, loading, loadTranslations } = new i18n(config)
const t = derived(
	_t,
	($_t) => (key: string, params: any) => $_t(key, { country: env.PUBLIC_COUNTRY, ...params }),
) as typeof _t

export { loading, loadTranslations, locale, locales, t }
