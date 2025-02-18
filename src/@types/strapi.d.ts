import type { StrapiResponse } from 'strapi-sdk-js'

/*************************
 *  Strapi Shape
 *************************/
export namespace Strapi {
	export type SiteData = StrapiResponse<StrapiSiteDataShape>
}

export type StrapiSiteDataShape = {
	attributes: {
		registerTerms: string
		homeFooterTerms: string
		earnTopImage: StrapiImageShape
		earnTopImageMobile: StrapiImageShape
		earnTopImageLink: string
	}
}

export type StrapiImageShape = {
	data: {
		id: number
		attributes: ImageFormatShape & {
			alternativeText: string
			caption: string
			createdAt: Date
			formats: {
				small: ImageFormatShape
				medium: ImageFormatShape
				thumbnail: ImageFormatShape
			}
			previewUrl: null
			provider: string
			provider_metadata: null
			updatedAt: Date
		}
	}
}

export type ImageFormatShape = {
	ext: string
	hash: string
	height: number
	mime: string
	name: string
	path: string
	size: number
	url: string
	width: number
}
