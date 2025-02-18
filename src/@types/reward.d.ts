export namespace Reward {
	export interface Item {
		id: string
		active: boolean
		description: string
		ended_at: string
		max_redeems_per_user: number
		name: string
		out_of_stock: boolean
		points: number
		redeemed_stocks: number
		sort: number
		started_at: string
		type: Type
		category: Category
		user_fully_collected: boolean
		user_redeems_count: number
		assets: {
			background_image: string
			badge_image: string
			item_image: string
		}
	}

	export type Type = 'cashback'
	export type Category = 'hiring' | 'selling'
}
