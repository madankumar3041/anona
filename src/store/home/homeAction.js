import Axios from '../../axios/axios';

import {
	SET_ABOUT_US,
	SET_ADDRESS,
	SET_AREA_LIST,
	SET_BANNERS,
	SET_DELIVERY_METHOD,
	SET_DELIVERY_TIME_LIST,
	SET_FAQ_LIST,
	SET_PACKAGES,
	SET_PACKAGE_DETAILS,
	SET_ADDRESS_ID,
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

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const config = {
	headers: {
		Authorization: `Bearer ${localStorage.getItem('es_token')}`,
		'Content-Type': 'multipart/form-data',
	},
};

// onRegister
export const onRegister = (data, type) => (dispatch) => {
	dispatch({
		type: SET_LOADING,
		payload: true,
	});

	Axios.post(`/userregistration`, data, config)
		.then((res) => {
			dispatch({
				type: SET_LOADING,
				payload: false,
			});
			if (res.data.data) {
				if (type == 'update') {
					toast('Profile Updated Successfully', {
						type: toast.TYPE.SUCCESS,
						autoClose: 5000,
					});
				} else {
					toast('Registered Successfully', {
						type: toast.TYPE.SUCCESS,
						autoClose: 5000,
					});
				}

				localStorage.setItem('ls_first_name', res.data.data.first_name);
				localStorage.setItem('ls_last_name', res.data.data.last_name);
				localStorage.setItem('ls_mobile_no', res.data.data.mobile_no);
				localStorage.setItem('ls_email', res.data.data.email);
				localStorage.setItem('ls_user_id', res.data.data.user_id);
				localStorage.setItem('ls_login', true);
				localStorage.setItem('ls_user_details', JSON.stringify(res.data.data));

				window.location.reload();
			} else {
				toast(res.data.error === 'ARE' ? 'User already exist!' : 'Something went wrong!', {
					type: toast.TYPE.ERROR,
					autoClose: 5000,
				});
			}
		})

		.catch((res) => {
			// toast(res.response.data.error, {
			// 	type: toast.TYPE.ERROR,
			// 	autoClose: 5000,
			// });
		});
};

// onLogin
export const onLogin = (data) => (dispatch) => {
	dispatch({
		type: SET_LOADING,
		payload: true,
	});
	Axios.post(`/userlogin`, data, config)
		.then((res) => {
			dispatch({
				type: SET_LOADING,
				payload: false,
			});
			if (res.data.data) {
				toast('Logged in Successfully', {
					type: toast.TYPE.SUCCESS,
					autoClose: 5000,
				});

				localStorage.setItem('ls_first_name', res.data.data.first_name);
				localStorage.setItem('ls_last_name', res.data.data.last_name);
				localStorage.setItem('ls_mobile_no', res.data.data.mobile_no);
				localStorage.setItem('ls_email', res.data.data.email);
				localStorage.setItem('ls_user_id', res.data.data.user_id);
				localStorage.setItem('ls_login', true);
				localStorage.setItem('ls_user_details', JSON.stringify(res.data.data));

				window.location.reload();
			} else {
				toast('No result found!', {
					type: toast.TYPE.ERROR,
					autoClose: 5000,
				});
			}
		})

		.catch((res) => {
			if (res.response) {
				toast(res.response.data.error, {
					type: toast.TYPE.ERROR,
					autoClose: 5000,
				});
			}
		});
};

// GET BANNERS
export const getBanners = (data) => (dispatch) => {
	dispatch({
		type: SET_LOADING,
		payload: true,
	});
	Axios.post(`/get_banner`, data, config).then((res) => {
		dispatch({
			type: SET_LOADING,
			payload: false,
		});
		dispatch({
			type: SET_BANNERS,
			payload: res.data.data,
		});
	});
};

// GET PACKAGES
export const getPackages = (data) => (dispatch) => {
	dispatch({
		type: SET_LOADING,
		payload: true,
	});
	Axios.post(`/packagetypelist`, data, config).then((res) => {
		dispatch({
			type: SET_LOADING,
			payload: false,
		});
		dispatch({
			type: SET_PACKAGES,
			payload: res.data.data,
		});
	});
};

// GET PACKAGE DETAILS
export const getPackageDetails = (data) => (dispatch) => {
	dispatch({
		type: SET_LOADING,
		payload: true,
	});
	Axios.post(`/packagelistV2`, data, config).then((res) => {
		dispatch({
			type: SET_LOADING,
			payload: false,
		});
		dispatch({
			type: SET_PACKAGE_DETAILS,
			payload: res.data.data,
		});
	});
};

// GET MEAL LIST
export const getMealListBreakfast = (data) => (dispatch) => {
	dispatch({
		type: SET_LOADING,
		payload: true,
	});
	data.set('meal_type_id', 1);
	Axios.post(`/meallist`, data, config).then((res) => {
		dispatch({
			type: SET_LOADING,
			payload: false,
		});
		dispatch({
			type: SET_MEAL_LIST_BREAKFAST,
			payload: res.data.data,
		});
	});
};
export const getMealListMeal = (data) => (dispatch) => {
	dispatch({
		type: SET_LOADING,
		payload: true,
	});
	data.set('meal_type_id', 2);
	Axios.post(`/meallist`, data, config).then((res) => {
		dispatch({
			type: SET_LOADING,
			payload: false,
		});
		dispatch({
			type: SET_MEAL_LIST_MEAL,
			payload: res.data.data,
		});
	});
};
export const getMealListSnacks = (data) => (dispatch) => {
	dispatch({
		type: SET_LOADING,
		payload: true,
	});
	data.set('meal_type_id', 3);
	Axios.post(`/meallist`, data, config).then((res) => {
		dispatch({
			type: SET_LOADING,
			payload: false,
		});
		dispatch({
			type: SET_MEAL_LIST_SNACKS,
			payload: res.data.data,
		});
	});
};
export const getMealListSoup = (data) => (dispatch) => {
	dispatch({
		type: SET_LOADING,
		payload: true,
	});
	data.set('meal_type_id', 4);
	Axios.post(`/meallist`, data, config).then((res) => {
		dispatch({
			type: SET_LOADING,
			payload: false,
		});
		dispatch({
			type: SET_MEAL_LIST_SOUP,
			payload: res.data.data,
		});
	});
};

// GET DELIVERY TIME LIST
export const getDeliveryTimeList = (data) => (dispatch) => {
	dispatch({
		type: SET_LOADING,
		payload: true,
	});
	Axios.post(`/DeliveryTime`, data, config).then((res) => {
		dispatch({
			type: SET_LOADING,
			payload: false,
		});
		dispatch({
			type: SET_DELIVERY_TIME_LIST,
			payload: res.data.data,
		});
	});
};

// GET ABOUT US
export const getAboutUs = (data) => (dispatch) => {
	dispatch({
		type: SET_LOADING,
		payload: true,
	});
	Axios.post(`/aboutus`, data, config).then((res) => {
		dispatch({
			type: SET_LOADING,
			payload: false,
		});
		dispatch({
			type: SET_ABOUT_US,
			payload: res.data.data,
		});
	});
};

// GET FAQ LIST
export const getFaqList = (data) => (dispatch) => {
	dispatch({
		type: SET_LOADING,
		payload: true,
	});
	Axios.post(`/faqslist`, data, config).then((res) => {
		dispatch({
			type: SET_LOADING,
			payload: false,
		});
		dispatch({
			type: SET_FAQ_LIST,
			payload: res.data.data,
		});
	});
};

// GET AREA LIST
export const getAreaList = (data) => (dispatch) => {
	dispatch({
		type: SET_LOADING,
		payload: true,
	});
	Axios.post(`/arealist`, data, config).then((res) => {
		dispatch({
			type: SET_LOADING,
			payload: false,
		});
		dispatch({
			type: SET_AREA_LIST,
			payload: res.data.data,
		});
	});
};

// GET DELIVERY METHOD
export const getDeliveryMethod = (data) => (dispatch) => {
	dispatch({
		type: SET_LOADING,
		payload: true,
	});
	Axios.post(`/DeliveryMethod`, data, config).then((res) => {
		dispatch({
			type: SET_LOADING,
			payload: false,
		});
		dispatch({
			type: SET_DELIVERY_METHOD,
			payload: res.data.data,
		});
	});
};

// ADD ADDRESS
export const addAddress = (data) => (dispatch) => {
	dispatch({
		type: SET_LOADING,
		payload: true,
	});
	Axios.post(`/addaddress`, data, config).then((res) => {
		dispatch({
			type: SET_LOADING,
			payload: false,
		});
		dispatch({
			type: SET_ADDRESS_ID,
			payload: res.data.data.address_master_id,
		});
		toast('Address Added', {
			type: toast.TYPE.SUCCESS,
			autoClose: 5000,
		});

		let formData = new FormData();
		formData.append('user_id', localStorage.getItem('ls_user_id'));
		formData.append('lang_id', localStorage.getItem('ls_langauge_id') || 1);
		dispatch(getAddress(formData));
	});
};

// GET ADDRESS
export const getAddress = (data) => (dispatch) => {
	dispatch({
		type: SET_LOADING,
		payload: true,
	});
	Axios.post(`/useraddresslist`, data, config).then((res) => {
		dispatch({
			type: SET_LOADING,
			payload: false,
		});
		dispatch({
			type: SET_ADDRESS,
			payload: res.data.data,
		});
	});
};

// PURCHASE PACKAGE
export const purchasePackage = (formData, data) => (dispatch) => {
	dispatch({
		type: SET_LOADING,
		payload: true,
	});
	Axios.post(`/purchasepackage`, formData, config).then((res) => {
		dispatch({
			type: SET_LOADING,
			payload: false,
		});
		if (res.data.error === 'SFD') {
			// toast('Your package purchased successfully!', {
			// 	type: toast.TYPE.SUCCESS,
			// 	autoClose: 5000,
			// });

			var data = res.data.data

			if (data?.payment == false) {
				window.location.href = '#/dashboard';
				window.location.reload();
			}
			else {
				// var url = `http://anonadiet.com/admin/payment/index.php?
				// custname=${localStorage.getItem('ls_first_name')}&
				// custemail=${localStorage.getItem('ls_email')}&
				// phone=${localStorage.getItem('ls_mobile_no')}&
				// totAmount=${data.total_amount}&
				// productnames=${'testproduct'}&
				// order_id_app=${res.data.data.purchase_id}&
				// user_id=${localStorage.getItem('ls_user_id')}`;

				var url = `${res?.data?.data.payment_url}`
				window.location.href = url;
			}
		} else {
			toast(res.data.error_msg, {
				type: toast.TYPE.ERROR,
				autoClose: 5000,
			});
		}

		dispatch({
			type: SET_AREA_LIST,
			payload: res.data.data,
		});
	});
};

// GET PACKAGE END DATE
export const getEndDate = (data) => (dispatch) => {
	dispatch({
		type: SET_LOADING,
		payload: true,
	});
	Axios.post(`/purchaseorderdate`, data, config).then((res) => {
		dispatch({
			type: SET_LOADING,
			payload: false,
		});
		dispatch({
			type: SET_END_DATE,
			payload: res.data.data,
		});
	});
};

// GET MY PACKAGES
export const getMyPackages = (data) => (dispatch) => {
	dispatch({
		type: SET_LOADING,
		payload: true,
	});
	Axios.post(`/mypackagewithorderdates`, data, config).then((res) => {
		dispatch({
			type: SET_LOADING,
			payload: false,
		});
		console.log(res.data.data);
		dispatch({
			type: SET_MY_PACKAGES,
			payload: res.data.data,
		});

		localStorage.setItem('SubPackage', res.data?.data?.first_name);
	});
};

// GET MY MEALS
export const getMyMeals = (data) => (dispatch) => {
	dispatch({
		type: SET_LOADING,
		payload: true,
	});
	Axios.post(`/getMyMeal`, data, config).then((res) => {
		dispatch({
			type: SET_LOADING,
			payload: false,
		});
		console.log(res.data.data);
		dispatch({
			type: SET_MY_MEALS,
			payload: res.data.data,
		});
	});
};

// FREEZE PACKAGE
export const freezePackage = (data, order_id) => (dispatch) => {
	dispatch({
		type: SET_LOADING,
		payload: true,
	});
	Axios.post(`/suspendplanwithmultipledates`, data, config).then((res) => {

		dispatch({
			type: SET_LOADING,
			payload: false,
		});
		if (res.data.error === 'SFD') {
			toast('Your package freezed successfully!', {
				type: toast.TYPE.SUCCESS,
				autoClose: 5000,
			});
			let formData = new FormData();
			formData.append('order_id', order_id);
			dispatch(getDaysList(formData));
		} else {
			toast(res.data.error_msg, {
				type: toast.TYPE.ERROR,
				autoClose: 5000,
			});
		}


		// setTimeout(() => {
		// 	window.location.reload();
		// }, 1000);
	});
};

// RESUME PACKAGE
export const resumePackage = (data) => (dispatch) => {
	dispatch({
		type: SET_LOADING,
		payload: true,
	});
	Axios.post(`/resumepackage`, data, config).then((res) => {
		dispatch({
			type: SET_LOADING,
			payload: false,
		});
		console.log(res.data.data);
		toast('Your package resumed successfully!', {
			type: toast.TYPE.SUCCESS,
			autoClose: 5000,
		});
	});
};
// COUPON CODE
export const CouponCode = (data) => (dispatch) => {
	dispatch({
		type: SET_LOADING,
		payload: true,
	});
	Axios.post(`/verifyCoupon`, data, config).then((res) => {
		dispatch({
			type: SET_LOADING,
			payload: false,
		});
		if (res.data.data) {
			console.log(res.data.data);
			dispatch({
				type: SET_COUPON_LIST,
				payload: res.data.data,
			});
			toast('Coupon Code Applied successfully!', {
				type: toast.TYPE.SUCCESS,
				autoClose: 5000,
			});
		}
		else {
			toast('InValid Coupon Code!', {
				type: toast.TYPE.ERROR,
				autoClose: 5000,
			});
		}
	});
};
// GET DAY LIST
export const getDaysList = (data) => (dispatch) => {
	dispatch({
		type: SET_LOADING,
		payload: true,
	});
	Axios.post(`/getOrderDates`, data, config).then((res) => {
		dispatch({
			type: SET_LOADING,
			payload: false,
		});
		console.log(res.data.data);
		dispatch({
			type: SET_DAYS_LIST,
			payload: res.data.data,
		});
	});
};

// GET MEAL LIST FOR UPGRADE PACKAGE
export const getMealTypeListForUpgradePackage = (data) => (dispatch) => {
	dispatch({
		type: SET_LOADING,
		payload: true,
	});
	Axios.post(`/packagelistforupgrade`, data, config).then((res) => {
		dispatch({
			type: SET_LOADING,
			payload: false,
		});
		console.log(res.data.data);
		dispatch({
			type: SET_MEAL_TYPE_LIST_UPGRADE_PACKGE,
			payload: res.data.data,
		});
	});
};

// UPGRADE PACKAGE
export const upgradePackage = (data) => (dispatch) => {
	dispatch({
		type: SET_LOADING,
		payload: true,
	});
	Axios.post(`/upgradePackage`, data, config).then((res) => {
		dispatch({
			type: SET_LOADING,
			payload: false,
		});
		console.log(res.data.data);
	});
};

// ADD MEAL
export const addMeal = (data) => (dispatch) => {
	dispatch({
		type: SET_LOADING,
		payload: true,
	});
	Axios.post(`/addMeal`, data, config).then((res) => {
		console.log(res.data);
		if (res.data.error === 'SFD') {
			toast('Meal Added Successfully', {
				type: toast.TYPE.SUCCESS,
				autoClose: 5000,
			});
			let formData = new FormData();
			formData.append('user_id', localStorage.getItem('ls_user_id'));
			formData.append('lang_id', localStorage.getItem('ls_langauge_id') || 1);
			formData.append('display_passed_dates', 'no');
			dispatch(getMyPackages(formData));
		} else {
			toast(res.data.error_msg, {
				type: toast.TYPE.ERROR,
				autoClose: 5000,
			});
			setTimeout(() => {
				window.location.reload();
			}, 2000);
		}

		dispatch({
			type: SET_LOADING,
			payload: false,
		});
		console.log(res.data.data);
	});
};

// WHY US
export const getWhyUs = (data) => (dispatch) => {
	dispatch({
		type: SET_LOADING,
		payload: true,
	});
	Axios.post(`/whyus`, data, config).then((res) => {
		console.log(res.data);
		if (res.data.error === 'SFD') {
			dispatch({
				type: SET_WHY_US,
				payload: res.data.data,
			});
		} else {
			toast(res.data.error_msg, {
				type: toast.TYPE.ERROR,
				autoClose: 5000,
			});
		}

		dispatch({
			type: SET_LOADING,
			payload: false,
		});
		console.log(res.data.data);
	});
};
