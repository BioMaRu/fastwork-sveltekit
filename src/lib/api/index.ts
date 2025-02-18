import { redirect } from '@sveltejs/kit'

import { browser, dev } from '$app/environment'
import { invalidate, invalidateAll } from '$app/navigation'
import type { Api } from '$types'

const proxyEndpoint = '/api'

import toast from '$lib/toast'

async function _invoke(fn: string, args: Record<string, unknown>, fetch: typeof window.fetch) {
	let response

	try {
		const resp = await fetch(`${proxyEndpoint}/${fn}`, {
			method: 'POST',
			body: JSON.stringify(args),
			headers: { 'Content-Type': 'application/json' },
			duplex: 'half',
		} as RequestInit & { duplex: string })

		response = await resp.json()
	} catch (error) {
		/** Intentional Log Error */
		console.error('API Error', error)
		return {
			ok: false,
			error: {
				detail: 'API Error',
			},
		}
	}

	return {
		...response,
	}
}

async function invoke<T>(
	fn: string,
	args: Record<string, unknown>,
	fetch: typeof window.fetch,
): Promise<T> {
	try {
		const body = await _invoke(fn, args || {}, fetch)

		if (!body.ok) {
			const detail = body.error?.detail || ''
			const code = body.error?.code || ''
			console.error(`[API error] fn=${fn}, detail=${detail}, code=${code}`)

			if (browser) {
				handleSystemErrorForBrowser(body.error)
			}
		}

		return body
	} catch (err) {
		/** Intentional Log Error */
		console.error(`API error in ${fn}:`, err)
		throw err
	}
}

function handleSystemErrorForBrowser(error: Api.Error | undefined) {
	if (!error) return

	switch (true) {
		case error.internal:
			return toast.error('Server error')
		case error.notFound:
			return toast.error('API not found')
		case error.unauthorized:
			toast.error('Session expired, please login again')
			invalidateAll()
			redirect(302, '/')
	}
}

export default {
	invoke,
	handleSystemErrorForBrowser,
	invalidate: async (fn?: string) => {
		if (!fn) {
			return invalidateAll()
		}

		const t = Date.now()
		const p = await invalidate(`${proxyEndpoint}/${fn}`)
		const d = Date.now() - t

		if (dev) {
			console.log(`[api] invalidate ${fn} took ${d}ms`)
		}
		return p
	},
}
