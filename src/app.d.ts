// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
import type { Point, Strapi, User } from '$types'

declare global {
	namespace App {
		interface Locals {
			accessToken: string | undefined
			me: User.Me | null | undefined
		}

		interface PageData {
			me?: User.Me | null | undefined
			point?: Point.GetByUser | null | undefined
			siteData?: Strapi.SiteData
			navMenu?: keyof typeof import('$lib/constants').NAV_MENU
			preferredLang?: import('@fastwork/sdk').Language
		}

		// interface Error {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {}
