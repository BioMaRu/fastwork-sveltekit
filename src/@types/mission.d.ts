export namespace Mission {
	export interface Item {
		description: string
		ended_at: string
		id: string
		name: string
		started_at: string
		type: string
		points: number
		sort: number
		active: boolean
		user_challenge_completed: boolean
		perpetual: boolean
		category: Category
	}

	export type Category = 'common' | 'hiring' | 'selling'
}
