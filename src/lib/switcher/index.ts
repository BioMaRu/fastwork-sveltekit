import { env } from '$env/dynamic/public'
import type { Env } from '$types'

type LanguageSwitcher<T> = {
	[K in Env['Language']]?: T
} & {
	default?: T
}

type CountrySwitcher<T> = {
	[K in Env['Country']]?: T
} & {
	default?: T
}

export const languageSwitcher = <T>(_case: LanguageSwitcher<T>) => {
	const v = _case?.[env.PUBLIC_LANGUAGE as Env['Language']]

	if (v !== undefined) {
		return v
	}

	return _case?.default
}

export const countrySwitcher = <T>(_case: CountrySwitcher<T>) => {
	const v = _case?.[env.PUBLIC_COUNTRY as Env['Country']]

	if (v !== undefined) {
		return v
	}

	return _case?.default
}

export function isCountry(country: Env['Country']) {
	return country === env.PUBLIC_COUNTRY
}

export function isLanguage(country: Env['Language']) {
	return country === env.PUBLIC_LANGUAGE
}
