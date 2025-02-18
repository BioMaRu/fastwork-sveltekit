/**
 * `trusted` event modifier
 */
export function trusted(fn: (event: Event) => void): (event: Event) => void {
	return function (event: Event) {
		if (event.isTrusted) {
			// @ts-expect-error this is not typed
			fn?.call(this, event)
		}
	}
}

/**
 * `self` event modifier
 */
export function self(fn: (event: Event) => void): (event: Event) => void {
	return function (event: Event) {
		// @ts-expect-error this is not typed
		if (event.target === this) {
			// @ts-expect-error this is not typed
			fn?.call(this, event)
		}
	}
}

/**
 * `stopPropagation` event modifier
 */
export function stopPropagation(fn: (event: Event) => void): (event: Event) => void {
	return function (event: Event) {
		event.stopPropagation()

		// @ts-expect-error this is not typed
		return fn?.call(this, event)
	}
}

/**
 * `once` event modifier
 */
export function once(fn: (event: Event) => void): (event: Event) => void {
	let ran = false

	return function (event: Event) {
		if (ran) return
		ran = true

		// @ts-expect-error this is not typed
		return fn?.call(this, event)
	}
}

/**
 * `stopImmediatePropagation` event modifier
 */
export function stopImmediatePropagation(fn: (event: Event) => void): (event: Event) => void {
	return function (event: Event) {
		event.stopImmediatePropagation()
		// @ts-expect-error this is not typed
		return fn?.call(this, event)
	}
}

/**
 * `preventDefault` event modifier
 */
export function preventDefault(fn: (event: Event) => void): (event: Event) => void {
	return function (event: Event) {
		event.preventDefault()

		// @ts-expect-error this is not typed
		return fn?.call(this, event)
	}
}
