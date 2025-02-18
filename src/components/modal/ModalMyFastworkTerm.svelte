<script lang="ts">
	import { marked } from 'marked'

	import { goto } from '$app/navigation'
	import api from '$lib/api'
	import { API, ROUTE } from '$lib/constants'
	import { preventDefault, self } from '$lib/eventModifiers'
	import * as format from '$lib/format'
	import { t } from '$lib/i18n'
	import { siteData } from '$lib/stores'
	import swal from '$lib/swal'
	import type { Api } from '$types'

	let terms = $derived($siteData?.data?.attributes?.registerTerms ?? '')
	let termsUpgraded = $derived(format.upgradeTerms(terms))

	let isActive = $state(false)
	let loading = $state(false)
	let accept = $state(false)

	export function open() {
		accept = false
		isActive = true

		document.body.style.overflow = 'hidden'
	}

	export function close() {
		if (loading) {
			return
		}

		isActive = false
		document.body.style.overflow = 'auto'
	}

	async function submit() {
		if (loading) {
			return
		}

		loading = true
		const res = await api.invoke<Api.BaseResponse>(API.pointEnroll, {}, fetch)
		loading = false

		if (!res.ok) {
			if (res.error?.detail) {
				swal.error({
					title: $t('layout.error-message.unexpected'),
					text: `${res.error?.detail}`,
				})
			}

			return
		}

		api.invalidate(API.pointGetByUser)

		await swal.success({
			title: $t('layout.alert.join-success.title'),
			text: $t('layout.alert.join-success.text'),
		})

		document.body.style.overflow = 'auto'
		goto(ROUTE.earn)
	}
</script>

<svelte:window onmodal-my-fastwork-term:open={() => open()} />

<div
	aria-hidden="true"
	class="trb-modal _pdh-24px _jtfct-fst _ovf-at"
	class:is-active={isActive}
	onclick={self(close)}
>
	<form
		onsubmit={preventDefault(() => submit())}
		class="trb-modal-panel _w-100pct"
		style="max-width: 500px;"
	>
		<button
			aria-hidden="true"
			type="button"
			class="trb-modal-close _bdw-0px"
			onclick={self(close)}
		>
			✕
		</button>

		<div class="_pdl-24px _pdbt-24px _pdr-32px">
			<h2 class="_fs-600 _fw-500-md _fs-400 _tal-ct">{$t('layout.modal.join-term.title')}</h2>
		</div>

		<hr />

		<div class="_pdt-24px">
			<div
				class="_bdw-1px _bdcl-neutral-200 _h-100pct _ovf-at _pd-24px _bdrd-12px"
				style="max-height: 30vh;"
			>
				<div class="trb-article custom">
					{@html marked.parse(termsUpgraded)}
				</div>
			</div>

			<div class="_mgt-24px">
				<div class="trb-field">
					<div class="trb-checkbox">
						<input
							id="modal-my-fastwork-term-accept"
							type="checkbox"
							bind:checked={accept}
						/>
						<label for="modal-my-fastwork-term-accept"
							>{$t('layout.modal.join-term.accept-term')}</label
						>
					</div>
				</div>
			</div>

			<div class="_mgt-16px">
				<button
					data-selenium="first-landing.modal-register.confirm"
					disabled={!accept}
					class="trb-button is-pill _w-100pct"
					class:is-loading={loading}
				>
					{$t('layout.modal.join-term.button-label.confirm')}
				</button>
			</div>
		</div>
	</form>
</div>
