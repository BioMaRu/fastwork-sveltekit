import 'sweetalert2/dist/sweetalert2.min.css'

import { get } from 'svelte/store'
import Swal from 'sweetalert2'

import { t } from '$lib/i18n'

interface SwalOptions {
	title?: string
	text?: string
	html?: string
	yesLabel?: string
	yesDataSelenium?: string
	callback?: () => void
}

export default {
	async confirm({ title, text, html, yesLabel, yesDataSelenium, callback }: SwalOptions) {
		const result = await Swal.fire({
			title: title || 'คุณแน่ใจหรือไม่ ?',
			text: text || '',
			html,
			iconHtml: `
                <dotlottie-player
                    autoplay
                    speed="1.2"
                    mode="normal"
                    src="/dotLottie/warning.lottie"
                    style="height: 200px; width: 200px;"
                />`,
			showCancelButton: true,
			buttonsStyling: false,
			focusCancel: true,
			allowEnterKey: false,
			confirmButtonText: yesLabel || 'ตกลง',
			cancelButtonText: get(t)('layout.button-label.close-dialog'),
			reverseButtons: true,
			customClass: {
				htmlContainer: '_fs-300 _cl-text-default-200',
				confirmButton: 'trb-button _bdrd-max',
				cancelButton: 'trb-button is-variant-tertiary _bdrd-max',
				actions: '_mgt-32px',
			},
			didOpen: () => {
				if (yesDataSelenium) {
					;(Swal.getConfirmButton() as HTMLButtonElement).dataset.selenium = yesDataSelenium
				}
			},
		})

		if (!result.value) {
			return result
		}

		callback?.()

		return result
	},

	async success({ title, text, html, yesLabel, yesDataSelenium, callback }: SwalOptions) {
		const result = await Swal.fire({
			title: title || 'สำเร็จ',
			text: text || '',
			html,
			iconHtml: `<dotlottie-player
                    autoplay
                    speed="1.2"
                    mode="normal"
                    src="/dotLottie/success.lottie"
                    style="height: 200px; width: 200px;"
                />`,
			showCancelButton: false,
			buttonsStyling: false,
			focusCancel: true,
			allowEnterKey: false,
			confirmButtonText: yesLabel || get(t)('layout.button-label.close-dialog'),
			reverseButtons: true,
			customClass: {
				htmlContainer: '_fs-300 _cl-text-default-200',
				confirmButton: 'trb-button _bdrd-max',
				cancelButton: 'trb-button is-variant-tertiary _bdrd-max',
				actions: '_mgt-32px',
			},
			didOpen: () => {
				if (yesDataSelenium) {
					;(Swal.getConfirmButton() as HTMLButtonElement).dataset.selenium = yesDataSelenium
				}
			},
		})

		if (!result.value) {
			return
		}

		callback?.()

		return result
	},

	async error({ title, text, html, yesLabel, yesDataSelenium, callback }: SwalOptions) {
		const result = await Swal.fire({
			title: title || 'เกิดข้อผิดพลาด',
			text: text || '',
			html,
			iconHtml: `<dotlottie-player
                    autoplay
                    speed="1.2"
                    mode="normal"
                    src="/dotLottie/error.lottie"
                    style="height: 200px; width: 200px;"
                />`,
			showCancelButton: false,
			buttonsStyling: false,
			focusCancel: true,
			allowEnterKey: false,
			confirmButtonText: yesLabel || get(t)('layout.button-label.close-dialog'),
			reverseButtons: true,
			customClass: {
				htmlContainer: '_fs-300 _cl-text-default-200',
				confirmButton: 'trb-button _bdrd-max',
				cancelButton: 'trb-button is-variant-tertiary _bdrd-max',
				actions: '_mgt-32px',
			},
			didOpen: () => {
				if (yesDataSelenium) {
					;(Swal.getConfirmButton() as HTMLButtonElement).dataset.selenium = yesDataSelenium
				}
			},
		})

		if (!result.value) {
			return
		}

		callback?.()

		return result
	},
}
