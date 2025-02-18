export namespace Point {
	export interface UserItem {
		user_id: string
		points: number
		points_value: number
		expiring_points_date: string
		expiring_points: number
	}

	export interface EarnHistoryItem {
		inserted_at: string
		name: string
		redeem_status: string
		points: number
		transaction_type: string
	}

	export interface BurnHistoryItem {
		inserted_at: string
		name: string
		transaction_type: string
		points: number
		expired_at: string
	}
}
