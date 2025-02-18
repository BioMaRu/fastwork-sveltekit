import { ERR_CODE } from '$lib/constants'

import type { Mission } from './mission'
import type { Point } from './point'
import type { Reward } from './reward'
import type { User } from './user'

export namespace Api {
	interface BaseResponse {
		ok: boolean
		result?: unknown
		error?: Error
		paginate?: Paginate
	}

	export type Error =
		| {
				code?: (typeof ERR_CODE)[keyof typeof ERR_CODE]
				detail?: string | object
				internal?: boolean
				notFound?: boolean
				unauthorized?: boolean
				validation?: boolean
		  }
		| null
		| undefined

	export type Paginate = {
		page: number
		perPage: number
		count: number
		totalPage: number
	}

	export interface UserMe extends Partial<BaseResponse> {
		result?: User.Me
	}

	export interface AuthSignOut extends Partial<BaseResponse> {
		result?: {
			token: string
		}
	}

	export interface PointGetByUser extends Partial<BaseResponse> {
		result?: Point.UserItem[]
	}

	export interface rewardList extends Partial<BaseResponse> {
		result?: Reward.Item[]
	}

	export interface pointListEarnHistory extends Partial<BaseResponse> {
		result?: Point.EarnHistoryItem[]
	}

	export interface pointListBurnHistory extends Partial<BaseResponse> {
		result?: Point.BurnHistoryItem[]
	}

	export interface missionList extends Partial<BaseResponse> {
		result?: Mission.Item[]
	}
}
