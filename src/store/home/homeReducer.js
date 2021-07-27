import {
	SET_ABOUT_US,
	SET_ADDRESS,
	SET_ADDRESS_ID,
	SET_AREA_LIST,
	SET_BANNERS,
	SET_DELIVERY_METHOD,
	SET_DELIVERY_TIME_LIST,
	SET_FAQ_LIST,
	SET_PACKAGES,
	SET_PACKAGE_DETAILS,
	SET_MEAL_LIST_BREAKFAST,
	SET_MEAL_LIST_MEAL,
	SET_MEAL_LIST_SNACKS,
	SET_MEAL_LIST_SOUP,
	SET_END_DATE,
	SET_MY_PACKAGES,
	SET_MY_MEALS,
	SET_DAYS_LIST,
	SET_LOADING,
	SET_MEAL_TYPE_LIST_UPGRADE_PACKGE,
	SET_WHY_US,
	SET_COUPON_LIST
} from '../types';

const initalState = { loading: false };

const homeReducer = (state = initalState, action) => {
	switch (action.type) {
		case SET_LOADING:
			return {
				...state,
				loading: action.payload,
			};
		case SET_BANNERS:
			return {
				...state,
				banners: action.payload,
			};
		case SET_PACKAGES:
			return {
				...state,
				packages: action.payload,
			};
		case SET_PACKAGE_DETAILS:
			return {
				...state,
				packageDetails: action.payload,
			};
		case SET_DELIVERY_TIME_LIST:
			return {
				...state,
				deliveryTimeList: action.payload,
			};
		case SET_ABOUT_US:
			return {
				...state,
				aboutUs: action.payload,
			};
		case SET_FAQ_LIST:
			return {
				...state,
				faqslist: action.payload,
			};
		case SET_AREA_LIST:
			return {
				...state,
				areaList: action.payload,
			};
		case SET_DELIVERY_METHOD:
			return {
				...state,
				deliveryMethod: action.payload,
			};
		case SET_ADDRESS:
			return {
				...state,
				address: action.payload,
			};
		case SET_ADDRESS_ID:
			return {
				...state,
				addressId: action.payload,
			};
		case SET_MEAL_LIST_BREAKFAST:
			return {
				...state,
				breakfast: action.payload,
			};
		case SET_MEAL_LIST_MEAL:
			return {
				...state,
				meal: action.payload,
			};
		case SET_MEAL_LIST_SNACKS:
			return {
				...state,
				snacks: action.payload,
			};
		case SET_MEAL_LIST_SOUP:
			return {
				...state,
				soup: action.payload,
			};
		case SET_END_DATE:
			return {
				...state,
				endDate: action.payload,
			};
		case SET_MY_PACKAGES:
			return {
				...state,
				myPackages: action.payload,
			};
		case SET_MY_MEALS:
			return {
				...state,
				myMeals: action.payload,
			};
		case SET_DAYS_LIST:
			return {
				...state,
				daysList: action.payload,
			};

		case SET_COUPON_LIST:
			return {
				...state,
				couponDetails: action.payload,
			};
		case SET_MEAL_TYPE_LIST_UPGRADE_PACKGE:
			return {
				...state,
				mealTypeListForUpgradePackage: action.payload,
			};
		case SET_WHY_US:
			return {
				...state,
				whyUs: action.payload,
			};
		default:
			return state;
	}
};

export default homeReducer;
