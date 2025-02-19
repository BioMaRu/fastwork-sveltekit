import { browser } from '$app/environment'
import { emit } from '$lib/event'

const activeModals = $state(new Set<string>())

/**
 * Opens a specific modal by name
 * @param modalName The name of the modal to open
 */
export function open(modalName: string): void {
	if (!browser) return

	activeModals.add(modalName)
	emit(`modal-${modalName}:open`)
}

/**
 * Closes all active modals
 */
export function closeAll(): void {
	if (!browser) return

	// Emit close event for each active modal
	activeModals.forEach((modalName) => {
		emit(`modal-${modalName}:close`)
	})

	// Clear the active modals set
	activeModals.clear()
}

/**
 * Closes a specific modal by name
 * @param modalName The name of the modal to close
 */
export function close(modalName: string): void {
	if (!browser) return

	activeModals.delete(modalName)
	emit(`modal-${modalName}:close`)
}
