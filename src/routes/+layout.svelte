<script lang="ts">
	import '@fontsource/kanit/400.css'
	import '@fontsource/kanit/500.css'
	import '@fontsource/kanit/600.css'
	import 'dayjs/locale/th'
	import 'dayjs/locale/vi'
	import 'dayjs/locale/id'
	import '$style/main.scss'

	import type { Country, Language } from '@fastwork/sdk'
	import { format } from '@fastwork/sdk'
	import { SvelteToast } from '@zerodevx/svelte-toast'
	import dayjs from 'dayjs'
	import relativeTime from 'dayjs/plugin/relativeTime'
	import { onDestroy, onMount } from 'svelte'

	import { afterNavigate } from '$app/navigation'
	import { goto } from '$app/navigation'
	import { page } from '$app/state'
	import { env } from '$env/dynamic/public'
	import api from '$lib/api'
	import { API, FEATURE_FLAG } from '$lib/constants'
	import { t } from '$lib/i18n'
	import { siteData } from '$lib/stores'
	import * as tracking from '$lib/tracking'

	interface Props {
		children?: import('svelte').Snippet
	}

	let { children }: Props = $props()

	function initSDK() {
		format.init({
			language: page.data.preferredLang as Language,
			country: env.PUBLIC_COUNTRY as Country,
		})
	}

	function setUserOnline() {
		if (!page.data?.me?.id) {
			return
		}

		api.invoke(
			API.userOnline,
			{
				userId: page.data?.me?.id,
			},
			fetch,
		)
	}

	function handleTracking() {
		/* track page view */
		tracking.trackPageView()

		/* track user online event */
		{
			const me = page.data?.me
			if (me) {
				setUserOnline()

				tracking.trackSetUser({
					id: me.id,
					isSelling: me.is_selling,
					sellerVerificationStatus: me.seller_verification_status,
				})
			} else {
				tracking.trackClearUser()
			}
		}
	}

	dayjs.locale(page.data.preferredLang)
	dayjs.extend(relativeTime)
	initSDK()

	onMount(async () => {
		/**
		 * For handle token in URL originated from outside services
		 *
		 * After token is consumed in server hook, clear the init token from URL
		 * and reload page to invalidate all data
		 */
		{
			const initToken = page.url.searchParams.get('token')
			if (initToken) {
				page.url.searchParams.delete('token')

				return goto(page.url.href, {
					invalidateAll: true,
				})
			}
		}

		setUserOnline()

		await siteData.load(page.data.preferredLang as Language)
	})

	onDestroy(() => {
		siteData.reset()
	})

	/** handle app event tracking after each navigation */
	afterNavigate(() => {
		try {
			handleTracking()
		} catch (error) {
			if (FEATURE_FLAG.enableTracking) {
				console.error(error)
			}
		}
	})
</script>

<svelte:head>
	<title>{$t('layout.head.title')}</title>
	<meta name="description" content={$t('layout.head.description')} />
	<meta property="og:title" content={$t('layout.head.title')} />
	<meta property="og:description" content={$t('layout.head.description')} />
	<meta
		property="og:image"
		content={`${page.url.origin}/images/head/country_${env.PUBLIC_COUNTRY || 'th'}/og-image.jpg?v=20241009`}
	/>
	<meta property="og:url" content={page.url.href} />
	<meta property="og:type" content="website" />

	<script src="https://unpkg.com/@rive-app/canvas"></script>

	{#if FEATURE_FLAG.enableTracking}
		{@html `
			<script>
				(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
				new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
				j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
				'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
				})(window,document,'script','dataLayer','${env.PUBLIC_GTM_CONTAINER_ID}');
			</script>
		`}
	{/if}
</svelte:head>

{@render children?.()}

<SvelteToast />

<style>
	:root {
		--navbar-height: 72px;
		--footer-height: 60px;
	}
</style>
