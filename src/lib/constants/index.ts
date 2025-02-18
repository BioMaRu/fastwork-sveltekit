// TODO: split to separated file and re-export here if needs

import type { CookieSerializeOptions } from 'cookie'

import { dev } from '$app/environment'
import { env } from '$env/dynamic/public'
import { countrySwitcher } from '$lib/switcher'

export const ROUTE = {
	home: '/',
	earn: '/earn',
	pointHistory: '/point-history',
	reward: '/reward',
	rewardHistory: '/reward-history',
}

export const REDIRECT_TO_AUTH_ROUTES = [
	ROUTE.earn,
	ROUTE.pointHistory,
	ROUTE.reward,
	ROUTE.rewardHistory,
]

export const API = {
	userMe: 'user.me',
	userOnline: 'user.online',

	authSignOut: 'auth.signOut',

	pointEnroll: 'points.enroll',
	pointGetByUser: 'points.getByUser',
	pointListEarnHistory: 'points.listEarnHistory',
	pointListBurnHistory: 'points.listBurnHistory',

	missionList: 'missions.list',
	missionChallenge: 'missions.challenge',

	rewardList: 'rewards.list',
	rewardRedeem: 'rewards.redeem',
} as const

export const ERR_CODE = {
	unauthorized: 'UNAUTHORIZED',

	schemaValidationFailed: 'SCHEMA_VALIDATION_FAILED',

	pointsNotExist: 'POINTS_NOT_EXIST',
	pointsOrderNotQualifiedForEarn: 'POINTS_ORDER_NOT_QUALIFIED_FOR_EARN',
	pointsUserAlreadyEnroll: 'POINTS_USER_ALREADY_ENROLL',
	pointsUserNotQualifiedForEnroll: 'POINTS_USER_NOT_QUALIFIED_FOR_ENROLL',

	rewardsNotFound: 'REWARDS_NOT_FOUND',
	rewardsNotActive: 'REWARDS_NOT_ACTIVE',
	rewardsFullyRedeemed: 'REWARDS_FULLY_REDEEMED',
	rewardsUserFullyRedeemed: 'REWARDS_USER_FULLY_REDEEMED',
	rewardsUserHasNotEnoughPoints: 'REWARDS_USER_HAS_NOT_ENOUGH_POINTS',

	missionsNotFound: 'MISSIONS_NOT_FOUND',
	missionsAlreadyCompletedByUser: 'MISSIONS_ALREADY_COMPLETED_BY_USER',
	missionsTypeNotSupported: 'MISSIONS_TYPE_NOT_SUPPORTED',
} as const

export const NAV_MENU = {
	earn: 'earn',
	reward: 'reward',
	history: 'history',
} as const

export const EXTERNAL_LINK = {
	startSelling: `${env.PUBLIC_V4_URL}/start-selling`,
	withdrawalDashboard: `${env.PUBLIC_SELLER_URL}/withdrawals`,
	suspense: `${env.PUBLIC_V4_URL}/suspended`,
}

export const FEATURE_FLAG = {
	enableTracking: !dev,
	enableGlobalization: env.PUBLIC_ENABLE_GLOBALIZATION?.toLowerCase() === 'true',
}

export const PAGE_TITLE_POSTFIX = countrySwitcher({
	vn: ' | Fastlance Rewards',
	default: ' | Fastwork Rewards',
})

export const COOKIE_OPTIONS = {
	httpOnly: false, // NOTE: v4, chat, seller-center, job-board cant handle httpOnly coolies yet
	sameSite: 'lax',
	path: '/',
	domain: env.PUBLIC_COOKIE_DOMAIN,
	secure: !dev,
} satisfies CookieSerializeOptions

export const AUTH_CONFIG = {
	authorizeURL: `${env.PUBLIC_AUTH_2_URL}/oauth/authorize`,
	signOutURL: `${env.PUBLIC_AUTH_2_URL}/oauth/signout-device`,
	callbackURL: `${env.PUBLIC_HOSTNAME}/callback`,
	clientId: env.PUBLIC_AUTH_2_CLIENT_ID,
}
