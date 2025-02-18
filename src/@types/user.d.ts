export namespace User {
	export interface Me {
		id: string
		image: string

		created_at: string
		display_name: string
		email: string
		username: string

		is_selling: boolean
		seller_verification_status: number
		seller_verified_at: string

		banned_at: string

		seller_profile: {
			first_approved_at: string
			last_approved_at: string
		}
	}
}
